
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import BlogCard from "../_components/BlogCard";

const TestPage = () => {

  const blogs = [
    {
      image: "/path/to/image1.jpg",
      title: "عنوان بلاگ ۱",
      description: "توضیح کوتاه درباره مطلب اول",
      date: "پنجشنبه ۲ اسفند ۱۴۰۳",
    },
    {
      image: "/path/to/image2.jpg",
      title: "عنوان بلاگ ۲",
      description: "توضیح کوتاه درباره مطلب دوم",
      date: "شنبه ۴ اسفند ۱۴۰۳",
    },
    {
      image: "/path/to/image3.jpg",
      title: "عنوان بلاگ ۳",
      description: "توضیح کوتاه درباره مطلب سوم",
      date: "دوشنبه ۶ اسفند ۱۴۰۳",
    },
  ];


  return (
    <Swiper spaceBetween={20} slidesPerView={1} breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}>
    {blogs.map((blog, index) => (
      <SwiperSlide key={index}>
        <BlogCard{...blog} />
      </SwiperSlide>
    ))}
  </Swiper>
  );
};

export default TestPage;
