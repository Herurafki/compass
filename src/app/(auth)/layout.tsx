
import Image from "next/image";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compass - Authorization",
  description:
    "This is the authorization page for the compass website. - Compass",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative bg-white ">
      
        <div className="flex flex-col lg:flex-row w-full h-screen">
          {/* Kiri: Form Login */}
          <div
            className="w-full lg:w-1/2 flex justify-center items-start pt-16"
            // items-start: posisi konten mulai dari atas, bukan tengah
            // pt-16: beri jarak atas biar form tidak nempel ke atas (bisa diubah sesuai kebutuhan)
          >
            {children}
          </div>

          {/* Kanan: Full Gambar */}
          <div className="relative hidden lg:block w-full lg:w-1/2 h-full">
            <Image
              src="/images/New.jpg"
              alt="Tanah"
              fill
              className="object-cover"
              priority
              // Gambar akan memenuhi seluruh sisi kanan dengan mode cover
            />
          </div>

          
        </div>
     
    </div>
  );
}