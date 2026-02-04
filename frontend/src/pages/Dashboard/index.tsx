import { WelcomeHeader } from "./components/WelcomeHeader";
import { ActionCards } from "./components/ActionCards";
import { RecentActivity } from "./components/RecentActivity";
import { IncomingCall } from "./components/IncomingCall";

export default function Dashboard() {
    return (
        <>
            <WelcomeHeader />
            <ActionCards />
            <RecentActivity />
            <IncomingCall />
        </>
    );
}
