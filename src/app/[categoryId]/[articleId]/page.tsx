import Link from 'next/link';
import { MdArrowForwardIos } from 'react-icons/md';
import { format } from 'date-fns';
import { Metadata } from 'next';

import SmallArticleCard from '@/components/SmallArticleCard';
import ShareButtons from '@/components/ArticleDetails/ShareButons';
import RelatedArticleSlider from '@/components/ArticleDetails/RelatedArticleSlider';
import { getDataDetails, getDataList } from '@/api/helpers';
import { Article } from '@/types';
import CommentForm from '@/components/ArticleDetails/CommentForm';
import Comments from '@/components/ArticleDetails/Comments';

import { increaseViewCount } from './actions';

interface Props {
  params: Promise<{ articleId: string }>;
}

export const generateStaticParams = async () => {
  const articles = await getDataList<Article>('news_articles');

  return articles.map(article => ({ categoryId: article.id }));
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { articleId } = await params;
  const article = await getDataDetails<Article>('news_articles', {
    id: `eq.${articleId}`,
    select: '*,category(*, parent(*))',
  });

  return {
    title: `News | ${article.category.title} | ${article.title}`,
  };
};

const page = async ({ params }: Props) => {
  const { articleId } = await params;

  const article = await getDataDetails<Article>('news_articles', {
    id: `eq.${articleId}`,
    select: '*,category(*, parent(*))',
  });

  const relatedArticles = await getDataList<Article>('news_articles', {
    category: `eq.${article.category.id}`,
    id: `neq.${article.id}`,
    select: '*,category(*, parent(*))',
    limit: 8,
  });

  const popularArticles = await getDataList<Article>('news_articles', {
    id: `neq.${article.id}`,
    select: '*,category(*)',
    limit: 4,
  });

  if (articleId) await increaseViewCount(articleId);

  return (
    <main className="bg-stone-950">
      <section>
        <div
          style={{ backgroundImage: `url(${article.image})` }}
          className="bg-no-repeat bg-center bg-cover bg-fixed relative md:aspect-[5/1.8] aspect-square"
        >
          <div className="absolute top-0 left-0 size-full text-white bg-black/50 flex justify-center items-center flex-col">
            <div className="mb-10">
              BY Author / {format(article.created_at, 'd MMMM yyyy')} / {article.category.title}
            </div>
            <h1
              className="font-bold lg:w-1/2 md:w-3/4 w-11/12 text-center"
              style={{ fontSize: 'clamp(30px, 1.800rem + ((1vw - 3.2px) * 1.563), 50px)' }}
            >
              {article.title}
            </h1>
          </div>
        </div>
        <div className="border-b border-neutral-800">
          <div className="container py-5 ">
            <div className="flex">
              <div className="text-gray-300 flex items-center gap-2 uppercase text-xs font-semibold">
                <Link href="/">Home</Link>
                {article.category.parent && (
                  <>
                    <MdArrowForwardIos size={9} />
                    <span>{article.category.parent.title}</span>
                  </>
                )}
                <MdArrowForwardIos size={9} />
                <span>{article.category.title}</span>
                <MdArrowForwardIos size={9} />
                <span>{article.title}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container flex lg:flex-row flex-col gap-10 py-20">
          <div className="lg:w-3/4 text-gray-300">
            <div dangerouslySetInnerHTML={{ __html: article.text }} className="article-text" />

            <ShareButtons />
            <hr className="text-neutral-900 my-10" />

            <RelatedArticleSlider relatedArticles={relatedArticles} />
            <hr className="text-neutral-900 my-10" />

            <CommentForm articleId={article.id} />
            <Comments articleId={article.id} />
          </div>

          <div className="lg:w-1/3 lg:block hidden">
            <div className="flex flex-col gap-5 pt-9">
              <h2 className="text-lg font-bold text-white">Popular Posts</h2>
              {popularArticles.map((article, index) => (
                <SmallArticleCard article={article} key={`hero-breaking-article-${index}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section></section>
    </main>
  );
};

export default page;
