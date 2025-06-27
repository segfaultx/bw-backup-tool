'use client';
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { authClient } from "~/lib/auth-client";

export default function ProfileMenu({ className = '' }: { className?: string }) {
    const router = useRouter();

    return (
        <div className={className}>
            <DropdownMenu>
                <DropdownMenuTrigger>Profile</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel className="cursor-pointer" onClick={async () => {
                        await authClient.signOut({
                            fetchOptions: {
                                onSuccess: () => {
                                    router.push('/auth?mode=signin');
                                }
                            }
                        });
                    }}>
                        Logout
                    </DropdownMenuLabel>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}