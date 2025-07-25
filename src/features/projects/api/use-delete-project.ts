import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<typeof client.api.projects[":projectId"]["$delete"], 200>;
type RequestType = InferRequestType<typeof client.api.projects[":projectId"]["$delete"]>;

export const useDeleteProject = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async({ param }) => {
            const response = await client.api.projects[":projectId"]["$delete"]({ param });

            if (!response.ok){
                throw new Error("Project deletion Failed");
            }
            
            return await response.json();
        },
        onSuccess: ({ data }) => {
            toast.success("Project Deleted");
            router.refresh();
            queryClient.invalidateQueries({ queryKey: ["projects"]  });
            queryClient.invalidateQueries({ queryKey: ["project", data.$id] });
        },
        onError: () => {
            toast.error("Project deletion failed!");
        }
    });
    return mutation;
};