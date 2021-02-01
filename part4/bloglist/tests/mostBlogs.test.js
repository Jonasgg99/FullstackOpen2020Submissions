const listHelper = require("../utils/list_helper");

describe("most blogs", () => {
  const listWithFiveBlogs = [
    {author:"three",likes: 9},
    {author:"three",likes:5},
    {author:"two",likes:1},
    {author:"one",likes:8},
    {author:"one",likes:3}
  ];
  const listWithNoDuplicateNumbers = [
    {author:"three",likes: 9},
    {author:"three",likes:5},
    {author:"two",likes:1},
    {author:"one",likes:8}
  ];

  test("find author that appears most often in blogs array", () => {
    const result = listHelper.mostBlogs(listWithNoDuplicateNumbers);

    expect(result).toEqual({author:"three", blogs:2});
  });

  test("when two authors have same number of blog posts", () => {
    const result = listHelper.mostBlogs(listWithFiveBlogs);
    console.log(result);
    expect(result).toEqual({authors:"three, one", blogs:2});
  });

});