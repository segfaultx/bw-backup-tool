import AuthForm from "../_components/auth-form";

export default async function AuthPage({ searchParams }: { searchParams: Promise<{ mode: string }> }) {
    const { mode } = await searchParams;
    return <AuthForm signup={mode === 'signup'} />;
}