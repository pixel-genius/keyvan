export default function ContactUs() {
  return (
    <div
      className="m bg-gradient-to-b from-[#193E6E] to-[#1B2545]  text-zinc-100 flex flex-col items-center justify-start h-screen px-6 py-12"
      dir="rtl"
    >
      <h1 className="text-2xl font-semibold mb-6 border-b border-zinc-600 pb-2">
        تماس با ما
      </h1>
      <p className="max-w-md text-center text-zinc-300 mb-10 leading-relaxed">
        ما همیشه از شنیدن صدای شما خوشحال می‌شویم! اگر پرسشی دارید، نیاز به
        پشتیبانی دارید یا می‌خواهید پیشنهادی برای بهبود خدمات ما بدهید، از طریق
        یکی از روش‌های زیر با ما در ارتباط باشید:
      </p>
      <div className="space-y-3 text-center text-sm">
        <p> تلفن: ۰۲۱‑۵۵۵۵۵۵۵۵</p>
        <p> ایمیل: info@system.ir</p>
        <p>آدرس: تهران، خیابان آزادی، شماره ۲۲۱، دبیرخانه پیشنهادها</p>
      </div>
    </div>
  );
}
