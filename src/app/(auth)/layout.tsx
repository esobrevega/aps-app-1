"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
    const pathname = usePathname();
    const isSignIn = pathname === "/sign-in";

    return (
        <main
            className="flex h-screen"
            style={{
                backgroundImage: "url('/EA_bgslanted.jpg')",
                backgroundBlendMode: "overlay",
                backgroundColor: "rgba(0,0,0,0.2)",
            }}
        >
            {isSignIn ? (
                <>
                    <div
                        className="flex flex-col justify-center items-center w-full sm:w-1/2 p-8"
                        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                    >
                        {children}
                    </div>
                    <div className="hidden sm:flex justify-center items-center w-1/2">
                        <button className="px-10 py-3 rounded-full bg-gray-700 text-white font-medium">
                            <Link href="/sign-up"> Sign Up </Link>
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className="hidden sm:flex justify-center items-center w-1/2">
                        <button className="px-10 py-3 rounded-full bg-gray-700 text-white font-medium">
                            <Link href="/sign-in"> Login </Link>
                        </button>
                    </div>
                    <div
                        className="flex flex-col justify-center items-center w-full sm:w-1/2 p-8"
                        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                    >
                        {children}
                    </div>
                </>
            )}
        </main>
    );
};

export default AuthLayout;