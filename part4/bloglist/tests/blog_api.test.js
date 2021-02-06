const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");

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
let token;
beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();

  await User.deleteMany({});
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash('sekret', saltRounds);
  const user = new User({ username: 'sampleUsername', passwordHash });

  await user.save();

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  token = jwt.sign(userForToken, process.env.SECRET)
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
  const newBlogPost = {
    title: 'Test Title 1',
    author: 'Test Author 1',
    url: 'Test URL 1'
  };

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlogPost)
    .expect(200)
    .expect((response) => {
      response.body.likes === 0
    });
    
});

test('a blog can be added', async () => {
  const newBlogPost = {
    title: 'Test Title 1',
    author: 'Test Author 1',
    url: 'Test URL 1',
    likes: 12,
  };

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlogPost)
    .expect(200);
    
  const response = await api.get('/api/blogs');

  const titles = response.body.map(r => r.title);

  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(titles).toContain(
    'Test Title 1'
  );
});

test('missing title and url', async () => {
  const newBlogPost = {
    author: 'Test Author 1',
    likes: 12,
  };

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlogPost)
    .expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});

