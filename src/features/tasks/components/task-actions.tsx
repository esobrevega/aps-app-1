import { ExternalLinkIcon, FileText, PencilIcon, Trash2Icon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useConfirm } from "@/hooks/use-confirm";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import { useDeleteTask } from "../api/use-delete-task";

import { useRouter } from "next/navigation";
import { useEditTaskModal } from "../hooks/use-edit-task-modal";

interface TaskActionsProps {
  id: string;
  projectId: string;
  children: React.ReactNode;
};

export const TaskActions = ({
    id,
    projectId,
    children,
}: TaskActionsProps) => {

    const workspaceId = useWorkspaceId();
    const router = useRouter();

    const { open} = useEditTaskModal();

    const [ConfirmDialog, confirm] = useConfirm(
        "Delete Permit",
        "This action cannot be undone.",
        "destructive"
    );

    const { mutate, isPending } = useDeleteTask();

    const onDelete = async () => {
        const ok = await confirm();
        if (!ok) return;

        mutate({ param: { taskId: id } });
    };

    const onOpenTask = () => {
        router.push(`/workspaces/${workspaceId}/tasks/${id}`);
    };

    const onOpenProject = () => {
        router.push(`/workspaces/${workspaceId}/projects/${projectId}`);
    };
    
    return (
        <div className="flex justify-end">
            <ConfirmDialog />
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    {children}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>Permit Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={onOpenTask}
                        disabled={false}
                        className="font-medium p-[10px]"
                    >
                        <FileText className="mr-2 size-4 stroke-2" />
                        Permit Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={onOpenProject}
                        disabled={false}
                        className="font-medium p-[10px]"
                    >
                        <ExternalLinkIcon className="mr-2 size-4 stroke-2" />
                        Open Project
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => open(id)}
                        disabled={false}
                        className="font-medium p-[10px]"
                    >
                        <PencilIcon className="mr-2 size-4 stroke-2" />
                        Edit Permit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={onDelete}
                        disabled={isPending}
                        className="text-red-700 focus:text-red-700 font-medium p-[10px]"
                    >
                        <Trash2Icon className="mr-2 size-4 stroke-2" />
                        Delete Permit
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )

}
