import { FiActivity, FiBarChart2,  FiDollarSign,  FiMap,  FiPieChart } from "react-icons/fi";

import { IBenefit } from "@/types"
import { BiChat } from "react-icons/bi";

export const benefits: IBenefit[] = [
    {
        title: "What is COMPASS ?",
        description: "COMPASS (Compost Process Automation and Sensor System) is an IoT-based organic waste processing system designed to unify and automate the composting process. It uses sensors to monitor various environmental factors, such as temperature, moisture, and methane emissions, and controls the composting process accordingly. By automating the composting process, COMPASS can help to reduce waste and promote environmental sustainability.",
        bullets: [
           
        ],
        imageSrc: "/images/mockup-1.jpg"
    },
    {
        title: "Why COMPASS ?",
        description: "COMPASS provides a cost-effective solution for composting, saving you time and money. It's a great way to reduce waste and promote environmental sustainability.",
        bullets: [
            {
                title: "Real-Time Monitoring",
                description: "Monitors environmental factors in real-time, allowing you to make informed decisions about your composting process.",
                icon: <FiPieChart size={26} />
            },
            {
                title: "Cost Effective",
                description: "Saves money by automating the composting process and reducing waste.",
                icon: <FiDollarSign size={26} />
            },
            {
                title: "AI Chatbot Assistant",
                description: "Our AI chatbot helps you with all your composting questions.",
                icon: <BiChat size={26} />
            }
        ],
        imageSrc: "/images/mockup-2.png"
    },
    {
        title: "How It Works",
        description: "COMPASS uses more than five sensors to monitor environmental factors in real-time, and uses a secure authentication system to ensure that only authorized users can access their accounts.",
        bullets: [
            {
                title: "Install a Compass sensor in your area",
                description: "Place the COMPASS sensor in your composting area to start collecting real-time data on temperature, moisture, and gas levels—no technical skills needed.",    
                icon: <FiMap size={26} />
            },
            {
                title: "Monitor compost on your dashboard",
                description: "Access your personalized dashboard to view live updates, trends, and historical data, helping you make informed decisions about your compost’s health.",
                icon: <FiBarChart2 size={26} />
            },
            {
                title: "View Historical Sensor Data",
                description: "Easily access and analyze historical data to track compost trends over time. Whether it's temperature, humidity, or gas levels, COMPASS keeps everything logged and ready.",
                icon: <FiActivity size={26} />
            }
        ],
        imageSrc: "/images/mockup-3.jpg"
    },
]