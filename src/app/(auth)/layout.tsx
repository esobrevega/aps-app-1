"use client";

import Link from "next/link";
import Image from "next/image"

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

interface AuthLayoutProps {
    children: React.ReactNode;
};

const AuthLayout = ({ children}: AuthLayoutProps) => {
    const pathname = usePathname();

    return(
        <main className="bg-neutral-100 min-h-screen">
            <div className="mx-auto max-w-screen-2xl p-4">
                <nav className="flex justify-between items-center">
                    <Image 
                        src="/EA.svg" 
                        alt="Logo" 
                        width={164} 
                        height={48} 
                        priority
                        style={{ width: "164px", height: "auto" }} // ensures aspect ratio
                   />
                    <Button variant="secondary">
                    <Link href={pathname === "/sign-in" ? "/sign-up" : "/sign-in"}>
                        {pathname === "/sign-in" ? "Sign Up" : "Login"}
                        </Link>
                    </Button>
                </nav>
                <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
                    {children}
                </div>           
            </div>     
        </main> 
    );
}

export default AuthLayout;