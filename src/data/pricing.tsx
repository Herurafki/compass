import { IPricing } from "@/types";
import { BiTimeFive, BiRuler } from "react-icons/bi";
import { BsCloudFog, BsSpeedometer2, BsThermometer, BsDroplet } from "react-icons/bs";


export const tiers: IPricing[] = [
    {
        features: 'Monitor compost temperature to ensure optimal microbial activity and decomposition rates.',
        name: 'Temperature Control',
        icon: <BsThermometer size={40} color="#3b82f6" className="mb-4" />
    },
    {
        features: 'Track moisture levels to maintain the ideal environment for decomposition.',
        name: 'Humidity Control',
        icon: <BsDroplet size={40} color="#3b82f6" className="mb-4" />
    },
    {
        features: 'Monitor CO₂ levels to assess microbial activity and compost maturity.',
        name: 'Carbon Dioxide Control',
        icon: <BsCloudFog size={40} color="#3b82f6" className="mb-4" />
    },
    {
        features: 'Track methane emissions to ensure aerobic conditions and prevent greenhouse gas release.',
        name: 'Methane Gas Control',
        icon: <BsSpeedometer2 size={40} color="#3b82f6" className="mb-4" />
    },
    {
        features: 'Monitor compost volume and settling to track decomposition progress.',
        name: 'Distance Control',
        icon: <BiRuler size={40} color="#3b82f6" className="mb-4" />
    },
    {
        features: 'Track composting duration and predict completion time based on current conditions.',
        name: 'Time Measurement',
        icon: <BiTimeFive size={40} color="#3b82f6" className="mb-4" />
    },
]