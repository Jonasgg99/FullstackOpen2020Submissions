const listHelper = require("../utils/list_helper");

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    }
  ];
  const listWithFiveBlogs = [
    {likes: 2},
    {likes:5},
    {likes:1},
    {likes:8},
    {likes:3}
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("when list has no blogs, equals 0", () => {
    const result =listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  test("when list has multiple blogs, equal sum of likes", () => {
    const result = listHelper.totalLikes(listWithFiveBlogs);
    expect(result).toBe(19);
  });
});