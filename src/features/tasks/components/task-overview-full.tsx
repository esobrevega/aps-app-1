import { PencilIcon } from "lucide-react";
import { snakeCaseToTitleCase } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Task } from "../types";

import { MemberAvatar } from "@/features/members/components/member-avatar";

import { TaskDate } from "./task-date";
import { OverviewProperty } from "./overview-property";
import { useEditTaskModal } from "../hooks/use-edit-task-modal";

interface TaskOverviewFullProps {
    task: Task;
}

export const TaskOverviewFull = ({ 
    task 
}: TaskOverviewFullProps) => {

    const { open } = useEditTaskModal();

    return (
        <div className="flex flex-col gap-y-4 col-span-1">
            <div className="bg-muted p-4 rounded-lg shadow">
                <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">Overview</p>
                </div>
                <hr className="my-4" />
                <div className="flex flex-col gap-y-4">
                    <OverviewProperty label="Assignee">
                        <MemberAvatar 
                            name={task.assignee.name}
                            className="size-6"
                        />
                        <p className="text-sm font-medium"> {task.assignee.name} </p>
                    </OverviewProperty>
                    <OverviewProperty label="Due Date">
                        <TaskDate value={task.dueDate} className="text-sm font-medium" />
                    </OverviewProperty>
                    <OverviewProperty label="Status">
                        <Badge variant={task.status}> 
                            {snakeCaseToTitleCase(task.status)}
                        </Badge>
                    </OverviewProperty>
                    <OverviewProperty label="Description">
                        <p className="text-sm font-medium">{task.description}</p>
                    </OverviewProperty>
                </div>
            </div>
        </div>
    )
}