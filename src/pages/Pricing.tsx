import PricingCard from "../components/pricing/PricingCard";
import PricingTable from "../components/pricing/PricingTable";
import PricingDiscount from "../components/pricing/PricingDiscount";

const Pricing = () => {
  // Kartalar uchun ma'lumotlar
  const cardData = [
    {
      title: "Boshlovchi",
      price: "390 000",
      features: [
        "Barcha video darslarga to'liq kirish",
        "Online chat orqali savol-javob",
      ],
    },
    {
      title: "Mashhur",
      price: "590 000",
      features: [
        "Barcha video darslar",
        "Haftalik jonli sessiyalar",
        "Shaxsiy mentor",
      ],
      isPopular: true,
    },
    {
      title: "Kasbiy",
      price: "890 000",
      features: ["Haftasiga 3 ta individual dars", "24/7 mentor yordami"],
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 py-16">
      <div className="container mx-auto px-4">
        {/* Sahifa Sarlavhasi */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Har bir kurs uchun adolatli narx
          </h1>
          <p className="text-slate-600">
            Yashirin to‘lovlar yo‘q, demo darslar bepul.
          </p>
        </section>

        {/* Narxlar kartalari */}
        <section className="grid md:grid-cols-3 gap-6 mb-20">
          {cardData.map((card, i) => (
            <PricingCard key={i} {...card} />
          ))}
        </section>

        {/* Chegirmalar */}
        <PricingDiscount />

        {/* Taqqoslash jadvali */}
        <PricingTable />
      </div>
    </main>
  );
};

export default Pricing ;
