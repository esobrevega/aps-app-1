import { ExternalLinkIcon, FileText, PencilIcon, Trash2Icon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
    return (
        <div className="flex justify-end">
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    {children}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>Permit Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => {}}
                        disabled={false}
                        className="font-medium p-[10px]"
                    >
                        <FileText className="mr-2 size-4 stroke-2" />
                        Permit Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => {}}
                        disabled={false}
                        className="font-medium p-[10px]"
                    >
                        <ExternalLinkIcon className="mr-2 size-4 stroke-2" />
                        Open Project
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => {}}
                        disabled={false}
                        className="font-medium p-[10px]"
                    >
                        <PencilIcon className="mr-2 size-4 stroke-2" />
                        Edit Permit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => {}}
                        disabled={false}
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
