import Button  from "../ui/Button";

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

const PricingCard = ({ title, price, features, isPopular }: PricingCardProps) => {
  return (
    <div className={`p-8 rounded-2xl border ${isPopular ? "border-blue-500 shadow-xl" : "border-slate-200"} bg-white`}>
      {/* Sarlavha */}
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      
      {/* Narx qismi */}
      <div className="my-4">
        <span className="text-3xl font-bold">{price}</span>
        <span className="text-sm text-slate-500"> so'mdan</span>
      </div>
      
      {/* Imkoniyatlar ro'yxati */}
      <ul className="space-y-3 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="text-sm text-slate-600 flex items-center">
            <span className="mr-2 text-blue-500">✓</span> {feature}
          </li>
        ))}
      </ul>
      
      {/* Button komponentini chaqirish */}
      <Button variant={isPopular ? "primary" : "google"} fullWidth>
        Kunlashni boshlash
      </Button>
    </div>
  );
};
export default PricingCard;