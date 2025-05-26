"use client"
import React from "react"
import clsx from "clsx";
import { motion, Variants } from "framer-motion";

import { IPricing } from "@/types";

interface Props {
    tier: IPricing;
    highlight?: boolean;
}

const containerVariants: Variants = {
    offscreen: {
        opacity: 0,
        y: 100
    },
    onscreen: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            bounce: 0.2,
            duration: 0.9,
            delayChildren: 0.2,
            staggerChildren: 0.1,
        }
    }
};

const PricingColumn: React.FC<Props> = ({ tier, highlight }: Props) => {
    const { name,features,icon} = tier;

    return (
        <motion.div 
        className={clsx("w-full max-w-sm mx-auto bg-white rounded-xl border border-gray-200 lg:max-w-full", { "shadow-lg": highlight })}
        variants={containerVariants}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true }}>
                <div className="flex flex-col items-center rounded-lg border-collapse p-6 text-center">
                    {icon}
                    <p className="font-bold mb-0">{name}</p>
                    <p className="text-foreground-accent mb-5">{features}</p>
                </div>
        </motion.div>
    )
}

export default PricingColumn