import * as React from "react";
import { cn } from "../../lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string;
    alt?: string;
    fallback?: string;
    status?: "online" | "offline" | "busy";
    size?: "sm" | "default" | "lg" | "xl";
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
    ({ className, src, alt, fallback, status, size = "default", ...props }, ref) => {
        return (
            <div className={cn("relative inline-block", className)} ref={ref} {...props}>
                <div
                    className={cn(
                        "rounded-full overflow-hidden bg-slate-200 bg-cover bg-center border-2 border-transparent",
                        {
                            "size-8": size === "sm",
                            "size-10": size === "default",
                            "size-12": size === "lg",
                            "size-16": size === "xl",
                        }
                    )}
                    style={{ backgroundImage: src ? `url('${src}')` : undefined }}
                >
                    {!src && (
                        <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                            {fallback || alt?.charAt(0) || "?"}
                        </div>
                    )}
                </div>
                {status && (
                    <span
                        className={cn(
                            "absolute bottom-0 right-0 rounded-full ring-2 ring-white dark:ring-background-dark",
                            {
                                "bg-green-500": status === "online",
                                "bg-slate-400": status === "offline",
                                "bg-red-500": status === "busy",
                                "size-2.5": size === "sm" || size === "default",
                                "size-3.5": size === "lg" || size === "xl",
                            }
                        )}
                    />
                )}
            </div>
        );
    }
);
Avatar.displayName = "Avatar";

export { Avatar };
