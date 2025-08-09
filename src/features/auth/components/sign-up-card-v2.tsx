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
    CardDescription,
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

import { registerSchema } from "../schemas";
import { useRegister } from "../api/use-register";

import { Input } from "@/components/ui/input";
import Link from "next/link";

export const SignUpCardV2 = () => {
    const { mutate, isPending } = useRegister();

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });

    const onSubmit = (values: z.infer<typeof registerSchema>) => {
        mutate({ json: values });
    }

    return(
        <div className="max-w-sm w-full text-center space-y-6">
            <h1 className="text-white text-3xl font-bold">Sign Up</h1>
            <p className="text-white text-sm">
                By signing up, you agree to our{" "}
                <Link href="/privacy">
                <span className="text-blue-700">Privacy Policy</span>
                </Link>{" "}
                and{" "}
                <Link href="/terms">
                <span className="text-blue-700">Terms of Service</span>
                </Link>
            </p>

            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="Enter your name"
                                            className="w-full px-5 py-3 rounded-full bg-white text-black outline-none"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                                            className="w-full px-5 py-3 rounded-full bg-white text-black outline-none"
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
                                            disabled={false}
                                            className="w-full px-5 py-3 rounded-full bg-white text-black outline-none"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={isPending} size="lg" className="w-full py-3 rounded-full bg-gray-700 text-white font-medium cursor-pointer">
                            Register
                        </Button>
                    </form>
                </Form>
            </CardContent>
            
            <p className="text-white">or</p>

            <CardContent className="p-7 flex flex-col gap-y-4">
                <Button
                    disabled={isPending}
                    variant="secondary"
                    size="lg"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-white text-black font-medium">
                    <FcGoogle className="mr-2 size-5"/>    
                    Register with Google
                </Button>
                <Button
                    disabled={isPending}
                    variant="secondary"
                    size="lg"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-white text-black font-medium">
                    <FaGithub className="mr-2 size-5"/>    
                    Register with Github
                </Button>
            </CardContent>

                <p className="text-sm text-white">
                    Already have an account?
                    <a href="/sign-in" className="text-primary-500 hover:underline ml-1">
                        Sign-in
                    </a>
                </p>
      
        </div>
    );
};