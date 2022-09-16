import React from 'react';
import { Navigation, Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Image } from '../../services/types/response/image';

interface CarouselProps {
	images?: Image[]
}

const Carousel = ({ images }: CarouselProps) => {

	if (!images || images.length < 1) {
		return <h1>placeholder image</h1>;
	}

	return (
		<Swiper
			modules={[Navigation, Pagination, A11y]}
			navigation
			pagination={{ clickable: true }}
			loop={true}
		>
			{images.map((img) => (
				<SwiperSlide key={img.uri}>
					<img src={img.uri} alt='' />
				</SwiperSlide>
			))}
		</Swiper>
	);
}

export default Carousel;