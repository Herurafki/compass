import React, { useState } from 'react';
import { FiInfo } from 'react-icons/fi';

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  badge: React.ReactNode;
  infoText: string;
}

export default function MetricCard({
  icon,
  label,
  value,
  badge,
  infoText,
}: MetricCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      {/* Info Icon */}
      <button
        onClick={() => setIsOpen(true)}
        className="absolute top-3 right-3 text-gray-500 hover:text-blue-600"
        aria-label="Info"
      >
        <FiInfo className="w-5 h-5" />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg max-w-md w-full shadow-xl">
            <h2 className="text-lg dark:text-white font-semibold mb-2">{label}</h2>
            <div className="text-gray-700 dark:text-gray-400 whitespace-pre-line">
              {infoText}
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={() => setIsOpen(false)}
                className="text-sm text-blue-600 hover:underline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Icon utama */}
      <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-500">
        {icon}
      </div>

      <div className="flex items-end justify-between mt-5">
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
          <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            {value}
          </h4>
        </div>
        {badge}
      </div>
    </div>
  );
}
