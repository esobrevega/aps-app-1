"use client"

import Link from "next/link";
import { Fragment } from "react";
import { ArrowLeftIcon, Loader, Loader2, LoaderPinwheel, LucideLoader, MoreVerticalIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { useWorkspaceId } from "../hooks/use-workspace-id";

import { MemberRole } from "@/features/members/types";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { useDeleteMember } from "@/features/members/api/use-delete-member";
import { useUpdateMember } from "@/features/members/api/use-update-member";
import { useConfirm } from "@/hooks/use-confirm";

// interface MembersListProps {
//     onCancel?: () => void;
//     initialValues: Member
// }

export const MembersList = () => {
    const workspaceId = useWorkspaceId();
    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure you want to remove this member?",
        "This action cannot be undone.",
        "destructive"
    );

    const { data, isLoading } = useGetMembers({ workspaceId });

    const {
        mutate: deleteMember,
        isPending: isDeletingMember
    } = useDeleteMember();

    const {
        mutate: updateMember,
        isPending: isUpdatingMember
    } = useUpdateMember();

    const handleUpdateMember = (memberId: string, role: MemberRole) => {
        updateMember({ 
            json: { role },
            param: { memberId }
        });
    };

    const handleDeleteMember = async (memberId: string) => {
        const ok = await confirm();
        if (!ok) return;

        deleteMember({ param: { memberId } }, {
            onSuccess: () => {
                window.location.reload();
           },
        });
    };

    return (
        <Card className="w-full h-full border-none shadow-none relative overflow-hidden">
            <ConfirmDialog />
            <div className="absolute top-0 left-0 w-full h-3 bg-blue-500" />
            <CardHeader className="flex flex-row items-center gap-x-4 pb-7 pt-3 space-y-0 border-b">
                <Button size="sm" variant="secondary">
                    <Link href={`/workspaces/${workspaceId}`} className="flex items-center">
                    <ArrowLeftIcon className="size-4 mr-2"/>
                        Back
                    </Link>
                </Button>
                <CardTitle className="text-xl font-bold">
                    Member List
                </CardTitle>
            </CardHeader>
            <CardContent className="pb-3">
                {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                        <LucideLoader className="size-6 animate-spin text-blue-500" />
                    </div>
                ) : (
                data?.documents.map(( member,index ) => (
                    <Fragment key={member.$id}>
                        <div className="flex items-center gap-2">
                            <MemberAvatar 
                                className="size-10"
                                fallbackClassName="text-lg"
                                name={member.name}
                            />
                            <div className="flex flex-col">
                                <p className="text-sm font-medium">{member.name}</p>
                                <p className="text-xs text-muted-foreground">{member.email}</p>
                                <p className="text-xs text-muted-foreground">{(member as any).role}</p>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button 
                                        size="icon" 
                                        variant="secondary" 
                                        className="ml-auto"
                                    >
                                        <MoreVerticalIcon className="size-4 text-muted-foreground" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="bottom" align="end">
                                        <DropdownMenuItem 
                                            className="font-medium"
                                            onClick={() => handleUpdateMember(member.$id, MemberRole.ADMIN)}
                                            disabled={isUpdatingMember}
                                        >
                                            Set as Administrator
                                        </DropdownMenuItem>
                                        <DropdownMenuItem 
                                            className="font-medium"
                                            onClick={() => handleUpdateMember(member.$id, MemberRole.MEMBER)}
                                            disabled={isUpdatingMember}
                                        >
                                            Set as Member
                                        </DropdownMenuItem>
                                        <DropdownMenuItem 
                                            className="font-medium text-amber-700"
                                            onClick={() => handleDeleteMember(member.$id)}
                                            disabled={isDeletingMember}
                                        >
                                            Remove {member.name}
                                        </DropdownMenuItem>                                    
                                    </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        {index < data.documents.length - 1 && (
                            <Separator className="my-2.5"/>
                        )}
                    </Fragment>
                )))}
            </CardContent>
        </Card>
    );
};