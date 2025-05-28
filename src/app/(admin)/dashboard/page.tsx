import type { Metadata } from "next";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React from "react";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import PopUp from "@/components/chatbot/PopUp";

export const metadata: Metadata = {
  title:
    "Compass - Dashboard",
  description: "This is the profile page for the compass website. - Compass",
};

export default function Ecommerce() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 ">
        <EcommerceMetrics />
        <StatisticsChart  />
        <PopUp />
      </div>
    </div>
  );
}
