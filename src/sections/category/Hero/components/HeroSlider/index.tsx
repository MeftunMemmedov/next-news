'use client';

import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';

import { Article } from '@/types';

interface Props {
  articlesByCategory: Article[];
}

const HeroSlider = ({ articlesByCategory }: Props) => {
  const swiperProps: SwiperProps = {
    pagination: {
      clickable: true,
    },
    autoplay: {
      delay: 4000,
    },
    modules: [Pagination, Autoplay],
  };

  const breakingArticles = articlesByCategory?.filter(article => article.is_breaking === true);

  return (
    <div>
      <Swiper {...swiperProps} className="categoryHeroSwiper w-full">
        {breakingArticles.map((article, index) => (
          <SwiperSlide key={`category-breaking-article-${article.id}-${index}`}>
            <div className="relative lg:aspect-[5/4] aspect-square">
              <div className="absolute top-0 left-0 z-10 w-full h-full lg:p-12 p-5 flex flex-col justify-between items-start bg-gradient-to-b from-transparent to-black/90">
                <span className="text-center bg-orange-500 text-white px-3 py-2 rounded-xs text-xs font-semibold uppercase">
                  Breaking
                </span>

                <div className="flex flex-col items-start justify-between gap-2">
                  <span className="text-center bg-black text-white px-3 py-2  text-xs font-semibold uppercase">
                    {article.category.title}
                  </span>

                  <Link
                    href={`/${article.category.id}/${article.id}`}
                    className="lg:text-3xl/relaxed md:text-2xl/relaxed text-/relaxed text-white font-bold hover:scale-110 hover:ml-10 transition-all"
                  >
                    {article.title}
                  </Link>

                  <span className="font-thin text-gray-300">
                    {format(article.created_at, 'd MMMM yyyy')}
                  </span>
                </div>
              </div>
              <Image src={article.image} fill className="object-cover" alt={article.title} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
