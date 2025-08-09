import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import { SignUpCardV2 } from "@/features/auth/components/sign-up-card-v2";

const SignUpPage = async () => {
    const user = await getCurrent();

    if (user) return redirect("/");
    
    return <SignUpCardV2 />;
};

export default SignUpPage;