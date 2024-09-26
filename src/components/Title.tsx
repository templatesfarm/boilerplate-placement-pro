import { cn } from "@/lib/utils";

export default function Title({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <>
      <div className={cn("", className)}>
        <h1 className="text-3xl font-bold group-hover:text-green-400 transition-all ">
          {title}
        </h1>
        <div className="w-40 h-1 bg-green-500 rounded-full"></div>
        <div className="w-40 h-1 bg-indigo-500 rounded-full translate-x-2"></div>
      </div>
    </>
  );
}
