'use server';

import { sendNewData } from '@/api/helpers';

// export async function sendNewComment(prevState: any, formData: FormData) {
//   const data = {
//     id: formData.get('articleId'),
//     first_name: formData.get('first_name'),
//     last_name: formData.get('last_name'),
//     email: formData.get('email'),
//     comment: formData.get('comment'),
//   };

//   await sendNewData('news_comments', data);

//   return {
//     success: true,
//     error: null,
//   };
// }

export async function increaseViewCount(articleId: string) {
  await sendNewData('rpc/increment_view_count', { article_id: articleId });
}
