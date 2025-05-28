import React, { useState } from "react";

type Option =
  | "optionOne"
  | "optionTwo"
  | "optionThree"
  | "optionFour"
  | "optionFive"

type Props = {
  onChange: (value: string) => void;
};
  
const ChartTab: React.FC<Props> = ({ onChange }) => {
  const [selected, setSelected] = useState<Option>("optionOne");

  const handleSelect = (option: Option, value: string) => {
    setSelected(option);
    onChange(value); // ini akan update chart-nya di komponen induk
  };

  const getButtonClass = (option: Option) =>
    selected === option
      ? "shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800"
      : "text-gray-500 dark:text-gray-400";

  return (
    <div className="flex items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
      <button
        onClick={() => handleSelect("optionOne", "temperature")}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900 dark:hover:text-white ${getButtonClass("optionOne")}`}
      >
        Temperature
      </button>

      <button
        onClick={() => handleSelect("optionTwo", "humidity")}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900 dark:hover:text-white ${getButtonClass("optionTwo")}`}
      >
        Humidity
      </button>

      <button
        onClick={() => handleSelect("optionThree", "gm")}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900 dark:hover:text-white ${getButtonClass("optionThree")}`}
      >
        Gas
      </button>

      <button
        onClick={() => handleSelect("optionFour", "co2")}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900 dark:hover:text-white ${getButtonClass("optionFour")}`}
      >
        CO₂
      </button>

      <button
        onClick={() => handleSelect("optionFive", "vol")}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900 dark:hover:text-white ${getButtonClass("optionFive")}`}
      >
        Volume
      </button>

    </div>
  );
};

export default ChartTab;
