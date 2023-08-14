const mongoose = require("mongoose");
const validator = require("validator");

const blogSchema = new mongoose.Schema({
  category: String,
  title: String,
  subtitle: String,
  banner: String,
  date: {
    type: Number,
    default: new Date().getTime(),
  },
  author: String,
  content: String,
  day: String,
  visibility: {
    type: String,
    default: "Public",
  },
  status: {
    type: Boolean,
    default: false,
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
