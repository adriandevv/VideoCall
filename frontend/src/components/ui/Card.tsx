import * as React from "react";
import { cn } from "../../lib/utils";

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "rounded-xl border bg-white dark:bg-[#1c1a2e] border-slate-200 dark:border-[#2b2839] shadow-sm",
            className
        )}
        {...props}
    />
));
Card.displayName = "Card";

export { Card };
