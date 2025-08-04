import { z } from "zod";
import { Hono } from "hono";
import { ID, Query } from "node-appwrite";
import { zValidator } from "@hono/zod-validator";

import { createAdminClient } from "@/lib/appwrite";
import { sessionMiddleware } from "@/lib/session-middleware";

import { DATABASE_ID, MEMBERS_ID, PROJECTS_ID, TASKS_ID } from "@/config";

import { createTaskSchema } from "../schemas";
import { Task, TaskStatus } from "../types";

import { Project } from "@/features/projects/types";
import { getMember } from "@/features/members/utils";

const app = new Hono()
/* GET for fetching multiple tasks */
    .get(
        "/",
        sessionMiddleware,
        zValidator(
            "query",
            z.object({
                workspaceId: z.string(),
                projectId: z.string().nullish(),
                assigneeId: z.string().nullish(),
                status: z.enum(TaskStatus).nullish(),
                search: z.string().nullish(),
                dueDate: z.string().nullish(),
            })),
        async (c) => {
            const { users } = await createAdminClient();
            const databases = c.get("databases");
            const user = c.get("user");

            const {
                workspaceId,
                projectId,
                status,
                search,
                assigneeId,
                dueDate,
            } = c.req.valid("query");

            const member = await getMember({
                databases,
                workspaceId,
                userId: user.$id,
            });

            if (!member) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            const query = [
                Query.equal("workspaceId", workspaceId),
                Query.orderDesc("$createdAt"),
            ];

            if (projectId) {
                console.log("Project ID:", projectId);
                query.push(Query.equal("projectId", projectId));
            }

            if (status) {
                console.log("Status:", status);
                query.push(Query.equal("status", status));
            }

            if (assigneeId) {
                console.log("Assignee ID:", assigneeId);
                query.push(Query.equal("assigneeId", assigneeId));
            }

            if (dueDate) {
                console.log("Due Date:", dueDate);
                query.push(Query.equal("dueDate", dueDate));
            }

            if (search) {
                console.log("Search:", search);
                query.push(Query.search("name", search));
            }

            const tasks = await databases.listDocuments<Task>(
                DATABASE_ID,
                TASKS_ID,
                query
            );

            const projectIds = tasks.documents.map((task) => task.projectId);
            const assigneeIds = tasks.documents.map((task) => task.assigneeId);

            const projects = await databases.listDocuments<Project>(
                DATABASE_ID,
                PROJECTS_ID,
                projectIds.length > 0 ? [Query.contains("$id", projectIds)] : []
            );

            const members = await databases.listDocuments(
                DATABASE_ID,
                MEMBERS_ID,
                assigneeIds.length > 0 ? [Query.contains("$id", assigneeIds)] : []
            );

            const assignees = await Promise.all(
                members.documents.map(async (member) => {
                    const user = await users.get(member.userId);
                    return {
                        ...member,
                        name: user.name,
                        email: user.email,
                    };
                })
            );

            const populatedTasks = tasks.documents.map((task) => {
                const project = projects.documents.find((p) => p.$id === task.projectId);
                const assignee = assignees.find((a) => a.$id === task.assigneeId);

                return {
                    ...task,
                    project,
                    assignee,
                };
            });

            return c.json({ data:
                {
                    ...tasks,
                    documents: populatedTasks,
                }});
        }
    )

/* GET for fetching task */
    .get(
        "/:taskId",
        sessionMiddleware,
        async (c) => {
            const { taskId } = c.req.param();
            const { users } = await createAdminClient();
            const databases = c.get("databases");
            const currentUser = c.get("user");

            const task = await databases.getDocument<Task>(
                DATABASE_ID, 
                TASKS_ID, 
                taskId
            );

            const currentMember = await getMember({
                databases,
                workspaceId: task.workspaceId,
                userId: currentUser.$id,
            });

            if (!currentMember) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            const project = await databases.getDocument<Project>(
                DATABASE_ID,
                PROJECTS_ID,
                task.projectId
            );

            const member = await databases.getDocument(
                DATABASE_ID,
                MEMBERS_ID,
                task.assigneeId
            );

            const user = await users.get(member.userId);

            const assignee = {
                ...member,
                name: user.name,
                email: user.email,
            };

            return c.json({ data:
                {
                    ...task,
                    project,
                    assignee,
                },
            });
        }
    )

/* POST for creating a new task */
    .post(
        "/",
        zValidator("json", createTaskSchema),
        sessionMiddleware,
        async (c) => {
            const user = c.get("user");
            const databases = c.get("databases");
            const { 
                name, 
                status, 
                workspaceId, 
                projectId, 
                dueDate, 
                assigneeId 
            } = c.req.valid("json");

            const member = await getMember({
                databases,
                workspaceId,
                userId: user.$id,
            });

            if (!member) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            const highestPositionTask = await databases.listDocuments(
                DATABASE_ID,
                TASKS_ID,
                [
                    Query.equal("status", status),
                    Query.equal("workspaceId", workspaceId),
                    Query.orderAsc("position"),
                    Query.limit(1),
                ]
            );

            const newPosition = 
                highestPositionTask.documents.length > 0
                ? highestPositionTask.documents[0].position + 1000
                : 1000;

            const task = await databases.createDocument(
                DATABASE_ID,
                TASKS_ID,
                ID.unique(),
                {
                    name,
                    status,
                    workspaceId,
                    projectId,
                    dueDate,
                    assigneeId,
                    position: newPosition,
                }

            );

            return c.json({ data:task });
        }
            
    )
    
/* DELETE deleting task */
    .delete(
        "/:taskId",
        sessionMiddleware,
        async (c) => {
            const user = c.get("user");
            const databases = c.get("databases");
            const { taskId } = c.req.param();

            const task = await databases.getDocument<Task>(
                DATABASE_ID, 
                TASKS_ID, 
                taskId
            );

            const member = await getMember({
                databases,
                workspaceId: task.workspaceId,
                userId: user.$id,
            });

            if (!member) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            if (!task) {
                return c.json({ error: "Task not found" }, 404);
            }

            await databases.deleteDocument(
                DATABASE_ID,
                TASKS_ID,
                taskId
            );

            return c.json({ data: { $id: task.$id }});
        }
            
    )

/* PATCH for updating an existing task */
    .patch(
        "/:taskId",
        zValidator("json", createTaskSchema.partial()),
        sessionMiddleware,
        async (c) => {
            const user = c.get("user");
            const databases = c.get("databases");
            const { 
                name, 
                status, 
                description, 
                projectId, 
                dueDate, 
                assigneeId 
            } = c.req.valid("json");
            const { taskId } = c.req.param();

            const existingTask = await databases.getDocument<Task>(
                DATABASE_ID, 
                TASKS_ID, 
                taskId
            );

            const member = await getMember({
                databases,
                workspaceId: existingTask.workspaceId,
                userId: user.$id,
            });

            if (!member) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            const task = await databases.updateDocument(
                DATABASE_ID,
                TASKS_ID,
                taskId,
                {
                    name,
                    status,
                    projectId,
                    dueDate,
                    assigneeId,
                    description,
                }

            );

            return c.json({ data:task });
        }
            
    )
    
export default app;