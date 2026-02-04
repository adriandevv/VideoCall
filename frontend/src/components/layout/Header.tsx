import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { Input } from "../ui/Input";

export function Header() {
    return (
        <header className="h-20 border-b border-slate-200 dark:border-[#2b2839] px-10 flex items-center justify-between shrink-0 bg-background-light dark:bg-background-dark sticky top-0 z-10">
            <div className="flex items-center gap-4 w-full max-w-md">
                <Input placeholder="Search for people or groups..." icon="search" />
            </div>

            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="relative text-slate-600 dark:text-slate-300">
                    <Icon name="notifications" />
                    <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full"></span>
                </Button>

                <Button className="flex items-center gap-2">
                    <Icon name="add" className="text-lg" />
                    New Group
                </Button>
            </div>
        </header>
    );
}
