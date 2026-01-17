"use client";

import { cn } from "@/core/utils/cn";
import { PromiseCardProps } from "../types";

export const PromiseCard = ({
  icon: Icon,
  title,
  description,
  className,
}: PromiseCardProps) => {
  return (
    <div
      className={cn(
        "text-center p-6 border border-transparent hover:border-sand-light rounded-xl transition-all duration-300",
        className
      )}
    >
      <div className="w-16 h-16 mx-auto bg-sand-light text-forest rounded-full flex items-center justify-center mb-4">
        <Icon size={32} strokeWidth={1} />
      </div>
      <h3 className="font-serif text-xl font-bold text-jet mb-2">{title}</h3>
      <p className="text-jet/60">{description}</p>
    </div>
  );
};