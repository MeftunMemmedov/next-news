// import { IoIosTrendingUp } from 'react-icons/io';
import { PiMegaphoneSimpleLight } from 'react-icons/pi';
import { convert } from 'html-to-text';
import Image from 'next/image';
import Link from 'next/link';

// import ArticleCard from '@/components/ArticleCard';
import { format } from 'date-fns';

import { Article } from '@/types';

interface Props {
  hot_article: Article;
  breaking_articles: Article[];
}

const Hero = ({ hot_article, breaking_articles }: Props) => {
  // const trending_articles=
  return (
    <section>
      <div
        style={{ backgroundImage: `url(${hot_article?.image})` }}
        className={`bg-no-repeat bg-center bg-cover bg-fixed relative`}
      >
        <div className="overlay bg-gradient-to-r py-24 from-black/50 to-black/50  w-full h-full">
          <div className="container flex gap-[5%]">
            <div className="lg:w-[65%] w-full flex flex-col 2xl:gap-28 gap-12">
              <div className="lg:max-w-[650px]">
                <span className="text-center bg-red-500 text-white px-3 py-2 rounded-sm text-sm font-semibold">
                  HOT NOW
                </span>

                <Link href={''}>
                  <h2
                    className="font-bold my-5 text-white hover:text-gray-300 transition"
                    style={{ fontSize: 'clamp(30px, 1.800rem + ((1vw - 3.2px) * 1.563), 50px)' }}
                  >
                    {hot_article?.title}
                  </h2>
                </Link>

                {hot_article?.text && (
                  <p className="text-gray-400">{`${convert(hot_article.text).slice(0, 200)}....`}</p>
                )}
              </div>

              {/* <div className="lg:max-w-[650px] hidden md:block">
                <div className="text-gray-300 text-md font-semibold flex gap-2 uppercase mb-5">
                  <IoIosTrendingUp size={20} />
                  <span>Trending Now</span>
                </div>
                <div className="grid lg:grid-cols-3 grid-cols-2 gap-6">
                  {Array.from({ length: 3 }, (_, index) => (
                    <ArticleCard
                      key={`trending-article-${index}`}
                      tagsVisible={false}
                      descriptionVisible={false}
                    />
                  ))}
                </div>
              </div> */}
            </div>
            <div className="w-[30%] lg:block hidden">
              <div className="text-gray-300 flex gap-2 uppercase">
                <PiMegaphoneSimpleLight className="-scale-x-100" size={24} />
                Breaking News
              </div>

              <div className="flex flex-col gap-5 pt-5">
                {breaking_articles?.slice(1, 5).map((article, index) => (
                  <Link
                    href={`/${article.category.id}/${article.id}`}
                    className="flex gap-5"
                    key={`hero-breaking-article-${index}`}
                  >
                    <div className="xl:w-1/3 w-2/5 overflow-hidden">
                      <Image
                        src={article.image}
                        width={300}
                        height={300}
                        className="w-full aspect-square hover:scale-120 transition duration-500 object-cover"
                        alt={article.title}
                      />
                    </div>
                    <div className="w-full">
                      <h3
                        className="font-semibold text-white 2xl:mb-2  hover:text-gray-300 transition"
                        style={{
                          fontSize: 'clamp(14px, 0.875rem + ((1vw - 3.2px) * 0.078), 10px)',
                        }}
                      >
                        {article.title}
                      </h3>
                      <strong className="font-normal text-gray-400 text-sm">
                        {format(article.created_at, 'd MMMM yyyy')}
                      </strong>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
