import { auth } from "auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AuthForm from "../_components/auth-form";

export default async function AuthPage({ searchParams }: { searchParams: Promise<{ mode: string }> }) {
    const { mode } = await searchParams;
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (session) {
        redirect('/');
    }

    return <AuthForm signup={mode === 'signup'} />;
}