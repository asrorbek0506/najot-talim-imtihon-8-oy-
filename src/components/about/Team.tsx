export const Team = () => {
  const team = [
    { name: "Anvar Yo'ldoshev", role: "Bosh direktor", img: "/anvar.jpg" },
    {
      name: "Gulnora Rasulova",
      role: "O'quv qismi rahbari",
      img: "/gulnora.jpg",
    },
    { name: "Akmal Karimov", role: "JavaScript Lead", img: "/akmal.jpg" },
    { name: "Madina Ergasheva", role: "UX/UI dizayner", img: "/madina.jpg" },
    {
      name: "Sherzod Rahimov",
      role: "Python o'qituvchisi",
      img: "/sherzod.jpg",
    },
    { name: "Nodira Yusupova", role: "React Developer", img: "/nodira.jpg" },
    { name: "Sevara Tursunova", role: "Data Scientist", img: "/sevara.jpg" },
    { name: "Otabek Salimov", role: "Flutter Developer", img: "/otabek.jpg" },
    { name: "Diloraxon Nazarova", role: "Marketing", img: "/diloraxon.jpg" },
    { name: "Jasur Mahmudov", role: "DevOps muhandisi", img: "/jasur.jpg" },
    {
      name: "Kamola Yusupova",
      role: "Tahsil bo'yicha menejer",
      img: "/kamola.jpg",
    },
    { name: "Bekzod Salimov", role: "HR rahbari", img: "/bekzod.jpg" },
  ];

  return (
    <section className="py-16 bg-[#f9fafb]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h4 className="text-blue-600 font-bold text-sm tracking-widest uppercase mb-2">
          JAMOAMIZ
        </h4>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Bizning xodimlar
        </h2>
        <p className="text-gray-600 mb-12">
          Har bir kishi o'z sohasida tajriba va malakaga ega mutaxassis.
        </p>

        {/* 4 ta ustunli grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center"
            >
              <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-gray-200">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-gray-900">{member.name}</h3>
              <p className="text-gray-500 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
