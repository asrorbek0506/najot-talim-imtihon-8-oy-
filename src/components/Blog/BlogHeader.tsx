export const BlogHeader = () => {
  return (
    // Orqa fon rangi #f1f5ff qilib belgilandi
    <div className="bg-[#f1f5ff] py-12 text-center">
      {/* Sahifa yo'li (Breadcrumb) */}
      <div className="flex justify-center items-center gap-2 text-sm text-gray-500 mb-4">
        <a href="">Bosh sahifa</a>
        <span>&gt;</span>
        <span className="text-gray-900 font-medium">Blog</span>
      </div>

      {/* Asosiy sarlavha */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Foydali maqolalar va yangiliklar
      </h1>
      <p className="text-gray-600">
        IT, dasturlash, dizayn va karyera bo'yicha eng dolzarb materiallar.
      </p>
    </div>
  );
};
