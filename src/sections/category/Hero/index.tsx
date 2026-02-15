import { Article } from '@/types';
import SmallArticleCard from '@/components/SmallArticleCard';

import HeroSlider from './components/HeroSlider';

interface Props {
  articlesByCategory: Article[];
}

const Hero = ({ articlesByCategory }: Props) => {
  const featuredArticles = articlesByCategory?.filter(article => article.is_featured === true);

  if (!featuredArticles || featuredArticles.length === 0) return null;
  return (
    <div className="container flex lg:justify-between lg:flex-row gap-5 flex-col">
      <div className="lg:w-3/5 w-full">
        <HeroSlider articlesByCategory={articlesByCategory} />
      </div>
      <div className="lg:w-2/5 w-full">
        <div className="flex flex-col gap-5">
          {featuredArticles.slice(0, 5).map((article, index) => (
            <SmallArticleCard article={article} key={`hero-breaking-article-${index}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
