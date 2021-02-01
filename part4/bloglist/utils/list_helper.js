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

const mostLikes = (blogs) => {
  let authors = new Map();

  blogs.forEach(blog => {
    authors.set(blog.author, authors.get(blog.author)? authors.get(blog.author)+blog.likes : blog.likes);
  });

  const mostLikedAuthor = [...authors.entries()].reduce(( cur, prev ) => cur[1] > prev[1] ? cur : prev);

  return { author:mostLikedAuthor[0], likes:mostLikedAuthor[1]};
};

const mostBlogs = (blogs) => {
  let authors = new Map();

  blogs.forEach(blog => {
    authors.set(blog.author, authors.get(blog.author)? authors.get(blog.author)+1 : 1)
  });

  const author = [...authors.entries()].reduce(( cur, prev ) => cur[1] > prev[1] ? cur : prev);
  const final = { author:author[0], blogs:author[1]};
  const multipleAuthors = [...authors.entries()].filter(i => i[1] >= author[1]);

  if (multipleAuthors.length === 1) {
    return final;
  }
  const multipleFinal = { authors:multipleAuthors.map(i => i[0]).join(", "), blogs:author[1] };
  return multipleFinal;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};