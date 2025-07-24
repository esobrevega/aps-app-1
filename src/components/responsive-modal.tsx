import { useMedia } from "react-use";

import { 
    Dialog,
    DialogContent,
    DialogTitle
} from "@/components/ui/dialog";

import {
    Drawer,
    DrawerContent,
    DrawerTitle
} from "@/components/ui/drawer";

interface ResponsiveModalProps {
    children: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const ResponsiveModal = ({
    children, //:React.ReactNode
    open, //:boolean
    onOpenChange, //: (open: boolean) => void;
    //contentClassName?: string;
}:ResponsiveModalProps) => {
    const isDesktop = useMedia("(min-width: 1024px)", true);
    
    if (isDesktop){
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogTitle className="sr-only"></DialogTitle>
                <DialogContent className="w-full sm:max-w-md p-0 border-none overflow-visible hide-scrollbar rounded-lg">
                    <div className="overflow-hidden rounded-lg">
                        {children}
                    </div>
                </DialogContent>
            </Dialog>        
        )
    }

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerTitle className="sr-only" />
            <DrawerContent className="overflow-visible"> {/* <-- updated here */}
                <div className="w-full max-h-[85vh] hide-scrollbar overflow-hidden rounded-t-lg">
                  {children}
                </div>
            </DrawerContent>
        </Drawer>    
    );
};