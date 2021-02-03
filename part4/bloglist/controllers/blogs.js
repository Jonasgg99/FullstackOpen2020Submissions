const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const blog = await new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0
  });

  const saved = await blog.save();
  
  response.json(saved);
});

blogsRouter.delete("/:id", async (request, response) => {
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
