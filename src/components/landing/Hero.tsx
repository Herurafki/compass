'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';


import { heroDetails } from '@/data/hero';
import Link from 'next/link';

const Hero: React.FC = () => {
    return (
        <section
            id="hero"
            className="relative flex items-center justify-center pb-0 pt-32 md:pt-40 px-5"
        >
            <div className="absolute left-0 top-0 bottom-0 -z-10  w-full">
                <div className="absolute inset-0">
                    <Image
                        src="/images/image.png"
                        alt="Background"
                        fill
                        className="object-cover "
                        priority
                    />
                </div>

                {/* Grid + Mask */}
                <div className="absolute inset-0 h-full w-full 
                    bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] 
                    bg-[size:40px_40px] 
                    [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]">
                </div>
            </div>


            <div className="text-center">
                <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="text-3xl md:text-6xl md:leading-tight font-bold text-foreground  mx-auto">{heroDetails.heading}
                </motion.h1>

                <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }} 
                className="mt-4 text-foreground max-w-lg mx-auto">{heroDetails.subheading}
                </motion.p>

                <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
                className="mt-6 flex flex-col sm:flex-row items-center sm:gap-4 w-fit mx-auto">
                <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 transition">
                Start Monitoring
                </button>
                <Link href={'/signup'}></Link>
                </motion.div>

                <motion.div
                className="mt-4 mb-8 flex flex-col sm:flex-row items-center sm:gap-4 w-fit mx-auto">
                </motion.div>
                
            </div>
        </section>
    );
};

export default Hero;
