"use client";
import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import { ApexOptions } from "apexcharts";
import ChartTab from "../common/ChartTab";
import dynamic from "next/dynamic";

// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// Type untuk data sensor
type SensorData = {
  temperature: number;
  humidity: number;
  gm: number;
  co2: number;
  tm: number;
  timestamp: string;
  [key: string]: number | string;
};

export default function StatisticsChart() {
  const [rawData, setRawData] = useState<SensorData[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<string>("temperature");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/raw/filtered");
        const json: SensorData[] = await res.json();
        const recent = json.slice(0, 10).reverse();
        setRawData(recent);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();

    const pusher = new Pusher("bc484970cb551cc676b8", {
      cluster: "ap1",
    });

    const channel = pusher.subscribe("sensor-channel");

    channel.bind("new-data", function (data: SensorData) {
      setRawData((prev) => {
        const updated = [...prev, data];
        return updated.slice(-10);
      });
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  const series = [
    {
      name: selectedMetric,
      data: rawData.map((item) => item[selectedMetric] as number),
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "line",
      height: 310,
      toolbar: { show: false },
      fontFamily: "Outfit, sans-serif",
    },
    colors: ["#465FFF"],
    stroke: {
      curve: "straight",
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    xaxis: {
      categories: rawData.map((item) =>
        new Date(item.timestamp).toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      ),
      labels: { style: { fontSize: "12px" } },
    },
    yaxis: {
      tickAmount: 5,
      labels: { style: { fontSize: "12px", colors: ["#6B7280"] } },
    },
    tooltip: {
      enabled: true,
      x: {
        format: "HH:mm:ss",
      },
    },
    dataLabels: { enabled: false },
    legend: { show: false },
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Statistics
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Monitoring {selectedMetric.toUpperCase()}
          </p>
        </div>
        <ChartTab onChange={(val) => setSelectedMetric(val)} />
      </div>

      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={310}
      />
    </div>
  );
}
