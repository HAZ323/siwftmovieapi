const mongoos = require("mongoose");
const MovieSchema = mongoos.Schema({
  link_url: String,
  cover_url: String,
  title: String,
  genres: Array,
  rating: Number,
  description: String,
  likes: Number,
});

const MovieModel = mongoos.model("Movies", MovieSchema);
module.exports = MovieModel;
