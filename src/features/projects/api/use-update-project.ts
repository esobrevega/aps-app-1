import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<typeof client.api.projects[":projectId"]["$patch"], 200>;
type RequestType = InferRequestType<typeof client.api.projects[":projectId"]["$patch"]>;

export const useUpdateProject = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async({form, param}) => {
            const response = await client.api.projects[":projectId"]["$patch"]({ form, param });

            if (!response.ok){
                throw new Error("Project update Failed");
            }
            
            return await response.json();
        },
        onSuccess: ({ data }) => {
            toast.success("Project Updated");
            router.refresh();
            queryClient.invalidateQueries({ queryKey: ["projects"]  });
            queryClient.invalidateQueries({ queryKey: ["project", data.$id] });
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            queryClient.refetchQueries({ queryKey: ["tasks"] });
        },
        onError: () => {
            toast.error("Project update failed!");
        }
    });
    return mutation;
};