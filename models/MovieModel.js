const mongoos = require("mongoose");
const MovieSchema = mongoos.Schema({
  link_url: String,
  cover_url: String,
  title: String,
  genres: Array,
  rating: String,
  description: String,
  likes: Number,
  popular: Boolean,
  promoted: Boolean,
});

const MovieModel = mongoos.model("Movies", MovieSchema);
module.exports = MovieModel;
