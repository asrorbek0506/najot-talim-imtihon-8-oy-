export const PricingDiscount = () => {
  const discounts = [
    {
      title: "Oldindan to'lov",
      percent: "-15%",
      desc: "Kursni to'liq to'lang",
    },
    {
      title: "Aka-uka va opa-singillar",
      percent: "-10%",
      desc: "Birgalikda o'qing",
    },
    { title: "Talabalar uchun", percent: "-10%", desc: "Hujjat bilan" },
    {
      title: "Do'stingni olib kel",
      percent: "-5%",
      desc: "Siz ham, u ham yutadi",
    },
  ];

  return (
    <div className="py-16">
      <h2 className="text-2xl font-bold text-center mb-10">
        Kamroq to‘lash yo‘llari
      </h2>
      <div className="grid md:grid-cols-4 gap-4">
        {discounts.map((item, i) => (
          <div
            key={i}
            className="p-5 border border-slate-200 rounded-xl bg-white"
          >
            <div className="text-blue-600 font-bold mb-2">{item.percent}</div>
            <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
            <p className="text-xs text-slate-500">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PricingDiscount;
