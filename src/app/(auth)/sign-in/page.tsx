import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import { SignInCardV2 } from "@/features/auth/components/sign-in-card-v2";

const SignInPage = async () => {
    const user = await getCurrent();
    if (user) return redirect("/");

    return <SignInCardV2 />;
};

export default SignInPage;