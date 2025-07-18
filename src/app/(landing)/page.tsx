"use client";
import Image from "next/image";

// Import Swiper React components
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "../../app/globals.css";

// import required modules
import {
  IconCategory2,
  IconChartAreaLine,
  IconNews,
} from "@tabler/icons-react";

import Typography from "@/components/components/atoms/typography";
import BlogCard from "../_components/BlogCard";
import CardItem from "../_components/CardItem";
import ProductCard from "../_components/card";

const LandingPage = () => {
  const blogs = [
    {
      image: "/img/blog.webp",
      title: "عنوان بلاگ ۱",
      description: "توضیح کوتاه درباره مطلب اول",
      date: "پنجشنبه ۲ اسفند ۱۴۰۳",
    },
    {
      image: "/img/blog.webp",
      title: "عنوان بلاگ ۱",
      description:
        "به گزارش مدیریت ارتباطات و امور بین‌الملل شرکت دخانیات ایران، فرداد امیراسکندری؛ مدیرعامل شرکت دخانیات در پیامی ضمن تبریک فرارسیدن سال 1404 هجری شمسی، تأکید کرد: با اتحاد، همدلی، گذشت و فداکاری و تدبیر تمامی همکاران گرامی خود بار دیگر شرکت دخانیات ایران، شأن و جایگاه واقعی خود را باز می‌یابد . ",
      date: "پنجشنبه ۲ اسفند ۱۴۰۳",
    },
    {
      image: "/img/blog.webp",
      title: "عنوان بلاگ ۱",
      description: "توضیح کوتاه درباره مطلب اول",
      date: "پنجشنبه ۲ اسفند ۱۴۰۳",
    },
  ];

  const products = [
    {
      image: "/img/image-cig.jpg",
      name: "سیگار وینستون کلاسیک الترا لایت نقره ای کینگ",
      category: "سیگار",
      price: "200000",
    },
    {
      image: "/img/image-cig.jpg",
      name: "سیگار وینستون کلاسیک الترا لایت نقره ای کینگ",
      category: "سیگار",
      price: "200000",
    },
    {
      image: "/img/image-cig.jpg",
      name: "سیگار وینستون کلاسیک الترا لایت نقره ای کینگ",
      category: "سیگار",
      price: "200000",
    },
    {
      image: "/img/image-cig.jpg",
      name: "سیگار وینستون کلاسیک الترا لایت نقره ای کینگ",
      category: "سیگار",
      price: "200000",
    },
    {
      image: "/img/image-cig.jpg",
      name: "سیگار وینستون کلاسیک الترا لایت نقره ای کینگ",
      category: "سیگار",
      price: "200000",
    },
  ];

  return (
    <div className="px-4 pt-28">
      <div className="flex flex-col items-center justify-center ">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <Image
              src={"/img/Banner.jpg"}
              alt="sigar"
              width={1000}
              height={500}
              className="rounded-4xl "
            />
          </SwiperSlide>

          {/* Custom Pagination */}
          <div className="swiper-pagination !bottom-2"></div>
        </Swiper>
      </div>

      <div className="flex justify-center gap-8 pt-4 items-center">
        <CardItem icon="/img/logo-cig.png" label="برند ها" link="/products" />
        <CardItem
          icon={<IconCategory2 size={24} className="text-primary" />}
          label="دسته‌بندی‌ها"
          link="/category"
        />
        <CardItem
          icon={<IconNews size={24} className="text-primary" />}
          label="اخبار داخلیات"
        />
        <CardItem
          icon={<IconChartAreaLine size={24} className="text-primary" />}
          label="قیمت روز"
          link="/price"
        />
      </div>

      <div className="flex justify-between items-center gap-8 pt-8  pb-4">
        <div className="flex flex-col items-center">
          <Typography variant="label/xs" weight="normal">
            مشاهده
          </Typography>
        </div>

        <div className="flex flex-col items-center">
          <Typography variant="label/md" weight="normal">
            جدیدترین محصولات
          </Typography>
        </div>
      </div>
      <Swiper
        modules={[Autoplay]}
        className="mySwiper"
        dir="rtl"
        spaceBetween={30}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          300: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        }}
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex justify-between items-center gap-8 pt-8  pb-4">
        <div className="flex flex-col items-center">
          <Typography variant="label/xs" weight="normal">
            مشاهده
          </Typography>
        </div>

        <div className="flex flex-col items-center">
          <Typography variant="label/md" weight="normal">
            خبرهای دخانیات
          </Typography>
        </div>
      </div>

      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        dir="rtl"
        slidesPerView={1}
        spaceBetween={10}
        className="mySwiper"
      >
        {blogs.map((blog, index) => (
          <SwiperSlide key={index}>
            <BlogCard {...blog} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LandingPage;
