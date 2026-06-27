const PricingTable = () => {
  return (
    <div className="mt-16 bg-white p-8 rounded-2xl border border-slate-200">
      <h2 className="text-2xl font-bold mb-8 text-center">
        Darajalarni taqqoslash
      </h2>

      {/* Jadval sarlavha qismi */}
      <div className="grid grid-cols-4 gap-4 mb-4 pb-4 border-b border-slate-100 font-bold text-sm">
        <div>Xususiyatlar</div>
        <div>Boshlovchi</div>
        <div>Mashhur</div>
        <div>Kasbiy</div>
      </div>

      {/* Jadval qatori namunasi */}
      <div className="grid grid-cols-4 gap-4 py-3 text-sm text-slate-600">
        <div className="font-medium text-slate-900">Mentor</div>
        <div>—</div>
        <div>✓</div>
        <div>✓</div>
      </div>

      {/* Boshqa qatorlarni shu tarzda qo'shib ketaverasiz */}
    </div>
  );
};
export default PricingTable;
