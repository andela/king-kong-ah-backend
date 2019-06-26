export const comment = {
  comment: 'this is a comment',
  type: 'no idea',
  userId: '6e10f658-efd2-4bb9-9793-eaafc1fca7fd',
  articleId: '6e10f658-efd2-4bb9-9793-eaafc1fca7fd'
};

export const getComment = args => ({
  ...comment,
  ...args,
});
