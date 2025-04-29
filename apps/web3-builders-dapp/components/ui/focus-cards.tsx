"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { BlurFade } from "../magicui/blur-fade";
import { useIsMobile } from '../../hooks/use-mobile';

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    description,
    setHovered,
    isMobile
  }: {
    card: any;
    index: number;
    hovered: number | null;
    description?: string;
    isMobile: boolean;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <BlurFade delay={0.5 * index}>
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-lg  self-center relative group bg-gray-100 dark:bg-neutral-900 hover:rotate-[-6deg] hover:scale-105 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]",
        isMobile && "h-96 max-w-md w-full self-center"
      )}
    >
      <img
        src={card.src}
        alt={card.title}
        className="object-cover group-hover:scale-[1.5] group-hover:rotate-12 transition-all duration-500 h-full absolute inset-0
        w-full
        "
      />
      <div
        className={cn(
          "absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
      >
      <div className="flex flex-col gap-2">
      <div className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
          {card.title}
        </div>
        {description && (
          <div className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">{description}</div>
        )}
      </div>
      </div>
    </div>
    </BlurFade>
  )
);

Card.displayName = "Card";

type Card = {
  title: string;
  src: string;
  description?: string;
};

export function FocusCards({ cards }: { cards: Card[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const isMobile = useIsMobile();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 py-6 w-full 
    ">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          isMobile={isMobile}
          description={card.description}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
