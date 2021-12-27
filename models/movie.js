const Joi = require('joi');
const mongoose = require('mongoose');
const { genreSchema } = require('./genre');

// this is our persistend model, going to store in mongodb
const Movie = mongoose.model(
  'Movies',
  new mongoose.Schema({
    title: {
      type: String,
      trim: true,
      minlength: 5,
      maxlength: 255,
      required: true
    },
    genre: {
        // We loaded genreSchema from ./genre module
        // here it is model representation of an application
      type: genreSchema,
      required: true
    },
    numberInStock: {
      type: Number,
      required: true,
      // default: 0,
      min: 0,
      max: 255
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      // default: 0,
      min: 0,
      max: 255
    }
  })
);

// this joi schema is different from mongo schema
// here we are sending only the id of the genre,
// joi schema is what client sent to us. 
function validateMovie(movie) {
  const schema = {
    title: Joi.string()
      .min(5)
      .max(50)
      .required(),
    genreId: Joi.objectId().required(),
    // genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required()
  };
  return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;


// FINAL
// const { genreSchema } = require('./genre');
// const Joi = require('joi');
// const mongoose = require('mongoose');

// const Movie = mongoose.model(
//   'Movie',
//   new mongoose.Schema({
//     title: {
//       type: String,
//       trim: true,
//       minlength: 3,
//       maxlength: 255,
//       required: true
//     },
//     genre: {
//       type: genreSchema,
//       required: true
//     },
//     numberInStock: {
//       type: Number,
//       default: 0,
//       min: 0,
//       max: 255
//     },
//     dailyRentalRate: {
//       type: Number,
//       default: 0,
//       min: 0,
//       max: 255
//     }
//   })
// );

// function validation(value) {
//   const schema = {
//     title: Joi.string()
//       .min(3)
//       .max(255)
//       .required(),
//     genreId: Joi.objectId()
//       .min(3)
//       .max(255)
//       .required(),
//     numberInStock: Joi.number().min(0),
//     dailyRentalRate: Joi.number().min(0)
//   };
//   return Joi.validate(value, schema);
// }

// exports.Movie = Movie;
// exports.validation = validation;

