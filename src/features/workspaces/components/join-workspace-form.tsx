"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { 
    Card, 
    CardContent, 
    CardDescription,
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";

import { useJoinWorkspace } from "../api/use-join-workspace";
import { useInviteCode } from "../hooks/use-invite-code";
import { useWorkspaceId } from "../hooks/use-workspace-id";

interface JoinWorkspaceFormProps {
    initialValues: {
        name: string;
    }
}

export const JoinWorkspaceForm = ({ 
    initialValues 
}: JoinWorkspaceFormProps) => {
    const router = useRouter();
    const workspaceId = useWorkspaceId();
    const inviteCode = useInviteCode();
    const { mutate, isPending } = useJoinWorkspace();

    const onSubmit = () => {
        mutate({
            param: { workspaceId },
            json: { code: inviteCode }
        }, {
            onSuccess: ({ data }) => {
                router.push(`/workspaces/${data.$id}`);
            },
        });
    };

    return (
        <Card className="w-full h-full border-none shadow-none relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-3 bg-green-500 z-10" />
            <CardHeader className="px-7 pt-3 pb-1">
                <CardTitle className="text-xl font-bold">
                    Join Workspace
                </CardTitle>
                <CardDescription>
                    You've been invited to join <strong>{initialValues.name}</strong> 
                </CardDescription>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator/>
            </div>
            <CardContent className="px-7 pt-3 pb-1">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-y-2 lg:gap-y-0 lg:gap-x-2">
                    <Button 
                        variant="secondary"
                        type="button"
                        className="w-full lg:w-fit"
                        size="lg"
                        asChild
                        disabled={isPending}
                    >
                        <Link href="/">
                            Cancel
                        </Link>
                    </Button>
                    <Button 
                        variant="primary"
                        className="w-full lg:w-fit bg-green-500"
                        type="button"
                        size="lg"
                        onClick={onSubmit}
                        disabled={isPending}
                    >
                        Join Workspace
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

