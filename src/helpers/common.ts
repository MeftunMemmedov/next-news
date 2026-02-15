export const slugifyTitle = (title: string) => {
  const slugified = title.toLowerCase().split(' ').join('-').toString();
  return slugified;
};
