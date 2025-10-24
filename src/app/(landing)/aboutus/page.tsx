export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#193E6E] to-[#1B2545] text-zinc-100 px-6 py-12 flex flex-col items-center">
      <h1 className="text-2xl font-semibold mb-6 border-b border-zinc-600 pb-2">
        درباره ما
      </h1>
      <div className="max-w-2xl text-zinc-300 leading-relaxed text-justify space-y-4">
        <p>
          سامانه پیشنهادها با هدف به‌کارگیری اندیشه‌های کارکنان در بهبود
          فرآیندها، افزایش بهره‌وری و ارتقای کیفیت خدمات راه‌اندازی شده است.
        </p>
        <p>
          ما اعتقاد داریم که بهترین ایده‌ها از دل تجربه و مشاهده می‌آیند، و
          مأموریت ما ایجاد بستر ثبت، بررسی و اجرای مؤثر این ایده‌ها در سازمان
          است.
        </p>
      </div>
    </div>
  );
}
