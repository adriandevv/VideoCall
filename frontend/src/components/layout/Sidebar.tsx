import { Link, useLocation } from "react-router-dom";
import { Avatar } from "../ui/Avatar";
import { Icon } from "../ui/Icon";
import { cn } from "../../lib/utils";
import { useAuthStore } from "../../store/authStore";

export function Sidebar() {
    const location = useLocation();
    const { user } = useAuthStore();

    const navItems = [
        { icon: "grid_view", label: "Dashboard", path: "/" },
        { icon: "call", label: "Calls", path: "/calls", badge: 2 },
        { icon: "group", label: "Contacts", path: "/contacts" },
        { icon: "settings", label: "Settings", path: "/settings" },
    ];

    const activeContacts = [
        { name: "Sarah Jenkins", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3MleUiNAmSM6i-CUIRfmVpGltKHsIa5uBWauBssVCA4C_rBzohix_5EIOipIQv4veK26LIcKfxaaTxEnNWhlS8gIIPN2L4Q5VALiEhp29xX3AVWCo1zvJWRwmPmmkK0Jr3Y0jbWTEyOAld7kkxc95UQb_g_AuUviGQDhp2q_jG6fpdZta_s4UdsrNb8k9jZRpSXfhCetN8i6q9Se9qQ-xv3BTawwtCpRzvTTW9EBgqmWsUWBhtrV9ZCZjCZM_azkHApCLZE20uys", status: "online" as const },
        { name: "Mike Ross", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9OgBJYRSdG-pSjLeOXBKwVt7oEnqAYILIO8LvjbqGyNoCylCo_wbUk2XNif_DKLuLs_dTtJcgIma0J7FP4HIYvAY7XWujU1IWoInV0pQuiP-XsT9rIUgTbA7LE4nLsaLpgZDQpGRjcc5-GIqDMXvfCeK9n4rRaW4HNa3c0BTM_sS5gV0pAezBRKo6dvYPGSuaVKc7r0JfDiSpcbTM7s1tLNCtR78UajoqGWkk-lz6Fgw8LryeDX1s3ht1VRuujXbCoKs7PFZYeTc", status: "online" as const },
        { name: "Jordan Smith", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAA8JfUtvC6cC3brV4f3hncybt26Bgby4ND3VDu-GcNY2HbxO5WThFYo8JrOA0pzRWfNUphI15UnxpG69YWJ6OO8Rn7Fxm-82dQT7oRYgjz_8ayqVdI3IplcQ5efbwppZjLQWrW7x3NS8EjcIKuddQ11QU7tOVB7E3kryxPGO8rZQd1K5avPcuXRrJ7BSguiHt8-xdbf4mIXg-fHmseKeVyRq1rrSl1Khk-JUKjUVbcay2y1kfAOtOB5sugJiLEC9nLP908mjOwQjk", status: "offline" as const },
    ];

    return (
        <aside className="w-72 border-r border-slate-200 dark:border-[#2b2839] flex flex-col h-screen sticky top-0 bg-background-light dark:bg-background-dark shrink-0">
            <div className="p-6 flex flex-col h-full">
                {/* Logo */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white">
                        <Icon name="videocam" />
                    </div>
                    <h2 className="text-xl font-bold tracking-tight">ConnectVideo</h2>
                </div>

                {/* Profile */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-100 dark:bg-[#1c1a2e] mb-6">
                    {user?.avatar ? (
                        <img
                            src={user.avatar}
                            alt={user.username}
                            className="w-10 h-10 border-2 border-primary rounded-full object-cover p-0.5"
                        />
                    ) : (
                        <div className="w-10 h-10 border-2 border-primary rounded-full p-0.5 flex items-center justify-center bg-slate-200 dark:bg-[#2b2839]">
                            <span className="text-sm font-bold">{user?.username?.[0]?.toUpperCase() || '?'}</span>
                        </div>
                    )}
                    <div className="flex flex-col">
                        <h1 className="text-sm font-bold">{user?.username}</h1>
                        <p className="text-slate-500 dark:text-[#a19db9] text-xs">Available</p>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex flex-col gap-2 mb-8">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link key={item.path} to={item.path}>
                                <div
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-full cursor-pointer transition-all",
                                        isActive
                                            ? "active-nav font-semibold"
                                            : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#2b2839] font-medium"
                                    )}
                                >
                                    <Icon name={item.icon} />
                                    <p className="text-sm">{item.label}</p>
                                    {item.badge && (
                                        <span className="ml-auto bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                                            {item.badge}
                                        </span>
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                {/* Active Contacts */}
                <div className="flex-1 overflow-hidden flex flex-col">
                    <h3 className="px-4 text-[11px] uppercase tracking-widest text-slate-400 dark:text-[#a19db9] font-bold mb-4">
                        Active Now
                    </h3>
                    <div className="flex flex-col gap-4 overflow-y-auto px-2 custom-scrollbar">
                        {activeContacts.map((contact, i) => (
                            <div key={i} className="flex items-center gap-3 group cursor-pointer hover:bg-slate-50 dark:hover:bg-[#1c1a2e]/50 p-2 rounded-xl transition-colors">
                                <Avatar src={contact.avatar} status={contact.status} size="sm" />
                                <span className="text-sm font-medium group-hover:text-primary transition-colors">
                                    {contact.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
}
