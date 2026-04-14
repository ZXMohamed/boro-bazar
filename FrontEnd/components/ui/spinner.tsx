import { LuLoaderCircle } from "react-icons/lu";

import { cn } from "@/lib/utils";

interface SpinnerProps extends React.ComponentProps<"svg"> {
  size?: number | string;
}

function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <LuLoaderCircle
      role="status"
      aria-label="Loading"
      className={cn("text-primary animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
