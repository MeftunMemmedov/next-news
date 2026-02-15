import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

import { Article } from '@/types';
import ArticleCard from '@/components/ArticleCard';

interface Props {
  breaking_articles: Article[];
}

const BreakingNews = ({ breaking_articles }: Props) => {
  const top_breaking_article: Article = breaking_articles?.[0];
  return (
    <section className="text-white">
      <div className="container lg:flex gap-8 pt-14">
        <div className="lg:flex-1">
          <h3 className="text-2xl font-bold mb-8">Breaking News</h3>
          <Link
            href={`/${top_breaking_article.category.id}/${top_breaking_article.id}`}
            className="lg:h-[650px] h-[630px] relative block"
          >
            <div className="absolute top-0 left-0 z-10 w-full h-full p-12 flex flex-col justify-between items-start">
              <span className="text-center bg-orange-500 text-white px-3 py-2 rounded-xs text-xs font-semibold uppercase">
                Breaking
              </span>

              <div className="flex flex-col items-start justify-between gap-2">
                <span className="text-center bg-black text-white px-3 py-2  text-xs font-semibold uppercase">
                  {top_breaking_article?.category?.title}
                </span>

                <h2 className="text-3xl/relaxed font-bold">{top_breaking_article?.title}</h2>

                <span className="font-thin text-gray-300">
                  {format(top_breaking_article?.created_at, 'd MMMM yyyy')}
                </span>
              </div>
            </div>
            <Image
              src={top_breaking_article?.image}
              objectFit="cover"
              fill
              alt={top_breaking_article?.title}
            />
          </Link>
        </div>
        <div className="lg:flex-1 lg:mt-0 mt-14">
          <h3 className="text-2xl font-bold mb-8">Popular Now</h3>

          <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
            {breaking_articles?.slice(5, 9).map((article, index) => (
              <ArticleCard
                key={`breaking-article-${index}`}
                tagsVisible={true}
                descriptionVisible={true}
                article={article}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BreakingNews;
