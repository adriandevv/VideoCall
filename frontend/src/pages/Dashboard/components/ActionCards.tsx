import { Button } from "../../../components/ui/Button";
import { Icon } from "../../../components/ui/Icon";
import { useDashboardStore } from "../store/useDashboardStore";

export function ActionCards() {
    const { activeMeetingCode, setActiveMeetingCode } = useDashboardStore();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Start Meeting Card */}
            <div className="group relative overflow-hidden bg-primary p-8 rounded-xl shadow-2xl shadow-primary/10 flex flex-col justify-between min-h-[220px] transition-transform hover:scale-[1.01] cursor-pointer">
                <div className="absolute top-0 right-0 opacity-10 -mr-10 -mt-10 pointer-events-none">
                    <span className="material-symbols-outlined text-[180px]">video_call</span>
                </div>
                <div>
                    <div className="size-12 bg-white/20 rounded-full flex items-center justify-center mb-6">
                        <Icon name="video_call" className="text-white text-2xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Start New Meeting</h3>
                    <p className="text-white/80 max-w-[200px]">Instantly create a room and invite others with a link.</p>
                </div>
                <div className="flex items-center gap-2 text-white font-bold text-sm bg-white/10 w-fit px-4 py-2 rounded-full border border-white/20">
                    Get meeting link
                    <Icon name="arrow_forward" className="text-sm" />
                </div>
            </div>

            {/* Join Meeting Card */}
            <div className="group border-2 border-slate-200 dark:border-[#2b2839] bg-white dark:bg-[#1c1a2e] p-8 rounded-xl flex flex-col justify-between min-h-[220px] transition-transform hover:scale-[1.01] cursor-pointer">
                <div>
                    <div className="size-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                        <Icon name="keyboard" className="text-primary text-2xl" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Join with Code</h3>
                    <p className="text-slate-500 dark:text-[#a19db9]">Enter a meeting ID or paste a link to jump in.</p>
                </div>
                <div className="flex gap-3">
                    <input
                        className="flex-1 bg-slate-50 dark:bg-[#2b2839] border border-slate-200 dark:border-slate-700 rounded-full px-4 py-2 text-sm focus:ring-1 focus:ring-primary outline-none transition-all"
                        placeholder="e.g. abc-123-xyz"
                        type="text"
                        value={activeMeetingCode}
                        onChange={(e) => setActiveMeetingCode(e.target.value)}
                    />
                    <Button variant="secondary">Join</Button>
                </div>
            </div>
        </div>
    );
}
