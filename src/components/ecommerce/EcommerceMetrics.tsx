"use client";
import React, { useEffect, useRef, useState } from "react";
import Pusher from "pusher-js";
import { FiInfo } from "react-icons/fi";
import infoText from "@/data/infotext";
import Badge from "../ui/badge/Badge";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  TemperatureIcon,
  HumidityIcon,
  GasIcon,
  Co2Icon,
  TimeIcon,
  DistanceIcon,
  CheckCircleIcon,
} from "@/icons";

// 1. Type definition
interface SensorData {
  temperature: number;
  humidity: number;
  gm: number;
  co2: number;
  tm: number;
  vol: number;
  timestamp: string;
}

// 2. Format time helper
const formatTimestamp = (timestamp: string): string =>
  new Date(timestamp).toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

export const EcommerceMetrics = () => {
  const [data, setData] = useState<SensorData | null>(null);
  const prevDataRef = useRef<SensorData | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);

  // 3. Fetch + Pusher
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const res = await fetch("http://localhost:3000/raw/filtered");
        const json: SensorData[] = await res.json();
        const latestData = json[0];
        setData(latestData);
        setLastUpdate(latestData.timestamp ? formatTimestamp(latestData.timestamp) : null);
      } catch (error) {
        console.error("Initial fetch error:", error);
      }
    };

    fetchInitialData();

    const pusher = new Pusher("bc484970cb551cc676b8", {
      cluster: "ap1",
    });

    const channel = pusher.subscribe("sensor-channel");

    channel.bind("new-data", (newData: SensorData) => {
      setData(newData);
      setLastUpdate(newData.timestamp ? formatTimestamp(newData.timestamp) : null);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  // 4. Simpan data sebelumnya
  useEffect(() => {
    if (data) {
      prevDataRef.current = data;
    }
  }, [data]);

  if (!data) return <p className="text-center text-gray-500">Loading...</p>;

  // 5. Bandingkan perubahan
  const renderChange = (key: keyof SensorData) => {
    const prev = prevDataRef.current?.[key];
    const current = data[key];

    if (typeof prev !== "number" || typeof current !== "number") return null;

    const diff = current - prev;
    const percentage = prev !== 0 ? ((diff / prev) * 100).toFixed(2) : "0.00";

    if (diff > 0) {
      return (
        <Badge color="warning" startIcon={<ArrowUpIcon />}>
          +{percentage}%
        </Badge>
      );
    } else if (diff < 0) {
      return (
        <Badge color="error" startIcon={<ArrowDownIcon />}>
          {percentage}%
        </Badge>
      );
    } else {
      return (
        <Badge color="success" startIcon={<CheckCircleIcon />}>
          Stabil
        </Badge>
      );
    }
  };

  const convertMinutesToTime = (minutes: number) => {
    const days = Math.floor(minutes / (24 * 60));
    const hours = Math.floor((minutes % (24 * 60)) / 60);
    const mins = minutes % 60;
    return `${days}d ${hours}h ${mins}m`;
  };

  return (
    <div className="relative w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
        <MetricCard
          icon={<TemperatureIcon className="w-6 h-6 text-gray-800 dark:text-white/90" />}
          label="Temperature"
          value={`${data.temperature} °c`}
          badge={renderChange("temperature")}
          infoText={infoText.temperature}
        />
        <MetricCard
          icon={<HumidityIcon className="w-6 h-6 text-gray-800 dark:text-white/90" />}
          label="Humidity"
          value={`${data.humidity} %`}
          badge={renderChange("humidity")}
          infoText={infoText.humidity}
        />
        <MetricCard
          icon={<GasIcon className="w-6 h-6 text-gray-800 dark:text-white/90" />}
          label="Gas Measurement"
          value={`${data.gm} ppm`}
          badge={renderChange("gm")}
          infoText={infoText.gm}
        />
        <MetricCard
          icon={<Co2Icon className="w-6 h-6 text-gray-800 dark:text-white/90" />}
          label="CO₂"
          value={`${data.co2} ppm`}
          badge={renderChange("co2")}
          infoText={infoText.co2}
        />
        <MetricCard
          icon={<TimeIcon className="w-6 h-6 text-gray-800 dark:text-white/90" />}
          label="Time Measurement"
          value={convertMinutesToTime(data.tm)}
          badge={null}
          infoText={infoText.tm}
        />
        <MetricCard
          icon={<DistanceIcon className="w-6 h-6 text-gray-800 dark:text-white/90" />}
          label="Volume"
          value={`${data.vol} Liter`}
          badge={renderChange("vol")}
          infoText={infoText.vol}
        />
      </div>

      {lastUpdate && (
        <div className="text-sm text-right text-dark-500 mt-4">
          Last Update: {lastUpdate}
        </div>
      )}
    </div>
  );
};

// 6. MetricCard component
const MetricCard = ({
  icon,
  label,
  value,
  badge,
  infoText,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  badge: React.ReactNode;
  infoText: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <button
        onClick={() => setIsOpen(true)}
        className="absolute top-3 right-3 text-gray-500 hover:text-blue-600"
        aria-label="Info"
      >
        <FiInfo className="w-5 h-5" />
      </button>

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
};
