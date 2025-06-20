import SignIn from "./sign-in";
import SignUp from "./sign-up";

export default function AuthForm({ signup }: { signup?: boolean }) {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-full max-w-md">
                {signup ?
                    <SignUp />
                    : <SignIn />}
            </div>
        </div>
    );
}