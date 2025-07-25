"use client";

import { useCreateTasksModal } from "../hooks/use-tasks-modal";
import { ResponsiveModal } from "@/components/responsive-modal";
import { CreateTaskFormWrapper } from "./create-task-form-wrapper";

export const CreateTaskModal = () => {
    const { isOpen, setIsOpen, close } = useCreateTasksModal();

    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
            <div className="p-6">
                <CreateTaskFormWrapper onCancel={close} />
            </div>
        </ResponsiveModal>
    );
};
