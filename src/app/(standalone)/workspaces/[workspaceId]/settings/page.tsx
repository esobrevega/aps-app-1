import { getCurrent } from "@/features/auth/queries";
import { getWorkspace } from "@/features/workspaces/queries";
import { EditWorkspaceForm } from "@/features/workspaces/components/edit-workspace-form";

import { redirect } from "next/navigation";

interface WorkspaceIdSettingsPageProps {
    params: {
        workspaceId: string;
    };
};

const WorkspaceIdSettingsPage = async ({
    params,
}: WorkspaceIdSettingsPageProps) => {
    const user = await getCurrent();
    if (!user) redirect("/sign-in");

    const paramsAw = await params;

    const initialValues = await getWorkspace({workspaceId: paramsAw.workspaceId});

    return (
        <div className="w-full lg:max-w-xl ">
            <EditWorkspaceForm initialValues={initialValues}/>
        </div>
    );
};

export default WorkspaceIdSettingsPage;