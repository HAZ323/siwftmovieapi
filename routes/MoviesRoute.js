const express = require("express");
const moviesRoute = express.Router();
const MovieModel = require("../models/MovieModel");

//upload to database
moviesRoute.post("/", async (req, res) => {
  try {
    const movie = new MovieModel({
      url: req.body.url,
      cover: req.body.cover,
      title: req.body.title,
      likes: Math.floor(Math.random() * 500),
      genres: req.body.genres,
    });

    const addmovie = await movie.save();
    res.send(addmovie);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

moviesRoute.get("/", async (req, res) => {
  try {
    const movies = await MovieModel.find().sort("-_id");
    res.send(movies);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

moviesRoute.get("/:id", async (req, res) => {
  try {
    const movie = await MovieModel.findById(req.params.id);
    res.send(movie);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

moviesRoute.get("/searchResult/:query", async (req, res) => {
  try {
    const movies = await MovieModel.find({
      $or: [
        { genres: { $in: [req.params.query] } },
        { title: { $regex: req.params.query } },
      ],
    });
    res.send(movies);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

module.exports = moviesRoute;
