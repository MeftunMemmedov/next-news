import { convert } from 'html-to-text';
import Image from 'next/image';
import Link from 'next/link';
import { MdArrowForwardIos } from 'react-icons/md';
import { Metadata } from 'next';

import { getDataDetails, getDataList } from '@/api/helpers';
import ChildCategories from '@/components/Pages/ArticleDetails/ChildCategories';
import SmallArticleCard from '@/components/SmallArticleCard';
import Hero from '@/sections/category/Hero';
import { Article, Category } from '@/types';

interface Props {
  params: Promise<{ categoryId: string }>;
}

export const generateStaticParams = async () => {
  const categories = await getDataList<Category>('news_categories');

  return categories.map(category => ({ categoryId: category.id }));
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { categoryId } = await params;
  const category = await getDataDetails<Category>('news_categories', { id: `eq.${categoryId}` });

  return {
    title: `News | ${category.title}`,
  };
};

const page = async ({ params }: Props) => {
  const { categoryId } = await params;

  const category = await getDataDetails<Category>('news_categories', {
    id: `eq.${categoryId}`,
    select: '*,parent(*)',
  });

  const articlesByCategory = await getDataList<Article>('news_articles', {
    select: '*,category(*, parent(*))',
    category: `eq.${categoryId}`,
  });

  const editorChoiceArticles = articlesByCategory.filter(
    article => article.is_editorchoice === true,
  );

  const normalArticles = articlesByCategory.filter(
    article =>
      article.is_breaking === false &&
      article.is_editorchoice === false &&
      article.is_featured === false,
  );

  const categoryName = category.title;

  if (!articlesByCategory) return <div>Some error occurend</div>;

  return (
    <main>
      <section className="bg-black">
        <div className="py-14 container">
          <div className="flex xl:flex-row flex-col xl:items-end gap-3 mb-8">
            <h1 className="text-white font-bold text-4xl">{categoryName}</h1>
            <ChildCategories categoryName={categoryName} />
          </div>
          <div className="text-gray-300 flex items-center gap-2 uppercase text-[11px] font-semibold">
            <Link href="/">Home</Link>
            {category.parent && (
              <>
                <MdArrowForwardIos size={9} />
                <Link href={`/${category.parent.id}`} className="">
                  {category.parent.title}
                </Link>
              </>
            )}
            <MdArrowForwardIos size={9} />
            <span>{categoryName}</span>
          </div>
        </div>
      </section>

      {editorChoiceArticles.length === 0 &&
        normalArticles.length === 0 &&
        articlesByCategory.length === 0 && (
          <div className="bg-stone-950 text-white py-20">
            <p className="text-4xl text-center">No article found</p>
          </div>
        )}

      <section className="bg-stone-950">
        <Hero articlesByCategory={articlesByCategory} />
      </section>

      <section className="bg-stone-950">
        <div className="flex lg:flex-row flex-col gap-10 container">
          <div className="lg:w-3/4">
            {editorChoiceArticles.length ? (
              <div className="grid gap-6 lg:grid-cols-2 grid-cols-1 py-10">
                {editorChoiceArticles.map((article, index) => (
                  <Link
                    href={`/${article.category.id}/${article.id}`}
                    className="flex flex-col bg-stone-900"
                    key={`featured-article-${article.category.id}-${index}`}
                  >
                    <div className="p-6 md:min-h-42">
                      <span className="uppercase text-xs text-gray-400 mb-3 inline-block font-semibold">
                        {article.category.title}
                      </span>
                      <h2 className="text-white font-bold lg:text-xl md:text-lg text-sm">
                        {article.title}
                      </h2>
                    </div>
                    <div className="aspect-square relative">
                      <Image src={article.image} fill className="object-cover" alt="" />
                    </div>
                    <div className="px-6 pt-6">
                      <p className="text-gray-400 leading-relaxed overflow-hidden">
                        {convert(article.text).slice(0, 200)}…
                      </p>
                    </div>
                    <div className="px-6 pt-3 pb-6 text-gray-400">
                      <div className="font-semibold text-sm">BY Author / Nov 14, 2023</div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          {normalArticles.length > 0 ? (
            <div className="lg:w-1/3 lg:sticky lg:top-0 lg:self-start">
              <div className="flex flex-col gap-5 pt-9">
                <h2 className="text-lg font-bold text-white">Popular Posts</h2>
                {normalArticles.map((article, index) => (
                  <SmallArticleCard article={article} key={`hero-breaking-article-${index}`} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
};

export default page;
