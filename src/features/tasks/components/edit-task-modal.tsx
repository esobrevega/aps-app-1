"use client";

import { EditTaskFormWrapper } from "./edit-task-form-wrapper";
import { useEditTaskModal } from "../hooks/use-edit-task-modal";
import { ResponsiveModal } from "@/components/responsive-modal";

export const EditTaskModal = () => {
    const { taskId, setTaskId, close } = useEditTaskModal();

    return (
        <ResponsiveModal open={!!taskId} onOpenChange={close}>
            {taskId && 
                <EditTaskFormWrapper id={taskId} onCancel={() => {
                    setTaskId(null);
                }} />
            }
        </ResponsiveModal>
    );
};
