const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs);
    })
    .catch(error => {
      return response.status(404).send({error: "not found"});
    });
});

blogsRouter.post("/", (request, response) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then(result => {
      response.status(201).json(result);
    })
    .catch(error => {
      return response.status(400).send({error: "post failed"});
    });
});

module.exports = blogsRouter;
