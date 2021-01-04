export const isLiked = (reaction) => {
  if (!reaction) return false;
  if (reaction === 0) return false;
  return true;
};
