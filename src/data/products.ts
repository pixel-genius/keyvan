export interface Product {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  imageUrl: string;
  category: string;
  description: string;
  specifications: {
    label: string;
    value: string;
  }[];
}









export const products: Product[] = [
  {
    id: "1",
    title: "سیگار وینستون کلاسیک الترا",
    subtitle: "لایت نقره‌ای کینگ",
    price: "۲۰۰,۰۰۰ تومان",
    imageUrl: "/img/image-cig.jpg",
    category: "تنباکو",
    description: "سیگار وینستون کلاسیک الترا با طعم منحصر به فرد و کیفیت برتر",
    specifications: [
      { label: "تعداد جعبه در پالت", value: "12" },
      { label: "تعداد نخ در جعبه", value: "20" },
      { label: "وزن هر پالت", value: "24 کیلوگرم" },
      { label: "ابعاد جعبه", value: "10×5×2 سانتی‌متر" }
    ]
  },
  {
    id: "2",
    title: "سیگار مارلبورو ردمیکس",
    subtitle: "منتال آبی",
    price: "۲۵۰,۰۰۰ تومان",
    imageUrl: "/img/image-cig.jpg",
    category: "سیگار",
    description: "سیگار مارلبورو ردمیکس با طعم منتال تازه و خنک",
    specifications: [
      { label: "تعداد جعبه در پالت", value: "12" },
      { label: "تعداد نخ در جعبه", value: "20" },
      { label: "وزن هر پالت", value: "24 کیلوگرم" },
      { label: "ابعاد جعبه", value: "10×5×2 سانتی‌متر" }
    ]
  },
  {
    id: "3",
    title: "سیگار کنت نان‌فیلتر",
    subtitle: "کلاسیک",
    price: "۱۸۰,۰۰۰ تومان",
    imageUrl: "/img/image-cig.jpg",
    category: "سیگار",
    description: "سیگار کنت نان‌فیلتر با طعم اصیل و قوی",
    specifications: [
      { label: "تعداد جعبه در پالت", value: "12" },
      { label: "تعداد نخ در جعبه", value: "20" },
      { label: "وزن هر پالت", value: "24 کیلوگرم" },
      { label: "ابعاد جعبه", value: "10×5×2 سانتی‌متر" }
    ]
  },
  {
    id: "4",
    title: "سیگار داویدوف کلاسیک",
    subtitle: "فیلتردار",
    price: "۲۲۰,۰۰۰ تومان",
    imageUrl: "/img/image-cig.jpg",
    category: "سیگار",
    description: "سیگار داویدوف با طعم اصیل و کیفیت برتر",
    specifications: [
      { label: "تعداد جعبه در پالت", value: "12" },
      { label: "تعداد نخ در جعبه", value: "20" },
      { label: "وزن هر پالت", value: "24 کیلوگرم" },
      { label: "ابعاد جعبه", value: "10×5×2 سانتی‌متر" }
    ]
  },
  {
    id: "5",
    title: "سیگار پارلیامنت",
    subtitle: "فیلتردار",
    price: "۲۳۰,۰۰۰ تومان",
    imageUrl: "/img/image-cig.jpg",
    category: "سیگار",
    description: "سیگار پارلیامنت با طعم منحصر به فرد",
    specifications: [
      { label: "تعداد جعبه در پالت", value: "12" },
      { label: "تعداد نخ در جعبه", value: "20" },
      { label: "وزن هر پالت", value: "24 کیلوگرم" },
      { label: "ابعاد جعبه", value: "10×5×2 سانتی‌متر" }
    ]
  },
  {
    id: "6",
    title: "سیگار دانهیل",
    subtitle: "فیلتردار",
    price: "۲۴۰,۰۰۰ تومان",
    imageUrl: "/img/image-cig.jpg",
    category: "سیگار",
    description: "سیگار دانهیل با طعم اصیل و کیفیت برتر",
    specifications: [
      { label: "تعداد جعبه در پالت", value: "12" },
      { label: "تعداد نخ در جعبه", value: "20" },
      { label: "وزن هر پالت", value: "24 کیلوگرم" },
      { label: "ابعاد جعبه", value: "10×5×2 سانتی‌متر" }
    ]
  },
  {
    id: "7",
    title: "سیگار لاکی استرایک",
    subtitle: "فیلتردار",
    price: "۲۱۰,۰۰۰ تومان",
    imageUrl: "/img/image-cig.jpg",
    category: "سیگار",
    description: "سیگار لاکی استرایک با طعم منحصر به فرد",
    specifications: [
      { label: "تعداد جعبه در پالت", value: "12" },
      { label: "تعداد نخ در جعبه", value: "20" },
      { label: "وزن هر پالت", value: "24 کیلوگرم" },
      { label: "ابعاد جعبه", value: "10×5×2 سانتی‌متر" }
    ]
  },
  {
    id: "8",
    title: "سیگار پال مال",
    subtitle: "فیلتردار",
    price: "۱۹۰,۰۰۰ تومان",
    imageUrl: "/img/image-cig.jpg",
    category: "تنباکو",
    description: "سیگار پال مال با طعم اصیل و کیفیت برتر",
    specifications: [
      { label: "تعداد جعبه در پالت", value: "12" },
      { label: "تعداد نخ در جعبه", value: "20" },
      { label: "وزن هر پالت", value: "24 کیلوگرم" },
      { label: "ابعاد جعبه", value: "10×5×2 سانتی‌متر" }
    ]
  }
]; 