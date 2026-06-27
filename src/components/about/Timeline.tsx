export const Timeline = () => {
  const history = [
    {
      year: "2015",
      title: "Asos solindi",
      desc: "Loyihamiz o'z faoliyatini boshladi.",
    },
    {
      year: "2017",
      title: "Birinchi muvaffaqiyat",
      desc: "500-talaba bitirdi. Bizning ofisimiz kengaytirildi va 5 ta yangi yo'nalish ochildi.",
    },
    {
      year: "2019",
      title: "Tezkor o'sish",
      desc: "Jamoamiz va foydalanuvchilarimiz kengaydi.",
    },
    {
      year: "2022",
      title: "Yangi platforma",
      desc: "ERP tizimining yangi versiyasi chiqdi.",
    },
    {
      year: "2026",
      title: "Bugungi kun",
      desc: "Platforma yetakchi yechimlardan biriga aylandi.",
    },
  ];

  return (
    <section className="py-16 bg-[#f9fafb]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h4 className="text-blue-600 font-bold text-sm tracking-widest uppercase mb-2">
          10 yillik safarimiz
        </h4>
        <h2 className="text-3xl font-bold text-gray-900 mb-12">
          Tarixiy bosqichlar
        </h2>

        <div className="space-y-6">
          {history.map((item) => (
            <div
              key={item.year}
              className="flex items-center justify-center gap-8"
            >
              {/* Yil tashqarida */}
              <div className="w-20 text-right font-bold text-blue-600 text-xl">
                {item.year}
              </div>

              {/* Karta */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm w-full max-w-lg text-left">
                <h4 className="font-semibold text-gray-900 mb-1">
                  {item.title}
                </h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
