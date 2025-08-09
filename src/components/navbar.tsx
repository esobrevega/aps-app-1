"use client"

import { usePathname } from "next/navigation"

import { UserButton } from "@/features/auth/components/user-button"
import { MobileSidebar } from "./mobile-sidebar"

const pathNameMap = {
    "tasks": {
        title: "My Permits",
        description: "View and manage your permits"
    },
    "projects": {
        title: "My Projects",
        description: "View and manage your projects"
    }
}

const defaultMap = {
    title: "Dashboard",
    description: "Monitor all of your projects and permits here"
}

export const Navbar = () => {
    const pathName = usePathname();
    const pathNameParts = pathName.split("/");

    const pathNameKey = pathNameParts[3] as keyof typeof pathNameMap;
    const { title, description } = pathNameMap[pathNameKey] || defaultMap;

    return (
        <nav className="pt-4 px-6 flex items-center justify-between pb-3">
            <div className="flex-col hidden lg:flex">
                <h1 className="text-2xl font-semibold">{title}</h1>
                <p className="text-muted-foreground">{description}</p>
            </div>
            <MobileSidebar />
            <UserButton />
        </nav>
    )
}