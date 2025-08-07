import Image from "next/image";

import { Navigation, SubNavigation } from "./navigation";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { Projects } from "./projects";

export const Sidebar = () => {
   // const { isLoading } = useWorkspaceSwitcher();

   return (
        // <aside className="h-full w-full bg-[#1F2028] rounded-r-2xl shadow-lg flex flex-col space-y-6 overflow-auto hide-scrollbar">
        //     {/* Logo */}
        //     <div className="flex items-center justify-center pb-2">
        //         <Link href="/">
        //         <Image
        //             src="/EA.svg"
        //             alt="Logo"
        //             width={164}
        //             height={48}
        //             priority
        //             className="h-auto w-[164px] invert"
        //         />
        //         </Link>
        //     </div>

        //     {/* Workspace Switcher */}
        //     <div className="px-2">
        //         <WorkspaceSwitcher />
        //     </div>

        //     {/* Navigation */}
        //     <nav className="flex-1 px-2">
        //         <Navigation />
        //     </nav>

        //     {/* Projects */}
        //     <div className="px-2 pt-4">
        //         <Projects />
        //     </div>
        // </aside>

        <aside className="h-full w-full bg-[#1F2028] text-white p-4 flex flex-col justify-between rounded-r-2xl shadow-md overflow-y-auto hide-scrollbar"> 
            
            {/* Top Section */}
            <div>
                {/* Logo */}
                <div className="flex items-center gap-2 mb-6">
                    <Image src="/EA.svg" alt="Logo" width={100} height={50} className="invert" />
                    <span className="text-lg font-semibold">Trakmit EA</span>
                </div>

                {/* Separator */}
                <hr className="my-4 border-gray-600" />


                {/* Workspace Switcher */}
                <div className="py-2 mb-6"> {/* bg-[#2B2C36] */}
                    <WorkspaceSwitcher />
                </div>

                {/* Separator */}
               <hr className="my-4 border-gray-600" />

                {/* Menu */}
                <nav className="text-sm space-y-1">
                    <p className="text-gray-400 mb-2">Menu</p>
                    <Navigation />
                </nav>

                {/* Separator */}
               <hr className="my-4 border-gray-600" />

                {/* Settings & About */}
                <nav className="text-sm space-y-1">
                    <SubNavigation />
                </nav>
                {/* Separator */}
                <hr className="my-4 border-gray-600 w-full" />
                    
                {/* Project Section */}
                <div className="mt-6"> 
                    <Projects />
                </div>
            </div>

           
            <>
            {/* Bottom Section */}
            {/* <div> */}
                {/* Theme Switcher */}
            {/* <div className="flex justify-between items-center bg-[#2B2C36] rounded-lg p-2 text-sm mb-4">
                    <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-[#3E3F4A] cursor-pointer">
                        <Moon size={14} />
                        <span>Dark</span>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1 rounded-lg cursor-pointer hover:bg-[#3E3F4A]">
                        <Sun size={14} />
                        <span>Light</span>
                    </div>
                </div>*/}
            {/* </div>  */}
            </>

            {/* User Card */}
            {/* <div className="flex items-center gap-3 text-sm bg-[#2B2C36] p-2 rounded-lg">
                <Image
                    src="/user.png"
                    alt="User"
                    width={36}
                    height={36}
                    className="rounded-full"
                />
                <div className="flex-1">
                    <p className="font-medium">Alenn.design</p>
                    <p className="text-xs text-gray-400">Alencio721996@gmail.com</p>
                </div>
                <Link href="#">
                    <span className="text-gray-400 hover:text-white">↗</span>
                </Link>
            </div> */}
        </aside>
    );
};