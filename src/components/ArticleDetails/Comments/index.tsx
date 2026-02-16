import { getDataList } from '@/api/helpers';
import { Comment } from '@/types';

const Comments = async ({ articleId }: { articleId: string }) => {
  const comments = await getDataList<Comment>('news_comments', {
    articleId: `eq.${articleId}`,
    select: '*',
  });
  if (!comments) return null;
  return (
    <div className="mt-10">
      <h3 className="text-2xl font-semibold mb-5">Comments ({comments.length})</h3>
      {comments.length === 0 ? <p>No comments yet</p> : null}
      <ul>
        {comments.map((comment, index) => (
          <li
            className="flex gap-8 mb-10"
            key={`comment-article${articleId}-${comment.id}-${index}`}
          >
            <div className="w-1/5">
              <div className="font-semibold w-full">
                {comment.first_name} {comment.last_name}
              </div>
              <div className="text-sm text-gray-500 w-full">{comment.email}</div>
            </div>
            <div className="border rounded-xl p-5 w-4/5">
              <p>{comment.comment}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
