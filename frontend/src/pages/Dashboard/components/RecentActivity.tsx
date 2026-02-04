import { Button } from "../../../components/ui/Button";
import { Icon } from "../../../components/ui/Icon";
import { getRecentActivity } from "../adapters/activityAdapter";

export function RecentActivity() {
    const activities = getRecentActivity();

    return (
        <section>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold tracking-tight">Recent Activity</h2>
                <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10">View All</Button>
            </div>
            <div className="flex flex-col gap-3">
                {activities.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-[#1c1a2e] border border-slate-100 dark:border-[#2b2839] hover:shadow-md transition-shadow">
                        {/* Icon/Avatar Logic */}
                        {item.type === 'missed_call' && (
                            <div className="size-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500 shrink-0">
                                <Icon name="call_missed" />
                            </div>
                        )}
                        {item.type === 'message' && item.user.avatar && (
                            <div className="size-12 rounded-full overflow-hidden bg-slate-100 shrink-0">
                                <div className="w-full h-full bg-cover" style={{ backgroundImage: `url('${item.user.avatar}')` }}></div>
                            </div>
                        )}
                        {item.type === 'reaction' && (
                            <div className="size-12 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center text-xl shrink-0">
                                🔥
                            </div>
                        )}

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold truncate">
                                {item.type === 'missed_call' && <>Missed video call from <span className="text-primary">{item.user.name}</span></>}
                                {item.type === 'message' && <>{item.meta?.groupName || item.user.name} <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full ml-2 align-middle">New Message</span></>}
                                {item.type === 'reaction' && <>{item.user.name} reacted to your message</>}
                            </h4>
                            <p className="text-sm text-slate-500 dark:text-[#a19db9] truncate">
                                {item.content}
                            </p>
                        </div>

                        {/* Action/Time */}
                        <div className="text-right shrink-0">
                            <p className="text-xs font-medium text-slate-400 mb-2">{item.timestamp}</p>
                            {item.type === 'missed_call' && (
                                <Button variant="primary" size="sm" className="bg-primary/10 text-primary hover:bg-primary hover:text-white">
                                    Call Back
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
