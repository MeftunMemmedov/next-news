import { format } from 'date-fns';
import Link from 'next/link';

import ArticleCard from '@/components/ArticleCard';
import { Article } from '@/types';

interface Props {
  editorchoice_articles: Article[];
  featured_articles: Article[];
}

const EditorChoice = ({ editorchoice_articles, featured_articles }: Props) => {
  return (
    <section className="text-white py-14">
      <div className="container lg:flex gap-8">
        <div className="lg:flex-6">
          <h3 className="text-2xl font-bold mb-8">Editor Choice</h3>

          <div className="grid lg:grid-cols-3 grid-cols-2 gap-8">
            {editorchoice_articles?.map((article, index) => (
              <ArticleCard
                key={`editor-choice-article-${index}`}
                article={article}
                aspectRatio="5/4"
                tagsVisible={true}
                descriptionVisible={true}
              />
            ))}
          </div>
        </div>
        <div className="lg:flex-2 lg:mt-0 mt-8">
          <h3 className="text-2xl font-bold mb-8">Worth Reading</h3>
          <div className="grid grid-cols-1 gap-4">
            <ArticleCard
              article={featured_articles[0]}
              tagsVisible={false}
              descriptionVisible={true}
            />
            {featured_articles.slice(1, 4).map((article, index) => (
              <Link
                href={`/${article.category.id}/${article.id}`}
                className="border-b border-gray-600 py-5"
                key={`featured-article-${index}`}
              >
                <h3 className="text-sm font-bold mb-2">{article?.title}</h3>
                <span className="text-sm font-thin text-gray-300">
                  {format(article?.created_at, 'd MMMM yyyy')} / {article?.category?.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorChoice;
