"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/core/components/ui/button";
import { cn } from "@/core/utils/cn";
import { Car, ChevronLeft, ChevronRight } from "lucide-react";
import { TourItinerary } from "../../types";
import { useTranslations } from "next-intl"; // 1. Import hook

interface ItinerarySliderProps {
    data?: TourItinerary;
}

export const ItinerarySlider = ({ data }: ItinerarySliderProps) => {
    const t = useTranslations("TourDetails.Itinerary"); // 2. Init hook
    const [currentStep, setCurrentStep] = useState(0);

    const steps = data?._steps?.sort((a, b) => a.order - b.order) || [];
    const totalSteps = steps.length;

    if (totalSteps === 0) return null;

    const nextStep = () => {
        if (currentStep < totalSteps - 1) setCurrentStep(currentStep + 1);
    };
    const prevStep = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    const progressPercentage = totalSteps > 1 ? (currentStep / (totalSteps - 1)) * 100 : 0;

    const activeStep = steps[currentStep];
    const activeImage =
        activeStep.images && activeStep.images.length > 0
            ? activeStep.images[0]
            : "/images/placeholder.jpg";

    return (
        <div className="py-12 bg-white select-none border-b border-sand-light">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="text-center mb-10">
                    <span className="text-terracotta text-xs font-bold tracking-[0.2em] uppercase block mb-2">
                        {t("subtitle")}
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl text-forest">
                        {t("title")}
                    </h2>
                </div>

                {/* Progress Bar & Steps */}
                <div className="relative pb-16 px-4 md:px-12 mb-8">
                    <div className="relative w-full h-1 bg-forest/10 rounded-full mt-8">
                        {/* Green Progress Line */}
                        <motion.div
                            className="absolute top-0 left-0 h-full bg-forest/40 rounded-full"
                            animate={{ width: `${progressPercentage}%` }}
                            transition={{ type: "spring", stiffness: 50, damping: 20 }}
                        />

                        {/* Moving Car Icon */}
                        <motion.div
                            className="absolute top-1/2 z-20 text-terracotta drop-shadow-md flex flex-col items-center"
                            style={{ x: "-50%", y: "-50%" }}
                            animate={{ left: `${progressPercentage}%` }}
                            transition={{ type: "spring", stiffness: 50, damping: 20 }}
                        >
                            <div className="bg-sand p-2 rounded-full border border-forest/10 shadow-xl relative z-10">
                                <Car size={28} fill="currentColor" className="transform -scale-x-100" />
                            </div>
                            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-sand -mt-1 relative z-0"></div>
                        </motion.div>

                        {/* Steps Dots */}
                        {steps.map((step, index) => {
                            const isActive = index <= currentStep;
                            const isCurrent = index === currentStep;
                            const leftPos = totalSteps > 1 ? (index / (totalSteps - 1)) * 100 : 50;

                            return (
                                <button
                                    key={index}
                                    onClick={() => setCurrentStep(index)}
                                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 group z-10 focus:outline-none flex flex-col items-center gap-3"
                                    style={{ left: `${leftPos}%` }}
                                >
                                    <div className={cn(
                                        "w-3 h-3 rounded-full border-2 transition-all duration-300 bg-sand",
                                        isActive ? "border-forest" : "border-forest/30",
                                        isCurrent ? "scale-150 bg-forest" : "group-hover:scale-125"
                                    )} />
                                    <span className={cn(
                                        "text-[10px] font-bold uppercase tracking-widest transition-all absolute top-6 whitespace-nowrap",
                                        isCurrent ? "text-forest opacity-100 translate-y-0" : "text-jet/30 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2"
                                    )}>
                                        {t("step_label", { order: step.order })}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Content Display Area */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
                    {/* Left: Image */}
                    <div className="relative aspect-[16/9] lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-sand-light order-1">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                className="relative w-full h-full"
                            >
                                <Image
                                    src={activeImage}
                                    alt={activeStep.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-1 rounded-full text-forest font-bold text-sm shadow-sm">
                                    {t("step_label", { order: activeStep.order })}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Buttons */}
                        <div className="absolute bottom-4 right-4 flex gap-2">
                            <Button variant="secondary" size="icon" onClick={prevStep} disabled={currentStep === 0} className="rounded-full h-10 w-10 bg-white/80 hover:bg-white text-forest backdrop-blur">
                                <ChevronLeft size={20} />
                            </Button>
                            <Button variant="default" size="icon" onClick={nextStep} disabled={currentStep === totalSteps - 1} className="rounded-full h-10 w-10 bg-forest hover:bg-terracotta text-sand shadow-lg">
                                <ChevronRight size={20} />
                            </Button>
                        </div>
                    </div>

                    {/* Right: Text Content */}
                    <div className="flex flex-col justify-center h-full order-2 lg:order-2 py-4">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                            >
                                <h3 className="font-serif text-3xl md:text-4xl text-forest leading-tight">
                                    {activeStep.title}
                                </h3>

                                {activeStep.description && (
                                    <p className="text-lg text-jet/70 leading-relaxed font-light whitespace-pre-line">
                                        {activeStep.description}
                                    </p>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

            </div>
        </div>
    );
};