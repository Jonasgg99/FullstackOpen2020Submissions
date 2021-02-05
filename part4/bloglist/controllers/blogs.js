const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");



blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid '});
  }
  const user = await User.findById(decodedToken.id);

  const blog = await new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  });

  const saved = await blog.save();
  user.blogs = user.blogs.concat(saved._id);
  await user.save();
  
  response.json(saved);
});

blogsRouter.delete("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog === null) {
    response.status(400).json({error: 'blog does not exist'})
  }
  const blogUser = blog.user;


  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (decodedToken.id != blogUser.toString()) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const blogToUpdate = await Blog.findById(request.params.id);

  const updatedBlog = {
    likes: request.body.likes
  };
  
  await Blog.findByIdAndUpdate(blogToUpdate.id, updatedBlog, {new:true});
  response.json(`${blogToUpdate.author}'s blog ${blogToUpdate.title} updated to ${request.body.likes} likes`);
});

module.exports = blogsRouter;
