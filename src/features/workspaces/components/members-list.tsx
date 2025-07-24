"use client"

import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card"
import { useWorkspaceId } from "../hooks/use-workspace-id";




export const MembersList = () => {
    const workspaceId = useWorkspaceId();

    return (
        <Card className="w-full h-full border-none shadow-none relative overflow-hidden">
            <CardHeader className="border-b">
                <CardTitle className="text-lg font-semibold">
                    Members of Workspace {workspaceId}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
                {/* Placeholder for members list */}
                <p className="text-gray-500">Members list will be displayed here.</p>
            </CardContent>
        </Card>
    );
};