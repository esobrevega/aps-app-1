"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useConfirm } from "@/hooks/use-confirm";

import Image from "next/image"
import { useRouter } from "next/navigation";
import { useRef } from "react"; 
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { 
    AlertTriangle, 
    ArrowLeftIcon, 
    ImageIcon, 
} from "lucide-react";

import { updateProjectSchema } from "../schemas";
import { Project } from "../types";
import { useUpdateProject } from "../api/use-update-project";
import { useDeleteProject } from "../api/use-delete-project";

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

interface EditProjectFormProps {
    onCancel?: () => void;
    initialValues: Project;
};

export const EditProjectForm = ({ onCancel, initialValues }: EditProjectFormProps) => {
    const router = useRouter();
    const { mutate,isPending } = useUpdateProject();
    const { 
        mutate: deleteProject
    } = useDeleteProject();

    const [DeleteDialog, confirmDelete] = useConfirm(
        "Delete Project?",
        <>
            This action cannot be undone
        </>,       
        "destructive"
    );


   const inputRef = useRef<HTMLInputElement>(null);

    const form = useForm<z.infer<typeof updateProjectSchema>>({
        resolver: zodResolver(updateProjectSchema),
        defaultValues: {
            ...initialValues,
            image: initialValues.imageUrl ?? "",
        },
    });

    const handleDelete = async () => {
        const ok = await confirmDelete();

        if (!ok) return;

        deleteProject({
            param: { projectId: initialValues.$id },
        }, {
            onSuccess: () => {
                window.location.href = `/workspaces/${initialValues.workspaceId}`;
            },
        });
    };

    const onSubmit = (values: z.infer<typeof updateProjectSchema>) => {
        const finalValues = {
            ...values,
            image: values.image instanceof File ? values.image:"",
        };

        mutate({ 
            form: finalValues,
            param: { projectId: initialValues.$id } 
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue("image",file)
        }
    }
    return (
        <div className="flex flex-col gap-y-4">
            <DeleteDialog/>
            <Card className="w-full h-full border-none shadow-none relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-3 bg-violet-500 z-10" />

                <CardHeader className="flex flex-row items-center gap-x-4 px-7 pt-3 pb-1 space-y-0">
                    <Button size="sm" variant="secondary" onClick={onCancel ? onCancel: () => router.push(`/workspaces/${initialValues.workspaceId}/projects/${initialValues.$id}`)}>
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
                                                Project Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input 
                                                    {...field}
                                                    placeholder="Enter Project name"
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
                                                    <p className="text-sm">Project Icon</p>
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
                                    type="submit"    
                                    size="lg"
                                    disabled={isPending}
                                    className="bg-violet-500 hover:bg-violet-600 text-white"
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </Form>
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
                            Deleting a project is irreversible and will remove all data associated with the project as follows:
                            <br />– project
                            <br />– permits
                            <br />– tasks
                        </p>
                        <Button 
                            className="mt-6 w-fit ml-auto"
                            size="sm"
                            variant="destructive_secondary"
                            type="button"
                            disabled={isPending}
                            onClick={handleDelete}
                        >
                            Delete Project
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};