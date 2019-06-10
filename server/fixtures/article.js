import { createUniqueSlug } from '<helpers>/utils';

const slugTitle = createUniqueSlug('hello world');

export const newArticle = {
  title: 'Hello world!',
  body: `So how did the classical Latin become so incoherent? According to McClintock, a 15th century typesetter likely scrambled part of Cicero's De Finibus in order to provide placeholder text to mockup various fonts for a type specimen book.

  It's difficult to find examples of lorem ipsum in use before Letraset made it popular as a dummy text in the 1960s, although McClintock says he remembers coming across the lorem ipsum passage in a book of old metal type samples. So far he hasn't relocated where he once saw the passage, but the popularity of Cicero in the 15th century supports the theory that the filler text has been used for centuries.

  And anyways, as Cecil Adams reasoned, “[Do you really] think graphic arts supply houses were hiring classics scholars in the 1960s?” Perhaps. But it seems reasonable to imagine that there was a version in use far before the age of Letraset.

  McClintock wrote to Before & After to explain his discovery;

  “What I find remarkable is that this text has been the industry's standard dummy text ever since some printer in the 1500s took a galley of type and scrambled it to make a type specimen book; it has survived not only four centuries of letter-by-letter resetting but even the leap into electronic typesetting, essentially unchanged except for an occasional 'ing' or 'y' thrown in. It's ironic that when the then-understood Latin was scrambled, it became as incomprehensible as Greek; the phrase 'it's Greek to me' and 'greeking' have common semantic roots!” (The editors published his letter in a correction headlined “Lorem Oopsum”).`,
  userId: 'a5b37ee6-1553-4681-a343-d8296344e129',
  isBlacklisted: false,
  slug: slugTitle,
  categoryId: '325163a1-6e8c-4cd8-b5d3-7019c49983f5',
  isPublished: true
};

export default { newArticle };
