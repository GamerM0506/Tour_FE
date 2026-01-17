"use client";

import { Users, Heart, Leaf } from "lucide-react";
import { PromiseCard } from "./PromiseCard";

const PROMISE_ITEMS = [
    {
        icon: Users,
        title: "Small-Group",
        description: "Curated experiences that feel personal, warm, and genuine.",
    },
    {
        icon: Heart,
        title: "Honest Storytelling",
        description: "Real local perspectives, respect for culture and history.",
    },
    {
        icon: Leaf,
        title: "Sustainable",
        description: "Respect for health, the environment, and local communities.",
    },
];

export const PromiseSection = () => {
    return (
        <section className="py-20 container mx-auto px-4">
            <h2 className="text-center font-serif text-3xl md:text-4xl text-forest mb-16">
                Our Promise to You
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {PROMISE_ITEMS.map((item, index) => (
                    <PromiseCard
                        key={index}
                        icon={item.icon}
                        title={item.title}
                        description={item.description}
                    />
                ))}
            </div>
        </section>
    );
};