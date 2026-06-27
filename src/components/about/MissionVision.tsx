export const MissionVision = () => {
  return (
    <section className="py-10">
      <div className="text-center mb-10">
        <h4 className="text-blue-600 font-bold text-sm tracking-widest uppercase mb-2">
          MAQSAD VA ORZU
        </h4>
        <h2 className="text-3xl font-bold text-gray-900">
          Missiya va vizyonimiz
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-[#dbeafe] rounded-full flex items-center justify-center mb-4"></div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Missiyamiz</h3>
          <p className="text-gray-600">
            O'zbek yoshlariga zamonaviy IT va dizayn sohalarida sifatli, amaliy
            va keng qamrovli ta'lim berish. Har bir bitiruvchi mehnat bozorida
            raqobatbardosh mutaxassis sifatida o'rin egallashi.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-[#dbeafe] rounded-full flex items-center justify-center mb-4"></div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Vizyonimiz</h3>
          <p className="text-gray-600">
            2030-yilga borib Markaziy Osiyodagi eng nufuzli IT ta'lim
            platformalaridan biriga aylanish. 50 000+ bitiruvchiga ega bo'lish
            va xalqaro miqyosda tan olinish.
          </p>
        </div>
      </div>
    </section>
  );
};
