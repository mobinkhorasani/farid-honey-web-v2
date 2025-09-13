export default function HomePage() {
  return (
    <div className="container py-16">
      {/* Hero Section Placeholder */}
      <section className="text-center py-20">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          عسل فرید
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          بهترین عسل طبیعی و خالص ایرانی را از ما بخواهید
        </p>
      </section>

      {/* Content Placeholders */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-16">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-brand/10">
          <h3 className="text-xl font-bold text-gray-900 mb-4">محصولات</h3>
          <p className="text-gray-600">
            انواع عسل طبیعی و محصولات مرتبط را در این بخش خواهید یافت.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm border border-brand/10">
          <h3 className="text-xl font-bold text-gray-900 mb-4">درباره ما</h3>
          <p className="text-gray-600">
            داستان ما و نحوه تولید عسل‌های با کیفیت را بشناسید.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm border border-brand/10">
          <h3 className="text-xl font-bold text-gray-900 mb-4">تماس با ما</h3>
          <p className="text-gray-600">
            برای سفارش و دریافت مشاوره با ما در تماس باشید.
          </p>
        </div>
      </div>
    </div>
  )
}