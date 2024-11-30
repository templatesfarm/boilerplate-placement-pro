import { TechnologiesType } from "@/app/types/portfolio.types";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: TechnologiesType;
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const singleArray = useMemo(() => Object.values(items).flat(),[items]);

  return (
    <div
      className={cn(
        "grid grid-cols-2 lg:grid-cols-3 py-1 max-w-7xl",
        className
      )}
    >
      {singleArray?.map((tech, index) => 
        <div
          key={"" + index }
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === index && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-lg"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <div className="rounded-md w-full p-4 overflow-hidden bg-black ring-green-500 group-hover:ring-1  relative z-20 transition-all duration-500 cursor-pointer">
            <div className="py-5 z-50 relative space-y-10">
              <Image src={`/images${tech.imageName}`} width={50} height={50} alt={tech.label} className="mx-auto"/>
              <p className="text-2xl font-bold text-center text-gray-300">
                {tech.label}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
