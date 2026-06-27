export const AboutHero = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center gap-12 py-10">
      {/* Matn qismi */}
      <div className="flex-1 space-y-6">
        <span className="text-blue-600 font-semibold border border-gray-200 rounded-2xl p-1 bg-[#dbeafe] shadow-sm text-sm tracking-wide uppercase">
          Bizning hikoyamiz
        </span>
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
          Bizning hikoyamiz
        </h1>
        <p className="text-gray-600 leading-relaxed">
          Sizning loyihangiz haqidagi asosiy ma'lumotlar shu yerda bo'ladi. Bu
          qism foydalanuvchini platforma maqsadi va tarixi bilan tanishishga
          undaydi. Matnni dizayniga moslab o'zgartirishingiz mumkin.
        </p>
      </div>

      {/* Rasm qismi */}
      <div className="flex-1 w-full">
        <div className="aspect-video bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
          {/* Bu yerga o'z rasmingizni yuklang */}
          <img
            src="/path-to-your-image.jpg"
            alt="Bizning hikoyamiz"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};
