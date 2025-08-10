
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";

const techImages = [
  "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg",
  "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg",
  "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
  "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
  "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",
  "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg",
  "https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original-wordmark.svg",
  "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg",
];

const TechnologySlider = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center text-primary mb-10">
        Technologies Should Learn
      </h2>

      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        spaceBetween={30}
        centeredSlides={true}
        breakpoints={{
          320: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 }
        }}
      >
        {techImages.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="p-6 bg-base-300 rounded-xl shadow-lg hover:shadow-xl hover:ring-2 ring-primary transform hover:scale-105 transition duration-500 flex items-center justify-center h-48">
              <img
                src={src}
                alt={`Technology ${index}`}
                className="h-20 object-contain hover:rotate-6 transition duration-500"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TechnologySlider;



