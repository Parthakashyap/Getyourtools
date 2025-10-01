import { cn } from "@/lib/utils";

export function AdsensePlaceholder({ className }: { className?: string }) {
  return (
    <div id="adsense" className={cn(
      "flex items-center justify-center bg-muted/50 border border-dashed rounded-lg text-muted-foreground min-h-[90px] w-full",
      className
    )}>
      Ad Placeholder
    </div>
  );
}
