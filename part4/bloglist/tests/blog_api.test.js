const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);
const Blog = require("../models/blog");

const initialBlogs = [
  {
    title:"test1",
    author:"test1author",
    url:"test1url",
    likes:1,
  },
  {
    title:"test2",
    author:"test2author",
    url:"test2url",
    likes:2,
  }
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(initialBlogs.length);
});

test('id is defined', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body[0].id).toBeDefined();
});

test('added blogs without likes default to 0', async () => {
  const newBlog = {
    title: 'blog without likes',
    url: 'testurl',
    author: "testMan",
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect((response) => {
      console.log(response.body);
      response.body.likes === 0;
    });
    
});

test('a blog can be added', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    url: 'testurl',
    author: "testMan",
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');

  const titles = response.body.map(r => r.title);

  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(titles).toContain(
    'async/await simplifies making async calls'
  );
});

test('missing title and url', async () => {
  const newBlog = new Blog({
    author: "testauthor",
    likes: 5
  });

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});

