export const Achievements = () => {
  const achievements = [
    {
      title: '"Eng yaxshi IT maktab"',
      desc: "2023-yil O'zbekiston IT mukofoti",
    },
    { title: "ISO 9001 sertifikati", desc: "Xalqaro sifat standarti" },
    { title: "100+ hamkor kompaniya", desc: "Ish bilan ta'minlash bo'yicha" },
    { title: "94% bitirish darajasi", desc: "Yuqori talaba motivatsiyasi" },
  ];

  return (
    <section className="py-16 bg-[#f9fafb]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h4 className="text-blue-600 font-bold text-sm tracking-widest uppercase mb-2">
          YUTUQLAR
        </h4>
        <h2 className="text-3xl font-bold text-gray-900 mb-12">
          Faxrimiz bo'lgan yutuqlar
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm"
            >
              <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
