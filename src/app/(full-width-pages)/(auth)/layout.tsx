"use client";
import Image from "next/image";
import React, { useEffect } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.documentElement.classList.remove("dark"); // ⛔ paksa light mode
  }, []);

  return (
    <div className="relative bg-white">
      <div className="flex flex-col lg:flex-row w-full h-screen">
        {/* Kiri: Form Login */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          {children}
        </div>

        {/* Kanan: Full Gambar */}
        <div className="relative hidden lg:block w-full lg:w-1/2 h-full">
          <Image
            src="/images/Sarung.jpg"
            alt="Tanah"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}
