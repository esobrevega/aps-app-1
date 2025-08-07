import { FolderIcon, ListCheckIcon, UserIcon, XIcon } from "lucide-react";
import { useEffect } from "react";

import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import { TaskStatus } from "../types";
import { useTaskFilters } from "../hooks/use-task-filters";

import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/date-time-picker";
import { Select, SelectContent, SelectSeparator, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select";
import { Datepicker } from "@/components/date-picker";


interface DataFiltersProps {
    hideProjectFilter?: boolean;
    currentProjectId?: string;
}

export const DataFilters = ({ hideProjectFilter, currentProjectId }: DataFiltersProps) => {
    const workspaceId = useWorkspaceId();

    const { data: projects, isLoading: isLoadingProjects } = useGetProjects({ workspaceId });
    const { data: members, isLoading: isLoadingMembers } = useGetMembers({ workspaceId });

    const isLoading = isLoadingProjects || isLoadingMembers;

    const projectOptions = projects?.documents.map((project) => ({
        value: project.$id,
        label: project.name,
    }));

    const memberOptions = members?.documents.map((member) => ({
        value: member.$id,
        label: member.name
    }));

    const [{
        status,
        projectId,
        assigneeId,
        dueDate,
    }, setFilters] = useTaskFilters();

    const onStatusChange = (value: string) => {
        if (value === "all") {
            setFilters({ status: null });
        }
        else {
            setFilters({ status: value as TaskStatus });
        }
    }

    const onAssigneeChange = (value: string) => {
        if (value === "all"){
            setFilters({ assigneeId: null });
        }
        else {
            setFilters({ assigneeId: value as string });
        }
    }

    const onProjectChange = (value: string) => {
        if (value === "all"){
            setFilters({ projectId: null });
        }
        else {
            setFilters({ projectId: value as string });
        }
    }

    useEffect(() => {
        if (hideProjectFilter && currentProjectId && projectId !== currentProjectId) {
            setFilters({ projectId: currentProjectId });
        }
        // Only run when hideProjectFilter or currentProjectId changes
    }, [hideProjectFilter, currentProjectId, setFilters, projectId]);

    console.log("currentProjectId:", currentProjectId);

    if (isLoading) {
        return null;
    }

    return (
        <div className="flex flex-col lg:flex-row gap-2">
            {/* Status filter */}
            <Select
                value={status ?? undefined}
                onValueChange={(value) => onStatusChange(value)}
            >
                <SelectTrigger className="w-full lg:w-auto h-8">
                    <div className="flex items-center pr-2">
                        <ListCheckIcon className="size-4 mr-2" />
                        <SelectValue placeholder="All Status" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectSeparator />
                    <SelectItem value={TaskStatus.BACKLOG}>Backlog</SelectItem>
                    <SelectItem value={TaskStatus.IN_PROGRESS}>In Progress</SelectItem>
                    <SelectItem value={TaskStatus.DONE}>Done</SelectItem>
                    <SelectItem value={TaskStatus.IN_REVIEW}>In Review</SelectItem>
                    <SelectItem value={TaskStatus.TODO}>To Do</SelectItem>
                </SelectContent>
            </Select>

            {/* Assignee filter */}
            <Select
                value={assigneeId ?? undefined}
                onValueChange={(value) => onAssigneeChange(value)}
            >
                <SelectTrigger className="w-full lg:w-auto h-8">
                    <div className="flex items-center pr-2">
                        <UserIcon className="size-4 mr-2" />
                        <SelectValue placeholder="All Assignees" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Assignees</SelectItem>
                    <SelectSeparator />
                    {memberOptions?.map((member) => (
                        <SelectItem key={member.value} value={member.value}>
                            {member.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Project filter */}
            {!hideProjectFilter && (
                <Select
                    value={projectId ?? undefined}
                    onValueChange={(value) => onProjectChange(value)}
                >
                    <SelectTrigger className="w-full lg:w-auto h-8">
                        <div className="flex items-center pr-2">
                            <FolderIcon className="size-4 mr-2" />
                            <SelectValue placeholder="All Projects" />
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Projects</SelectItem>
                        <SelectSeparator />
                        {projectOptions?.map((project) => (
                            <SelectItem key={project.value} value={project.value}>
                                {project.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )}
            {/* Date filter */}
            <DateTimePicker
                placeholder="Due Date"
                className="w-full lg:w-auto h-9"
                value={dueDate ? new Date(dueDate) : undefined}
                onChange={(date) => {
                    setFilters({ dueDate: date ? date.toISOString() : null });
                }}
            />

            {/* Clear filters button
                <Button
                    variant="outline"
                    onClick={() => {
                        onStatusChange("all");
                        onAssigneeChange("all");
                        onProjectChange("all");
                        setFilters({ dueDate: null });
                    }}
                    className="w-full lg:w-auto h-8"
                >
                    <XIcon className="size-4 mr-2" />
                </Button> */}
        </div>
    );
};

