import type { ReactElement, ReactNode } from "react";
import { useState } from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { ResponsiveModal } from "@/components/responsive-modal";

import { 
    Card,
    CardContent,
    CardDescription,
    CardTitle,
 } from "@/components/ui/card";
import { Trash2 } from "lucide-react";

 export const useConfirm = (
    title: string,
    message: ReactNode,
    variant: ButtonProps["variant"] = "primary"
 ): [() => ReactElement, () => Promise<unknown>] => {
    const [promise, setPromise] = useState<{ resolve: (value:boolean) => void } | null>(null);
    
    const confirm = () => {
        return new Promise((resolve)=>{
            setPromise({ resolve });
        });
    };

    const handleClose = () => {
        setPromise(null);
    };

    const handleConfirm = () => {
        promise?.resolve(true);
        handleClose();
    }

    const handleCancel = () => {
        promise?.resolve(false);
        handleClose();
    }

    const ConfirmationDialog = () => (
        // <ResponsiveModal open={ promise !== null } onOpenChange={handleClose}>
        //         <Card className="w-full h-full border-none shadow-none">
        //             <CardContent className="pt-8 text-center">
        //                 <CardHeader className="p-0">
        //                     <CardTitle className="text-2xl">{title}</CardTitle>
        //                     <CardDescription>{message}</CardDescription>
        //                 </CardHeader>
        //                 <div className="pt-4 w-full flex flex-col gap-y-2 gap-x-2 items-center justify-end">
        //                     <Button onClick={handleCancel} variant="outline" className="w-full lg:w-full">
        //                         Cancel
        //                     </Button>
        //                     <Button onClick={handleConfirm} variant={variant} className="w-full lg:w-full">
        //                         Confirm
        //                     </Button>
        //                 </div>
        //             </CardContent>
        //         </Card>
        // </ResponsiveModal>
    // )

        <ResponsiveModal open={ promise !== null } onOpenChange={handleCancel}>
            {/* Red bar at the top */}
            <div className="absolute top-0 left-0 w-full h-2 bg-red-500 z-10 rounded-t-lg" />

            {/* Trash icon overlapping top */}
            <div className="absolute left-1/2 -top-6 transform -translate-x-1/2 z-20">
                <div className="bg-red-500 rounded-full p-3 shadow-md">
                <Trash2 className="h-8 w-8 text-white" />
                </div>
            </div>

            {/* Modal content */}
            <Card className="pt-9 shadow-none border-none rounded-none">
                <CardContent className="pt-1 px-6 text-center space-y-2">
                    <CardTitle className="text-xl font-bold text-gray-900">{title}</CardTitle>
                    <CardDescription className="text-sm text-gray-500">{message}</CardDescription>
                </CardContent>
            </Card>

            {/* Footer */}
            <div className="bg-gray-100 px-4 py-4 flex flex-col lg:flex-row gap-2 lg:justify-end rounded-b-md">
                <Button variant="outline" onClick={handleCancel} className="flex-1">Cancel</Button>
                <Button variant="destructive" onClick={handleConfirm} className="flex-1">Confirm</Button>
            </div>
        </ResponsiveModal>
  );

    return [ConfirmationDialog, confirm];
};