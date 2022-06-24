const mongoos = require("mongoose");
const userSchema = mongoos.Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
  },
  likes_movie: Array
});

module.exports = mongoos.model("Users", userSchema);
