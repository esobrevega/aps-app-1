import { Task } from "../types";
import { useState } from "react";

import { PencilIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateTask } from "../api/use-update-task";

interface TaskDescriptionProps {
    task: Task;
}

export const TaskDescription = ({
    task 
}: TaskDescriptionProps) => {

    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(task.description ?? "");

    const { mutate, isPending } = useUpdateTask();

    const handleSave = () => {
        mutate({
            json: { description: value },
            param: { taskId: task.$id }
        }, {
            onSuccess: () => setIsEditing(false),
        });
    }

    return (
        <div className="bg-muted p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
                <p className="text-lg font-semibold"> Overview </p>
                <Button onClick={() => setIsEditing((prev) => !prev)} size="sm" variant="secondary">
                    {isEditing ? (
                        <XIcon className="size-4 mr-2" />
                    ) : (
                        <PencilIcon className="size-4 mr-2" />
                    )}
                    {isEditing ? "Cancel" : "Edit"}
                </Button>
            </div>
            <hr className="my-4" />
            {isEditing ? (
                <div className="flex flex-col gap-y-4">
                    <Textarea 
                        value={value ?? ""} 
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Enter Permit description"
                        rows={4}
                        disabled={isPending}
                        />
                    <div className="flex justify-end">
                        <Button 
                            size="sm"
                            className="w-fit ml-auto"
                            onClick={handleSave} 
                            disabled={isPending}
                        >
                            {isPending ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </div>
            ) : (
                <div>
                    {task.description || 
                        <span className="text-sm text-muted-foreground">
                            No description available
                        </span>}
                </div>
            )}
        </div>
    );
};

