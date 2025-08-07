"use client";

import { ResponsiveModal } from "@/components/responsive-modal";

import { useCreateWorkspaceModal } from "../hooks/use-create-workspace-modal";
import { CreateWorkspaceFormModal } from "./create-workspace-form-modal";

export const CreateWorkspaceModal = () => {
    const { isOpen, setIsOpen, close} = useCreateWorkspaceModal();
    
    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
            <CreateWorkspaceFormModal onCancel={close}/>
        </ResponsiveModal>
    );
};