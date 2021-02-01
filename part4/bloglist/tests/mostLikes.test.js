const listHelper = require("../utils/list_helper");

describe("most likes", () => {
  const listWithFiveBlogs = [
    {author:"three",likes: 9},
    {author:"three",likes:5},
    {author:"two",likes:1},
    {author:"one",likes:8},
    {author:"one",likes:3}
  ];

  test("find author that has the most likes", () => {
    const result = listHelper.mostLikes(listWithFiveBlogs);

    expect(result).toEqual({author:"three", likes:14});
  });

});