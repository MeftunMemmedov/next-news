import { convert } from 'html-to-text';
import Image from 'next/image';
import Link from 'next/link';

import { Article } from '@/types';

interface Props {
  tagsVisible: boolean;
  descriptionVisible: boolean;
  aspectRatio?: string;
  article: Article;
}

const ArticleCard = ({ tagsVisible, descriptionVisible, aspectRatio, article }: Props) => {
  return (
    <Link href={`/${article.category.id}/${article.id}`}>
      <div
        className={`${aspectRatio ? `aspect-[${aspectRatio}]` : 'aspect-[5/3]'} w-full overflow-hidden mb-5 relative`}
      >
        {tagsVisible && (
          <div className="absolute top-0 left-0 z-10 w-full h-full flex flex-col justify-end p-3 pointer-events-none">
            <div className="flex gap-2">
              <span className="text-center bg-black text-white px-3 py-2 xl:text-xs text-[10px] font-semibold uppercase">
                {article?.category?.title}
              </span>
              {/* <span className="text-center bg-black text-white px-3 py-2 xl:text-xs text-[10px] font-semibold uppercase">
                World
              </span> */}
            </div>
          </div>
        )}
        <Image
          src={article?.image}
          fill
          className="size-full object-cover hover:scale-120 transition duration-500"
          alt={article?.title}
        />
      </div>
      <h4 className="text-sm font-bold text-white hover:text-gray-300 transition mb-2">
        {article?.title}
      </h4>
      {descriptionVisible && (
        <p className="text-sm text-gray-300 truncate">
          {`${convert(article?.text).slice(0, 200)}....`}
        </p>
      )}
    </Link>
  );
};

export default ArticleCard;
