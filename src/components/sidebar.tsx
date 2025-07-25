import Link from "next/link";
import Image from "next/image";

import { Navigation } from "./navigation";
import { DottedSeparator } from "./dotted-separator";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { Projects } from "./projects";

import { useWorkspaceSwitcher } from "@/features/workspaces/hooks/use-workspace-switcher";

export const Sidebar = () => {
   // const { isLoading } = useWorkspaceSwitcher();
    
    return (
        <aside className="h-full bg-neutral-100 p-4 w-full">
            <Link href="/">
                <Image src="/EA.svg" alt="Logo" width={164} height={48} />
            </Link>
            <DottedSeparator className="my-4" />
            <WorkspaceSwitcher />
            <DottedSeparator className="my-4" />
            <Navigation />
            <DottedSeparator className="my-4" />
            <Projects />
        </aside>
    );
};