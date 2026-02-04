import * as React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "icon" | "destructive";
    size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "default", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-full font-bold transition-all disabled:opacity-50 disabled:pointer-events-none ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    {
                        "bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20":
                            variant === "primary",
                        "bg-slate-200 dark:bg-[#2b2839] hover:bg-primary hover:text-white dark:hover:bg-primary text-slate-800 dark:text-white":
                            variant === "secondary",
                        "hover:bg-slate-100 dark:hover:bg-[#2b2839] text-slate-600 dark:text-slate-300":
                            variant === "ghost",
                        "bg-red-500 text-white hover:bg-red-600": variant === "destructive",
                        "hover:bg-slate-100 dark:hover:bg-[#2b2839]": variant === "icon",
                        "h-10 px-5 py-2 text-sm": size === "default",
                        "h-8 px-3 text-xs": size === "sm",
                        "size-10 p-0 text-lg": size === "icon",
                    },
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
