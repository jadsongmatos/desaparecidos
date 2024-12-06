"use client";

import ImageWithFallback from "@/components/ImageWithFallback";
import Link from "next/link";

// Swiper components, modules and styles
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SwiperComponent = ({ selectedPeople }) => {
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={30}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation, Autoplay]}
      className="mySwiper py-5"
    >
      {selectedPeople.map((person) => (
        <SwiperSlide key={person.id}>
          <div style={{ position: "relative", width: "100%", height: "60vh" }}>
            <Link href="/desaparecidos/1">
              <ImageWithFallback
                src={person.main_photo}
                alt={`Photo of ${person.name}`}
                fill
                className="rounded-5"
                style={{ objectFit: "cover" }}
                loading="lazy"
              />
            </Link>
          </div>
          <div className="absolute bottom-0 left-0 text-dark w-100 text-center mt-3">
            <p>{person.name}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperComponent;
