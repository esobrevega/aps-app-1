"use client";

import { useCallback } from "react";
import { useQueryState } from "nuqs";
import { Loader, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DottedSeparator } from "@/components/dotted-separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { DataKanban } from "./data-kanban";
import { DataFilters } from "./data-filters";

import { TaskStatus } from "../types";
import { useGetTasks } from "../api/use-get-tasks"; 
import { useTaskFilters } from "../hooks/use-task-filters";
import { useBulkUpdateTasks } from "../api/use-bulk-update-tasks";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { DataCalendar } from "./data-calendar";

interface TaskViewSwitcherProps {
    hideProjectFilter?: boolean;
    currentProjectId?: string;
}

export const TaskViewSwitcher = ({
    hideProjectFilter,
    currentProjectId
}: TaskViewSwitcherProps) => {
    const [{
        status,
        projectId,
        assigneeId,
        dueDate,
    }] = useTaskFilters();

    const [view, setView] = useQueryState("task-view", {
        defaultValue: "table"
    });

    const workspaceId = useWorkspaceId();

    const { mutate: bulkUpdate } = useBulkUpdateTasks();

    const { 
        data: tasks,
        isLoading: isLoadingTasks, 
    } = useGetTasks({ 
        workspaceId,
        projectId,
        status,
        assigneeId,
        dueDate, 
    });

    const onKanbanChange = useCallback((
        tasks: {$id: string, status: TaskStatus, position: number}[]
    ) => {
        // This function would handle the change in kanban tasks
        bulkUpdate({
            json: { tasks },
        });
    }, [bulkUpdate]);

    const { open } = useCreateTaskModal();

    return (
        <Tabs
            defaultValue={view}
            onValueChange={setView}
            className="flex-1 w-full border rounded-lg"
        >
            <div className="h-full flex flex-col overflow-auto p-2">
                <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
                    <TabsList className="w-full lg:w-auto"> 
                        <TabsTrigger
                            value="table"
                            className="h-8 w-full lg:w-auto cursor-pointer"
                        >
                            Table
                        </TabsTrigger>
                        <TabsTrigger
                            value="kanban"
                            className="h-8 w-full lg:w-auto cursor-pointer"
                        >
                            Kanban
                        </TabsTrigger>
                        <TabsTrigger
                            value="calendar"
                            className="h-8 w-full lg:w-auto cursor-pointer"
                        >
                            Calendar
                        </TabsTrigger>
                    </TabsList>
                    <Button
                        onClick={open}
                        size="sm"
                        className="w-full lg:w-auto cursor-pointer"
                    >
                        <PlusIcon className="mr-2 size-4" />
                        New                      
                    </Button>
                </div>   
                <DottedSeparator className="my-4" />
                    <DataFilters hideProjectFilter={hideProjectFilter} currentProjectId={currentProjectId} />
                <DottedSeparator className="my-4" />
                { isLoadingTasks ? (
                    <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
                        <Loader className="size-6 animate-spin text-muted-foreground" />
                    </div>
                ) : (
                <>
                    <TabsContent value="table" className="mt-0">
                        <DataTable columns={columns} data={tasks?.documents ?? []} />
                    </TabsContent>
                    <TabsContent value="kanban" className="mt-0">
                        <DataKanban onChange={onKanbanChange} data={tasks?.documents ?? []} />
                    </TabsContent>
                    <TabsContent value="calendar" className="mt-0 h-full pb-4">
                        <DataCalendar data={tasks?.documents ?? []} />
                    </TabsContent>
                </>
                )}
            </div>
        </Tabs>
    );
}

