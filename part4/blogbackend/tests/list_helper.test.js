const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);

  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  test("of empty list is zero", () => {
    const expected = 0;
    const result = listHelper.totalLikes([]);

    assert.strictEqual(result, expected);
  });

  test("when list has only one blog equals the likes of that", () => {
    blogs = [{ likes: 4 }];
    const expected = 4;
    const result = listHelper.totalLikes(blogs);

    assert.strictEqual(result, expected);
  });

  test("of a bigger list is calculated right", () => {
    // the blog objects are valid types of the partial with
    // only the 'likes' property since the 'totalLikes' function
    // only reads/uses that property
    blogs = [
      { likes: 4 },
      { likes: 3 },
      { likes: 0 },
      { likes: 10 },
      { likes: 2 },
    ];
    const expected = 19;
    const result = listHelper.totalLikes(blogs);

    assert.strictEqual(result, expected);
  });
});

describe("favorite blog", () => {
  test("when of an empty list is null", () => {
    const expected = null;
    const result = listHelper.favoriteBlog([]);
    assert.strictEqual(result, expected);
  });

  test("when of a single blog collection is that blog", () => {
    const blogs = [
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 0,
      },
    ];
    const [expected] = blogs;
    const result = listHelper.favoriteBlog(blogs);
    assert.deepStrictEqual(result, expected);
  });

  test("is the correct one when there are multiple blog posts", () => {
    const blogs = [
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 14,
        __v: 0,
      },
      {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0,
      },
      {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 14,
        __v: 0,
      },
    ];

    // second blog from blogs is the favorite one
    const [, expected] = blogs;
    const result = listHelper.favoriteBlog(blogs);
    assert.deepStrictEqual(result, expected);
  });
});

describe("most blogs", () => {
  test("when there are no blogs is null", () => {
    const expected = null;
    const result = listHelper.mostBlogs([]);

    assert.strictEqual(result, expected);
  });

  test("when there if only one blog post", () => {
    const expected = { author: "John Doe", blogs: 1 };
    const result = listHelper.mostBlogs([{ author: "John Doe" }]);

    assert.deepStrictEqual(result, expected);
  });

  test("when there are multiple blog posts the is the correct value", () => {
    const expected = { author: "John Doe", blogs: 2 };
    const result = listHelper.mostBlogs([
      { author: "John Doe" },
      { author: "Jane Doe" },
      { author: "John Doe" },
      { author: "Jane Doe" },
      { author: "Mane Doo" },
    ]);
    assert.deepStrictEqual(result, expected);
  });
});

describe("most likes", () => {
  test("when there are no blogs is null", () => {
    const expected = null;
    const result = listHelper.mostLikes([]);

    assert.strictEqual(result, expected);
  });

  test("when there if only one blog post is that blog posts author and the likes", () => {
    const expected = { author: "Michael Chan", likes: 7 };
    const result = listHelper.mostLikes([
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0,
      },
    ]);

    assert.deepStrictEqual(result, expected);
  });

  test("when there are multiple blog posts the is the correct value", () => {
    const expected = { author: "Edsger W. Dijkstra", likes: 17 };
    const result = listHelper.mostLikes([
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
      {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0,
      },
      {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0,
      },
      {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0,
      },
      {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0,
      },
    ]);
    assert.deepStrictEqual(result, expected);
  });
});
