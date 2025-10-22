export const ProductSkeleton = () => (
  <div className="group relative rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm animate-pulse">
    <div className="relative bg-gray-200">
      <div className="relative aspect-[4/3] sm:aspect-[5/4] overflow-hidden">
        <div className="w-full h-full bg-gray-300" />
      </div>
    </div>
    <div className="p-3.5 sm:p-5">
      <div className="h-4 sm:h-6 bg-gray-300 rounded mb-2" />
      <div className="h-3 sm:h-4 bg-gray-200 rounded mb-3 w-3/4" />
      <div className="flex flex-col gap-2 md:flex-row md:items-center justify-between">
        <div className="h-4 sm:h-5 bg-gray-300 rounded w-24" />
        <div className="h-8 sm:h-10 bg-gray-300 rounded-full w-full md:w-20 sm:w-24" />
      </div>
    </div>
  </div>
);
