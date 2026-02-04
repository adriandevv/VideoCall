import { cn } from "../../lib/utils";

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
    name: string;
}

export function Icon({ name, className, ...props }: IconProps) {
    return (
        <span className={cn("material-symbols-outlined select-none", className)} {...props}>
            {name}
        </span>
    );
}
