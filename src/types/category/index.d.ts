export type Category = {
  id: string;
  title: string;
  parent: null | Category;
  children: Category[];
};
