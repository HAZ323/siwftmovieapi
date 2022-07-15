const express = require("express");
const { reset } = require("nodemon");
const moviesRoute = express.Router();
const MovieModel = require("../models/MovieModel");

//upload to database
moviesRoute.post("/", async (req, res) => {
  try {
    const movie = new MovieModel({
      link_url: req.body.link_url,
      cover_url: req.body.cover_url,
      title: req.body.title,
      rating: req.body.rating,
      description: req.body.description,
      likes: Math.floor(Math.random() * 500),
      genres: req.body.genres,
    });

    const addmovie = await movie.save();
    res.send(addmovie);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

moviesRoute.delete("/:id", async (req, res) => {
  try {
    const movie = await MovieModel.findByIdAndRemove(req.params.id);

    if (!movie) return res.status(404).send("Movie Doesn't Exist");
    res.send("Successful").status(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

moviesRoute.get("/", async (req, res) => {
  try {
    const movies = await MovieModel.find().sort("-_id").select("-__v");
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
