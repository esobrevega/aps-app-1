import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<typeof client.api.members[":memberId"]["$patch"], 200>;
type RequestType = InferRequestType<typeof client.api.members[":memberId"]["$patch"]>;

export const useUpdateMember = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async({ param, json }) => { 
            const response = await client.api.members[":memberId"]["$patch"]({ param, json });
            
            if (!response.ok){
                throw new Error("Member Role update Failed");
            }
            
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Member Role Updated");
            queryClient.invalidateQueries({ queryKey: ["members"] });
        },
        onError: () => {
            toast.error("Member Role update failed!");
        }
    });
    return mutation;
};