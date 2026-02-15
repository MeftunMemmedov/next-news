import { Category } from '../category';

export type Article = {
  id: string;
  title: string;
  slug: string;
  text: string;
  category: Category;
  view_count: number;
  image: string;
  video_url: string;
  created_at: string;
  is_featured: boolean;
  is_breaking: boolean;
  is_editorchoice: boolean;
  is_hot: boolean;
  // author: Aut;
};
