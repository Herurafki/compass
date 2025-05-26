import { IMenuItem, ISocials } from "@/types";

export const footerDetails: {
    subheading: string;
    quickLinks: IMenuItem[];
    email: string;
    telephone: string;
    socials: ISocials;
} = {
    subheading: "Smart Composting for a Greener Tomorrow. Turn waste into resource with real-time tracking and intelligent insights.",
    quickLinks: [
        {
            text: "About",
            url: "#about"
        },
        {
            text: "Features",
            url: "#features"
        },
        {
            text: "Contact",
            url: "#"
        }
    ],
    email: 'compass@gmail.com',
    telephone: '+628 1234 5678',
    socials: {
        // github: 'https://github.com',
        // x: 'https://twitter.com/x',
        twitter: 'https://twitter.com/Twitter',
        facebook: 'https://facebook.com',
        // youtube: 'https://youtube.com',
        linkedin: 'https://www.linkedin.com',
        // threads: 'https://www.threads.net',
        instagram: 'https://www.instagram.com',
    }
}