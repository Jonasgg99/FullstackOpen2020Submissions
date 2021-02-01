const { TestScheduler } = require("jest");
const listHelper = require("../utils/list_helper");

describe("favorite blog", () => {
  const listWithFiveBlogs = [
    {title:"one",likes: 9},
    {title:"two",likes:5},
    {title:"three",likes:1},
    {title:"four",likes:8},
    {title:"five",likes:3}
  ];

  test("when list has multiple items, return item with highest likes", () => {
    const result = listHelper.favoriteBlog(listWithFiveBlogs);
    expect(result).toEqual({title:"one",likes:9});
  });

  test("when list has one item, return that item", () => {
    const result = listHelper.favoriteBlog([{title:"test",likes:4}]);
    expect(result).toEqual({title:"test",likes:4});
  });
});