import Link from "next/link";
import { type Tool } from "@/config/site";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  tool: Tool;
  className?: string;
}

export function ToolCard({ tool, className }: ToolCardProps) {
  const Icon = tool.icon;
  return (
    <Link href={tool.path} className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg">
      <Card className={cn("hover:border-primary/80 hover:shadow-lg transition-all duration-300 h-full", className)}>
        <CardHeader>
          <div className="mb-4 flex justify-center items-center">
             <div className="p-4 bg-primary/10 rounded-lg">
                <Icon className="h-8 w-8 text-primary" />
             </div>
          </div>
          <CardTitle className="text-center">{tool.name}</CardTitle>
          <CardDescription className="text-center !mt-2">{tool.description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
