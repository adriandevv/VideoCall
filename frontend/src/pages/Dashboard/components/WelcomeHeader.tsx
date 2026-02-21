import { useAuthStore } from "../../../store/authStore";

export function WelcomeHeader() {
    const { user } = useAuthStore();
    return (
        <div className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight mb-2">Welcome back, {user?.username}! 👋</h1>
            <p className="text-slate-500 dark:text-[#a19db9] text-lg">
                Ready for your next meeting? Here's what's happening today.
            </p>
        </div>
    );
}
