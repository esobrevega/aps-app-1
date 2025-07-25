"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useConfirm } from "@/hooks/use-confirm";

import Image from "next/image"
import { useRouter } from "next/navigation";
import { useRef } from "react"; 
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { 
    AlertTriangle, 
    ArrowLeftIcon, 
    CopyIcon, 
    ImageIcon, 
    RefreshCcw 
} from "lucide-react";

import { updateWorkspaceSchema } from "../schemas";
import { Workspace } from "../types";
import { useUpdateWorkspace } from "../api/use-update-workspace";
import { useDeleteWorkspace } from "../api/use-delete-workspace";

import { Avatar, AvatarFallback} from "@/components/ui/avatar";
import { DottedSeparator } from "@/components/dotted-separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { useResetInviteCode } from "../api/use-reset-invite-code";
import { useConfirmReset } from "@/hooks/use-confirm-reset";

interface EditWorkspaceFormProps {
    onCancel?: () => void;
    initialValues: Workspace;
}

export const EditWorkspaceForm = ({ onCancel, initialValues }: EditWorkspaceFormProps) => {
    const router = useRouter();
    const { mutate,isPending } = useUpdateWorkspace();
    const { 
        mutate: deleteWorkspace, 
        isPending:isDeletingWorkspace 
    } = useDeleteWorkspace();
    const { 
        mutate: resetInviteCode, 
        isPending: isResettingInviteCode 
    } = useResetInviteCode();

    const [DeleteDialog, confirmDelete] = useConfirm(
        "Delete Workspace?",
        <>
            This action cannot be undone
        </>,       
        "destructive"
    );

    const [ResetDialog, confirmReset] = useConfirmReset(
        "Reset Invite Link?",
        <>
            This will invalidate the current invite link
        </>,       
        "destructive"
    );

   const inputRef = useRef<HTMLInputElement>(null);
   
    const form = useForm<z.infer<typeof updateWorkspaceSchema>>({
        resolver: zodResolver(updateWorkspaceSchema),
        defaultValues: {
            ...initialValues,
            image: initialValues.imageUrl ?? "",
        },
    });

    const handleDelete = async () => {
        const ok = await confirmDelete();

        if (!ok) return;

        deleteWorkspace({
            param: { workspaceId: initialValues.$id },
        }, {
            onSuccess: () => {
                //  router.push("/");
                window.location.href = "/";
            },
        });
    };

    const handleResetInviteCode = async () => {
        const ok = await confirmReset();

        if (!ok) return;

        resetInviteCode({
            param: { workspaceId: initialValues.$id },
        });
    };

    const onSubmit = (values: z.infer<typeof updateWorkspaceSchema>) => {
        const finalValues = {
            ...values,
            image: values.image instanceof File ? values.image:"",
        };

        mutate({ 
            form: finalValues,
            param: {workspaceId: initialValues.$id}
        }, {
           onSuccess: () => {
            form.reset();
            // onCancel?.();
           }
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue("image",file)
        }
    }

    const fullInviteLink = `${window.location.origin}/workspaces/${initialValues.$id}/join/${initialValues.inviteCode}`;

    const handleCopyInviteLink = () => {
        navigator.clipboard.writeText(fullInviteLink)
            .then(() => toast.success("Invite Link Copied"))
    }

    return (
        <div className="flex flex-col gap-y-4">
            <DeleteDialog/>
            <ResetDialog />
            <Card className="w-full h-full border-none shadow-none relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-3 bg-blue-500 z-10" />

                <CardHeader className="flex flex-row items-center gap-x-4 px-7 pt-3 pb-1 space-y-0">
                    <Button size="sm" variant="secondary" onClick={onCancel ? onCancel: () => router.push(`/workspaces/${initialValues.$id}`)}>
                        <ArrowLeftIcon className="size-4 mr-1"/>
                        Back
                    </Button>
                    <CardTitle className="text-xl font-bold">
                        {initialValues.name}
                    </CardTitle>
                </CardHeader>
                <div className="px-7">
                    <DottedSeparator />
                </div>
                <CardContent className="px-7">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Company Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input 
                                                    {...field}
                                                    placeholder="Enter Company name"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField 
                                    control={form.control}
                                    name="image"
                                    render={({ field }) => (
                                        <div className="flex flex-col gap-y-2">
                                            <div className="flex items-center gap-x-5">
                                                {field.value?(
                                                    <div className="size-[72px] relative rounded-md overflow-hidden">
                                                        <Image
                                                            alt="Logo"
                                                            fill
                                                            className="object-cover"
                                                            src={
                                                                field.value instanceof File
                                                                    ? URL.createObjectURL(field.value)
                                                                    : field.value
                                                            }
                                                        />
                                                    </div>    
                                                ) : (
                                                    <Avatar className="size-[72px]">
                                                        <AvatarFallback>
                                                            <ImageIcon className="size-[36px] text-neutral-400"/>
                                                        </AvatarFallback>
                                                    </Avatar>
                                                )}
                                                <div className="flex flex-col">
                                                    <p className="text-sm">Workspace Icon</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        JPG, PNG, SVG, or JPEG only. Max 1mb
                                                    </p>
                                                    <input 
                                                        className="hidden"
                                                        type="file"
                                                        accept=".jpg, .png, .svg, .jpeg"
                                                        ref={inputRef}
                                                        onChange={handleImageChange}
                                                        disabled={isPending}
                                                    />
                                                    {field.value ? (
                                                    <Button
                                                        type="button"
                                                        disabled={isPending}
                                                        variant="destructive_secondary"
                                                        size="xs"
                                                        className="w-fit mt-2"
                                                        onClick={() => {
                                                            field.onChange(null);
                                                            if (inputRef.current){
                                                                inputRef.current.value = "";
                                                            }
                                                        }}
                                                    >
                                                        Remove Image
                                                    </Button> 
                                                    ):(
                                                    <Button
                                                        type="button"
                                                        disabled={isPending}
                                                        variant="teritary"
                                                        size="xs"
                                                        className="w-fit mt-2"
                                                        onClick={() => inputRef.current?.click()}
                                                    >
                                                        Upload Image
                                                    </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div> 
                                    )}
                                />
                            </div>
                            <DottedSeparator className="py-5"/>
                            <div className="flex items-center justify-between">
                                <Button
                                    type="button"    
                                    size="lg"
                                    variant="secondary"
                                    onClick={onCancel}
                                    disabled={isPending}
                                    className={cn(!onCancel && "invisible")}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="secondary"
                                    className="w-fit text-blue-500"
                                    type="submit"    
                                    size="sm"
                                    disabled={isPending}
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <Card className="w-full h-full border-none shadow-none relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-3 bg-green-500 rounded-t-lg" />
                <CardContent className="px-7 pt-3">
                    <div className="flex items-center gap-x-2 font-bold text-lg pb-3">
                        <RefreshCcw className="w-7 h-7 text-green-500"  />
                        <span>Your invite Code is: {initialValues.inviteCode}</span>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm text-muted-foreground">
                            Use the invite link to add members to your workspace.
                        </p>
                        <div className="mt-4">
                            <div className="flex items-center gap-x-2">
                                    <Input className="text-sm" disabled value={fullInviteLink}/>
                                    <Button
                                        onClick={handleCopyInviteLink}
                                        variant="secondary"
                                        className="size-12"
                                    >
                                        <CopyIcon className="size-5"/>
                                    </Button>
                            </div>
                        </div>
                        <DottedSeparator className="py-7"/>
                        <Button 
                            className="mt-6 w-fit ml-auto text-green-500"
                            size="sm"
                            variant="secondary"
                            type="button"
                            disabled={isPending || isResettingInviteCode}
                            onClick={handleResetInviteCode}
                        >
                            Reset Invite Link
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <Card className="w-full h-full border-none shadow-none relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-3 bg-red-500 rounded-t-lg" />
                <CardContent className="px-7 pt-3">
                    <div className="flex items-center gap-x-2 font-bold text-lg pb-3">
                        <AlertTriangle className="w-7 h-7 text-red-500"  />
                        <span>Permanent Deletion</span>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm text-muted-foreground">
                            Deleting a company is irreversible and will remove all data associated with the workspace as follows:
                            <br />– company
                            <br />– permits
                            <br />– projects
                            <br />– tasks
                        </p>
                        <Button 
                            className="mt-6 w-fit ml-auto"
                            size="sm"
                            variant="destructive_secondary"
                            type="button"
                            disabled={isPending || isDeletingWorkspace}
                            onClick={handleDelete}
                        >
                            Delete Workspace
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};