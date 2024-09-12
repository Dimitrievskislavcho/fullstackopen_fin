const Blog = require("../models/blog");

const setupBlogs = [
  {
    author: "John Doe",
    likes: 1,
    title: "Memories",
    url: "http://memories-non-real-url.org",
  },
];

const isBlogAvailable = (blogs, id) => blogs.map(({ id }) => id).includes(id);

const getAllBlogs = () => Blog.find({});

module.exports = {
  setupBlogs,
  isBlogAvailable,
  getAllBlogs,
};
