'use client';

import React from 'react';
import Image from 'next/image';
import { testimonials } from '@/data/testimonials';
import { motion } from 'framer-motion';

const InstitutionHighlight: React.FC = () => {
    return (
        <div className="grid gap-10 max-w-6xl mx-auto px-4 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col items-center text-center"
                >
                    <div className="w-20 h-20 relative mb-4">
                        <Image
                            src={item.avatar}
                            alt={`${item.name} logo`}
                            fill
                            style={{ objectFit: "contain" }}
                            className="rounded-full"
                        />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{item.name}</h3>
                    <p className="text-sm text-blue-500 mb-3 font-medium">{item.role}</p>
                    <p className="text-gray-600 text-sm">{item.message}</p>
                </motion.div>
            ))}
        </div>
    );
};

export default InstitutionHighlight;
