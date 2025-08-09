"use client";

import { FcGoogle } from "react-icons/fc"
import { FaGithub, FaGoogle } from "react-icons/fa"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

export const SignInCardV2 = () => {
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

    return (
        <div className="max-w-sm w-full text-center space-y-6">
            <h1 className="text-white text-3xl font-bold">Welcome back!</h1>

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
                                        placeholder="Email Address"
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
                                        placeholder="Password"
                                        className="w-full px-5 py-3 rounded-full bg-white text-black outline-none"
                                    />
                                    </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <p className="text-white text-sm text-right cursor-pointer hover:underline">
                        Forgot Password?
                    </p>

                    <Button disabled={isPending} className="w-full py-3 rounded-full bg-gray-700 text-white font-medium cursor-pointer">
                        Login
                    </Button>
                </form>
            </Form>

            <p className="text-white">or</p>

            <Button className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-white text-black font-medium">
                <FcGoogle /> Login with Google
            </Button>

            <Button className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-white text-black font-medium">
                <FaGithub /> Login with Github
            </Button>

          <p className="text-white text-sm">
            Don&apos;t have account yet?{" "}
            <a href="/sign-up" className="text-primary-500 hover:underline ml-1">
                Sign-up
            </a>
          </p>
        </div>
    );
};