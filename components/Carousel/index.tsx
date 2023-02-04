import React from 'react';
import { Navigation, Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from '../Image';
import { Image as ImageType } from '../../types/discogs/response/image';

interface CarouselProps {
  images?: ImageType[];
}

const Carousel = ({ images }: CarouselProps) => {
  if (!images || images.length < 1) {
    return <h1>placeholder image</h1>;
  }

  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      navigation={true}
      pagination={{ clickable: true }}
      loop={true}
    >
      {images.map((img) => (
        <SwiperSlide key={img.uri}>
          <Image src={img.uri} alt="" unoptimized loading="lazy" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
