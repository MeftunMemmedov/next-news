'use server';

import { revalidatePath } from 'next/cache';

import { sendNewData } from '@/api/helpers';

export async function sendNewComment(
  prevState: { success: boolean; error: null | Record<string, string> },
  formData: FormData,
) {
  const articleId = formData.get('articleId');
  const data = {
    articleId,
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    email: formData.get('email'),
    comment: formData.get('comment'),
  };

  await sendNewData('news_comments', data);
  revalidatePath(`/news/${articleId}`);
  return {
    success: true,
    error: null,
  };
}

export async function increaseViewCount(articleId: string) {
  await sendNewData('rpc/increment_view_count', { article_id: articleId });
}
