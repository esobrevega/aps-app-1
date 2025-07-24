import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<typeof client.api.auth.register["$post"]>;
type RequestType = InferRequestType<typeof client.api.auth.register["$post"]>;

export const useRegister = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async({json}) => {
            const response = await client.api.auth.register["$post"]({ json });
            
            if (!response.ok){
                throw new Error("Registration Failed");
            }
            
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Successfully registered!");
            router.refresh();
            queryClient.invalidateQueries({ queryKey: ["current"] });
            // Optionally, you can redirect or perform other actions after registration
        },
        onError: ()=> {
            toast.error("Registration Failed")
        }   
    });
    return mutation;
};