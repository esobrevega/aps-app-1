"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SettingsIcon, UsersIcon } from "lucide-react";
import { GoCheckCircle, GoHome, GoHomeFill, GoInfo } from "react-icons/go";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import { cn } from "@/lib/utils";

const mainRoutes = [
    {
        label: "Dashboard",
        href:"",
        icon: GoHome,
        activeIcon: GoHomeFill,

    },
    {
        label: "All Permits",
        href:"/tasks",
        icon: GoCheckCircle,
        activeIcon: GoCheckCircle,

    },
    {
        label: "Members",
        href:"/members",
        icon: UsersIcon,
        activeIcon: UsersIcon,
    }
];

const subRoutes = [
    {
        label: "Settings",
        href:"/settings",
        icon: SettingsIcon,
        activeIcon: SettingsIcon,
    },
    {
        label: "About",
        href:"/about",
        icon: GoInfo,
        activeIcon: GoInfo,
    }
]

export const Navigation = () => {
    const workspaceId = useWorkspaceId();
    const pathname = usePathname();

    return (
        <ul className="flex flex-col">
            {mainRoutes.map((item) => {
                const fullHref = `/workspaces/${workspaceId}${item.href}`
                const isActive = pathname === fullHref;
                const Icon = isActive ? item.activeIcon : item.icon;

                return (
                    <Link key={item.href} href={fullHref}>
                        <div className={cn(
                            "flex items-center gap-2.5 p-2.5 rounded-md font-md hover:bg-[#2B2C36] transition text-white",
                            isActive && "bg-[#2B2C36] shadow-sm hover:opacity-100 text-white" 
                        )}>
                        <Icon className="size-5 text-white"/>
                            {item.label}
                        </div>
                    </Link>
                )
            })}
        </ul>
    );
};

export const SubNavigation = () => {
    const workspaceId = useWorkspaceId();
    const pathname = usePathname();

    return (
        <ul className="flex flex-col">
            {subRoutes.map((item) => {
                const fullHref = `/workspaces/${workspaceId}${item.href}`
                const isActive = pathname === fullHref;
                const Icon = isActive ? item.activeIcon : item.icon;

                return (
                    <Link key={item.href} href={fullHref}>
                        <div className={cn(
                            "flex items-center gap-2.5 p-2.5 rounded-md font-md hover:bg-[#2B2C36] transition text-white",
                            isActive && "bg-[#2B2C36] shadow-sm hover:opacity-100 text-white" 
                        )}>
                        <Icon className="size-5 text-white"/>
                            {item.label}
                        </div>
                    </Link>
                )
            })}
        </ul>
    );
};