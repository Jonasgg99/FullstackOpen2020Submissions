const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item;
  };

  const likesArray = blogs.map(blog => blog.likes);

  return likesArray.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const reducer = (cur, prev) => {
    return cur.likes > prev.likes? cur : prev;
  };
  return blogs.reduce(reducer);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};