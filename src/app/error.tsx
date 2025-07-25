"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";

const ErrorPage = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <AlertTriangle className="size-15 text-yellow-400" />
            <p className="text-center text-2xl font-semibold mt-4">
                404  |  This page cannot be found.
            </p>
            <Button variant="secondary" size="sm" className="mt-4">
                <Link href="/">
                    Back to home
                </Link>
            </Button>
        </div>
    );
}

export default ErrorPage;
