const { Genre } = require("../models/genre");
const { Movie, validate } = require("../models/movie");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("name");
  res.send(movies);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  // let movie = new Movie({
  const movie = new Movie({
    title: req.body.title,
    // instead of storing all the properties of genre, we will store selectively
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  // movie = await movie.save();
  await movie.save();

  res.send(movie);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
});

router.delete("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
});

module.exports = router;

// const admin = require('../middlewares/admin');
// const authorization = require('../middlewares/authorization');
// const validator = require('../middlewares/validator');
// const { Genre } = require('../models/genre');
// const { validation, Movie } = require('../models/movie');
// const express = require('express');
// const router = express.Router();

// router.get('/', async (req, res) => {
//   await Movie.find({}, (err, doc) => {
//     if (doc.length === 0) return res.status(404).send('not found');
//     res.send(doc);
//   }).sort('title');
// });

// router.get('/:id', async (req, res) => {
//   await Movie.findById(req.params.id, {}, {}, (err, doc) => {
//     if (err) return res.status(404).send('not found');

//     res.send(doc);
//   }).select('title genre numberInStock dailyRentalRate');
// });

// router.post('/', [authorization, validator(validation)], async (req, res) => {
//   const { title, genreId, numberInStock, dailyRentalRate } = req.body;
//   const genre = await Genre.findById(genreId);

//   await Movie.collection.insertOne(
//     {
//       title,
//       genre: {
//         _id: genre._id,
//         name: genre.name
//       },
//       numberInStock,
//       dailyRentalRate
//     },
//     (err, doc) => {
//       res.send(doc.ops[0]);
//     }
//   );
// });

// router.put('/:id', [authorization, validator(validation)], async (req, res) => {
//   const { title, genreId, numberInStock = 0, dailyRentalRate = 0 } = req.body;

//   const genre = await Genre.findById(genreId, {}, {}, err => {
//     if (err) return res.status(404).send('not found');
//   });

//   const genre_id = genre._id;
//   const genreName = genre.name;
//   await Movie.findOneAndUpdate(
//     { _id: req.params.id },
//     {
//       $set: {
//         title,
//         'genre._id': genre_id,
//         'genre.name': genreName,
//         numberInStock,
//         dailyRentalRate
//       }
//     },
//     { new: true },
//     (err, doc) => {
//       if (err) return res.status(404).send('not found');

//       res.send(doc);
//     }
//   );
// });

// router.delete('/:id', [authorization, admin], async (req, res) => {
//   await Movie.findOneAndDelete({ _id: req.params.id }, (err, doc) => {
//     if (err) return res.status(404).send('not found');
//     res.send(doc);
//   });
// });

// module.exports = router;
