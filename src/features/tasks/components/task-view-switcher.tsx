"use client";

import { Button } from "@/components/ui/button";
import { DottedSeparator } from "@/components/dotted-separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { PlusIcon } from "lucide-react";

import { useCreateTasksModal } from "../hooks/use-tasks-modal";

export const TaskViewSwitcher = () => {
    const { open } = useCreateTasksModal();

    return (
        <Tabs
            className="flex-1 w-full border rounded-lg"
        >
            <div className="h-full flex flex-col overflow-auto p-2">
                <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
                    <TabsList className="w-full lg:w-auto"> 
                        <TabsTrigger
                            value="table"
                            className="h-8 w-full lg:w-auto"
                        >
                            Table
                        </TabsTrigger>
                        <TabsTrigger
                            value="kanban"
                            className="h-8 w-full lg:w-auto"
                        >
                            Kanban
                        </TabsTrigger>
                        <TabsTrigger
                            value="calendar"
                            className="h-8 w-full lg:w-auto"
                        >
                            Calendar
                        </TabsTrigger>
                    </TabsList>
                    <Button
                        onClick={open}
                        size="sm"
                        className="w-full lg:w-auto"
                    >
                        <PlusIcon className="mr-2 size-4" />
                        New                      
                    </Button>
                </div>   
                <DottedSeparator className="my-4" />
                    Data Filters
                <DottedSeparator className="my-4" />
                <>
                    <TabsContent value="table" className="mt-0">
                        Data Table
                    </TabsContent>
                    <TabsContent value="kanban" className="mt-0">
                        Data Kanban
                    </TabsContent>
                    <TabsContent value="calendar" className="mt-0">
                        Data Calendar
                    </TabsContent>
                </>
            </div>
        </Tabs>
    );
}

