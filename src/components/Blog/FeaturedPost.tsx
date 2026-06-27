export const FeaturedPost = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/2 h-80 bg-gray-200 rounded-xl"></div>
      <div className="md:w-1/2">
        <h2 className="text-3xl font-bold">
          2026-yilda dasturchilik karyerasi
        </h2>
        <p className="text-gray-600 mt-4">
          Sohaga endi kirib kelayotganlar uchun qo'llanma.
        </p>
      </div>
    </div>
  );
};
