'use client';
import { useActionState, useState } from 'react';

import { sendNewComment } from '@/app/[categoryId]/[articleId]/actions';

interface Props {
  articleId: string;
}
const initialState = { error: null, success: false };

const CommentForm = ({ articleId }: Props) => {
  const [state, formAction, isPending] = useActionState(sendNewComment, initialState);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
  });
  return (
    <div>
      <h3 className="font-bold text-white mb-3">Leave a reply</h3>
      <p className="text-sm">
        Your email address will not be published. Required fields are marked *
      </p>
      {state.error && <p className="text-red-500">{state.error}</p>}
      {state.success && <p className="text-green-500">Comment posted!</p>}
      <form action={formAction} className="grid grid-cols-3 gap-10 mt-8">
        <div className="lg:col-span-1 col-span-3">
          <input type="hidden" name="articleId" value={articleId} />
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            disabled={isPending}
            className="border border-neutral-800 h-9 w-full px-4"
          />
        </div>
        <div className="lg:col-span-1 col-span-3">
          <input
            type="text"
            name="last_name"
            placeholder="Last name"
            disabled={isPending}
            className="border border-neutral-800 h-9 w-full px-4"
          />
        </div>
        <div className="lg:col-span-1 col-span-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            disabled={isPending}
            className="border border-neutral-800 h-9 w-full px-4"
          />
        </div>

        <div className="col-span-3">
          <textarea
            name="comment"
            placeholder="Your comment here"
            disabled={isPending}
            className="border border-neutral-800 resize-none h-50 w-full p-4"
          ></textarea>
        </div>
        <div className="col-span-3">
          <button
            disabled={isPending}
            className="px-10 py-3 bg-neutral-400 rounded-md text-black font-bold hover:text-white hover:bg-black transition"
          >
            Post Comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
