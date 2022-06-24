const mongoos = require("mongoose");
const MovieSchema = mongoos.Schema({
  url: String,
  cover: String,
  title: String,
  genres: Array,
  likes: Number,
});

const MovieModel = mongoos.model("Movies", MovieSchema);
module.exports = MovieModel;
