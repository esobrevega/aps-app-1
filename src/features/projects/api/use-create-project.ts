import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<typeof client.api.projects["$post"], 200>;
type RequestType = InferRequestType<typeof client.api.projects["$post"]>;

export const useCreateProject = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async({form}) => {
            const response = await client.api.projects["$post"]({ form });
            
            if (!response.ok){
                throw new Error("Project creation Failed");
            }
            
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Project Created");
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
        onError: () => {
            toast.error("Project creation failed!");
        }
    });
    return mutation;
};