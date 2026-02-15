'use client';
import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';

import ArticleCard from '@/components/ArticleCard';
import { Article } from '@/types';

interface Props {
  relatedArticles: Article[];
}

const RelatedArticleSlider = ({ relatedArticles }: Props) => {
  const swiperProps: SwiperProps = {
    breakpoints: {
      1024: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
      },
    },
    spaceBetween: 30,
    freeMode: true,
    modules: [FreeMode],
  };
  if (!relatedArticles || relatedArticles.length === 0) return null;
  return (
    <div>
      <h3 className="font-bold text-2xl mb-5 text-white">Related Posts</h3>
      <Swiper {...swiperProps} className="relatedArticleSwiper">
        {relatedArticles.map((article, index) => (
          <SwiperSlide key={`related-${article.category.title}-${index}`}>
            <ArticleCard article={article} tagsVisible={false} descriptionVisible={false} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RelatedArticleSlider;
