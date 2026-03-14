import { Check } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

interface PlanCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  isCurrent?: boolean;
  onSelect: () => void;
}

export function PlanCard({
  name,
  price,
  description,
  features,
  isPopular,
  isCurrent,
  onSelect,
}: PlanCardProps) {
  return (
    <Card
      className={`relative bg-[#121826] border transition-all duration-200 ${isPopular ? "border-green-500/50 glow" : "border-[#1E293B] hover:border-green-500/30"}`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-green-500 text-black font-medium px-3 py-1">
            Most Popular
          </Badge>
        </div>
      )}

      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl text-white">{name}</CardTitle>
        <div className="text-4xl font-bold text-green-400 mb-2">{price}</div>
        <p className="text-gray-400 text-sm">{description}</p>
      </CardHeader>

      <CardContent className="space-y-6">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-3">
              <Check className="w-5 h-5 text-green-400 shrink-0" />
              <span className="text-gray-300 text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          onClick={onSelect}
          disabled={isCurrent}
          className={`w-full font-medium ${isCurrent ? "bg-gray-600 text-gray-400 cursor-not-allowed" : isPopular ? "bg-greeen-500 hover:bg-green-600 text-white" : "bg-[#1E293B] hover:bg-[#334155] text-white border border-[#334155]"}`}
        >
          {isCurrent ? "Current Plan" : "Choose Plan"}
        </Button>
      </CardContent>
    </Card>
  );
}
