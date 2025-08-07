import { MoreHorizontal } from "lucide-react";

import { Task, TaskStatus } from "../types";
import { TaskActions } from "./task-actions";
import { TaskDate } from "./task-date";

import { DottedSeparator } from "@/components/dotted-separator";

import { MemberAvatar } from "@/features/members/components/member-avatar";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";


const statusColorMap: Record<TaskStatus, string> = {
    [TaskStatus.BACKLOG]: "border-l-gray-500",
    [TaskStatus.TODO]: "border-l-blue-500",
    [TaskStatus.IN_PROGRESS]: "border-l-red-500",
    [TaskStatus.IN_REVIEW]: "border-l-yellow-500",
    [TaskStatus.DONE]: "border-l-green-500",
}

interface KanbanCardProps {
    task: Task;
}

export const KanbanCard = ({
    task
}: KanbanCardProps) => {
    return (
        <div className={`bg-white p-2.5 mb-1.5 rounded shadow-sm hover:shadow-md transition-shadow space-y-3 border-1 border-l-4 ${statusColorMap[task.status]}`}>
            <div className="flex items-start justify-between gap-x-2">
                <p className="text-sm line-clamp-2">{task.name}</p>
                <TaskActions id={task.$id} projectId={task.projectId}>
                    <MoreHorizontal className="size-[18px] stroke-1 shrink-0 text-neutral-700 hover:opacity-75 transition"/>
                </TaskActions>
            </div>
            <DottedSeparator />
            <div className="flex items-center gap-x-1.5">
                <MemberAvatar
                    name={task.assignee.name} 
                    fallbackClassName="text-[10px]"
                />
                <div className="size-1 rounded-full bg-neutral-300"/>
                <TaskDate value={task.dueDate} className="text-xs"/>
            </div>
            <div className="flex items-center gap-x-1.5 justify-end">
                <ProjectAvatar 
                    name={task.project.name}
                    image={task.project.imageUrl}
                    className="size-5 rounded-md overflow-hidden"
                />
                <span className="text-[9px] font-medium text-neutral-500">
                    {task.project.name}
                </span>
            </div>
        </div>
    )
}

