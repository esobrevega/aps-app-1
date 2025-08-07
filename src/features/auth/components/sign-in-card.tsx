"use client";

import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { 
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
 } from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { loginSchema } from "../schemas";
import { useLogin } from "../api/use-login";

export const SignInCard = () => {
    const { mutate, isPending } = useLogin(); 

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });
    
    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        mutate({json: values}); 
    };

    return(
        <Card className="h-full w-full md:w-[487px] border-none shadow-none">
            <CardHeader className="flex items-center justify-center text-center p-5">
                <CardTitle className="text-2xl">
                    Welcome Back!
                </CardTitle>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator/>
            </div>
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="email"
                                            placeholder="Enter Email Address"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            placeholder="Enter Password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={isPending} size="lg" className="w-full">
                            Login
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <div className="px-7">
                <DottedSeparator/>
            </div>
            <CardContent className="p-7 flex flex-col gap-y-4">
                <Button
                    disabled={isPending}
                    variant="secondary"
                    size="lg"
                    className="w-full">
                    <FcGoogle className="mr-2 size-5"/>    
                    Login with Google
                </Button>
                <Button
                    disabled={isPending}
                    variant="secondary"
                    size="lg"
                    className="w-full">
                    <FaGithub className="mr-2 size-5"/>    
                    Login with Github
                </Button>
            </CardContent>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="p-7 flex items-center justify-center">
                <p className="text-sm text-muted-foreground">
                    Don&apos;t have an account? 
                    <a href="/sign-up" className="text-primary-500 hover:underline ml-1">
                        Sign Up
                    </a>
                </p>
            </CardContent>
        </Card>
    );
};