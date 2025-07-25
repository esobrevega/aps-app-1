import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";

export function useWorkspaceSwitcher() {
    const { isLoading } = useGetWorkspaces();
    return { isLoading };
}