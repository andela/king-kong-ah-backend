import { createUniqueSlug } from '<helpers>/utils';

const slugTitle = createUniqueSlug('hello world');

export const newArticle = {
  title: 'Hello world!',
  body: `So how did the classical Latin become so incoherent? According to McClintock, a 15th century typesetter likely scrambled part of Cicero's De Finibus in order to provide placeholder text to mockup various fonts for a type specimen book.

  It's difficult to find examples of lorem ipsum in use before Letraset made it popular as a dummy text in the 1960s, although McClintock says he remembers coming across the lorem ipsum passage in a book of old metal type samples.`,
  userId: 'a5b37ee6-1553-4681-a343-d8296344e129',
  isBlacklisted: false,
  slug: slugTitle,
  categoryId: '325163a1-6e8c-4cd8-b5d3-7019c49983f5',
  isPublished: true
};

export default { newArticle };
