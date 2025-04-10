export interface Category {
  id: string;
  name: string;
  imageUrl: string;
}

export const categories: Category[] = [
  {
    id: "1",
    name: "تنباکو",
    imageUrl: "/img/tobacco.jpg",
  },
  {
    id: "2",
    name: "ذغال",
    imageUrl: "/img/coal.jpg",
  },
  {
    id: "3",
    name: "سیگار",
    imageUrl: "/img/image-cig.jpg",
  },
  {
    id: "4",
    name: "تجهیزات قلیان",
    imageUrl: "/img/hookah.jpg",
  }
]; 