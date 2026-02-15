import { getDataDetails, getDataList } from '@/api/helpers';
import BreakingNews from '@/sections/home/BreakingNews';
import EditorChoice from '@/sections/home/EditorChoice';
import Hero from '@/sections/home/Hero';
import { Article } from '@/types';

const page = async () => {
  // const articles = await getDataList<Article>('news_articles', {
  //   select: '*,category(*, parent(*))',
  // });
  const hot_article = await getDataDetails<Article>('news_articles', {
    select: '*,category(*, parent(*))',
    is_hot: 'eq.true',
  });

  const breaking_articles = await getDataList<Article>('news_articles', {
    is_breaking: 'eq.true',
    is_hot: 'eq.false',
    select: '*,category(*, parent(*))',
  });

  const featured_articles = await getDataList<Article>('news_articles', {
    is_featured: 'eq.true',
    is_hot: 'eq.false',
    select: '*,category(*, parent(*))',
  });

  const editorchoice_articles = await getDataList<Article>('news_articles', {
    is_editorchoice: 'eq.true',
    is_hot: 'eq.false',
    select: '*,category(*, parent(*))',
  });

  return (
    <main className="bg-stone-950">
      <Hero hot_article={hot_article!} breaking_articles={breaking_articles} />
      <BreakingNews breaking_articles={breaking_articles} />
      <EditorChoice
        editorchoice_articles={editorchoice_articles}
        featured_articles={featured_articles}
      />
      {/* <NewsByCategory featured_articles={featured_articles}/> */}
    </main>
  );
};

export default page;
