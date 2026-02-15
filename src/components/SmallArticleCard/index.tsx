import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

import { Article } from '@/types';

interface Props {
  article: Article;
}

const SmallArticleCard = ({ article }: Props) => {
  return (
    <Link href={`/${article.category.id}/${article.id}`} className="flex gap-5">
      <div className="xl:w-1/3 w-2/5 overflow-hidden">
        <Image
          src={article.image}
          width={300}
          height={300}
          className="w-full aspect-square hover:scale-120 transition duration-500 object-center object-cover"
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
  );
};

export default SmallArticleCard;
