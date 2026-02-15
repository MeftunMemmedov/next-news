import Image from 'next/image';

import ArticleCard from '@/components/ArticleCard';
import { createFakeImage } from '@/helpers/image';
import { Article } from '@/types';

const NewsByCategory = ({ featured_articles }: { featured_articles: Article[] }) => {
  const categories = ['Science', 'Politics', 'Culture & Arts'];

  const getNewsByCategoryTitle = (title: string): Article[] => {
    return featured_articles.slice(5, 10).filter(article => article.category.title === title);
  };
  return (
    <section className="text-white py-14">
      <div className="container">
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-6">
          {categories.map((categoryTitle, index) => {
            const articles = getNewsByCategoryTitle(categoryTitle);
            return (
              <div key={index}>
                <h3 className="text-2xl font-bold">{categoryTitle}</h3>
                <ArticleCard
                  article={articles[0]}
                  aspectRatio="5/4"
                  tagsVisible
                  descriptionVisible
                />

                <div className="flex flex-col gap-5 pt-5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div
                      className="flex gap-5 border-t border-gray-500 pt-5"
                      key={`article-by-category-${index}`}
                    >
                      <div className="xl:w-1/3 w-2/5 overflow-hidden">
                        <Image
                          src={createFakeImage(300, 300)}
                          width={300}
                          height={300}
                          className="w-full aspect-[5/4] object-cover hover:scale-120 transition duration-500"
                          alt=""
                        />
                      </div>
                      <div className="w-full flex flex-col justify-center item">
                        <p className="font-normal text-gray-400 text-sm mb-2">Nov 17, 2023</p>

                        <h3
                          className="font-semibold text-white hover:text-gray-300 transition"
                          style={{
                            fontSize: 'clamp(14px, 0.875rem + ((1vw - 3.2px) * 0.078), 10px)',
                          }}
                        >
                          Augue Neque Gravida Fermentum Sollicitudin
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NewsByCategory;
