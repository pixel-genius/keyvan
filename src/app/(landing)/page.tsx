"use client";
import Image from "next/image";

// Import Swiper React components
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css/pagination";
import "../../app/globals.css";
import "swiper/css";

// import required modules
import {
  IconCategory2,
  IconChartAreaLine,
  IconNews,
} from "@tabler/icons-react";

import { useGetShopProductsList } from "@/utils/apis/shop/products/GET/shopProductsListApi";
import { useGetBlogPostsList } from "@/utils/apis/blog/posts/GET/blogPostsListApi";
import Typography from "@/components/components/atoms/typography";
import CardItem from "../_components/CardItem";
import BlogCard from "../_components/BlogCard";
import ProductCard from "../_components/card";

const LandingPage = () => {
  const blogPostsQuery = useGetBlogPostsList();
  const shopProductsQuery = useGetShopProductsList();

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
        <CardItem
          image="/img/logo-cig.png"
          imageSize={64}
          label="برند ها"
          link="/products"
        />
        <CardItem
          icon={<IconCategory2 size={34} className="text-primary" />}
          label="دسته‌بندی‌ها"
          link="/category"
        />
        <CardItem
          icon={<IconNews size={34} className="text-primary" />}
          label=" اخبار دخانیات "
          link="/blog"
        />
        <CardItem
          icon={<IconChartAreaLine size={34} className="text-primary" />}
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
        {shopProductsQuery?.data?.length &&
          shopProductsQuery.data.map((product, index) => (
            <SwiperSlide key={index} style={{ maxHeight: "300px" }}>
              <ProductCard
                product={{ ...product, price: product.latest_price }}
              />
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
        {blogPostsQuery?.data?.length &&
          blogPostsQuery.data.map((blog, index) => (
            <SwiperSlide key={index}>
              <BlogCard {...blog} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default LandingPage;
