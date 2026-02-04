import { Button } from "../../../components/ui/Button";
import { Icon } from "../../../components/ui/Icon";
import { useDashboardStore } from "../store/useDashboardStore";

export function IncomingCall() {
    const { isIncomingCallVisible, setIncomingCallVisible } = useDashboardStore();

    if (!isIncomingCallVisible) return null;

    return (
        <div className="fixed bottom-10 right-10 bg-white dark:bg-[#1c1a2e] shadow-2xl rounded-2xl border-2 border-primary p-6 flex items-center gap-6 max-w-sm z-50 animate-bounce-subtle">
            <div className="relative">
                <div
                    className="size-16 rounded-full bg-cover ring-4 ring-primary/20"
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCb5yci1_ndxzO7ys_lpTvgohQatmUfD5t3abX13CgBcQOqy1hK-JDnppKjSBtGkNsiy-dYjALPdFjfBFUMol1pWkBmpisyyzSHI6j9vOBNTm5zZBLVZSUTjzvnkrfTRWGTR5jsAV0gQ4D0EHOtuSroRhFY3TE72M-WBld1lslevElFM7Sa52DkLVY200-_85ZxD7kqufZfAWVye-mxE60XpKA3ndss1HuWBnksEZ7sfJi_Sg2QuZ6hrTBtpslzCh2zQtxM4hPkZCw')" }}
                />
                <div className="absolute inset-0 rounded-full border-4 border-primary animate-ping opacity-25"></div>
            </div>
            <div className="flex-1">
                <p className="text-xs font-bold text-primary uppercase tracking-tighter">Incoming Call</p>
                <h5 className="text-lg font-bold leading-tight">David Wilson</h5>
                <p className="text-xs text-slate-400">Video Request</p>
            </div>
            <div className="flex gap-2">
                <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => setIncomingCallVisible(false)}
                    className="rounded-full"
                >
                    <Icon name="call_end" />
                </Button>
                <Button
                    variant="primary"
                    size="icon"
                    className="bg-green-500 hover:bg-green-600 rounded-full shadow-none"
                    onClick={() => alert("Accepting call...")}
                >
                    <Icon name="videocam" />
                </Button>
            </div>
        </div>
    );
}
