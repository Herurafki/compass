import PricingColumn from "./PricingColumn";

import { tiers } from "@/data/pricing";

const Pricing: React.FC = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {tiers.map((tier) => (
                <PricingColumn key={tier.name} tier={tier} highlight={true} />
            ))}
        </div>
    )
}

export default Pricing