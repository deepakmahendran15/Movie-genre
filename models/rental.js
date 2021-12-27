const mongoose = require('mongoose');
const Joi = require('joi');
// Joi.objectId = require('joi-objectid')(Joi);

// we need primary properties of the customer collections
const Rental = mongoose.model('Rental', new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      },
      isGold: {
        type: Boolean,
        default: false
      },
      phone: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 50
      }
    }),
    required: true
  },
  // we created custome schema, we have not used movie.js schema. we donot want all the properties of movie.js
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        trim: true,
        required: true,
        minlength: 5,
        maxlength: 255
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        // default: 0,
        min: 0,
        max: 255
      }
    }),
    required: true
  },
  dateOut: {
    type: Date,
    default: Date.now,
    required: true
  },
  dateReturned: {
      type: Date
  },
  rentalFee: {
    type: Number,
    min: 0
  }
}));

function validateRental(rental) {
  const schema = {
    // customerId: Joi.string().required(),
    // movieId: Joi.string().required(),
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  };
  return Joi.validate(rental, schema);
}

exports.Rental = Rental;
exports.validate = validateRental;


// FINAL
// const moment = require('moment');
// const mongoose = require('mongoose');
// const Joi = require('joi');

// const rentalSchema = new mongoose.Schema({
//   customer: {
//     type: new mongoose.Schema({
//       name: {
//         type: String,
//         minlength: 3,
//         maxlength: 50
//       },
//       isGold: {
//         type: Boolean,
//         default: false
//       },
//       phone: {
//         type: String,
//         require: true,
//         min: 5,
//         max: 50
//       }
//     }),
//     required: true
//   },
//   movie: {
//     type: new mongoose.Schema({
//       title: {
//         type: String,
//         trim: true,
//         required: true,
//         minlength: 3,
//         maxlength: 255
//       },
//       dailyRentalRate: {
//         type: Number,
//         required: true,
//         default: 0,
//         min: 0,
//         max: 255
//       }
//     }),
//     required: true
//   },
//   dateOut: {
//     type: Date,
//     default: Date.now,
//     required: true
//   },
//   dateReturned: Date,
//   rentalFee: {
//     type: Number,
//     min: 0
//   }
// });

// rentalSchema.statics.lookUp = function(customerId, movieId) {
//   return this.findOne({ 'customer._id': customerId, 'movie._id': movieId });
// };

// rentalSchema.methods.return = function() {
//   this.dateReturned = new Date();

//   const rentalDays = moment().diff(this.dateOut, 'days');
//   return (this.rentalFee = rentalDays * this.movie.dailyRentalRate);
// };

// const Rental = mongoose.model('Rental', rentalSchema);

// function validation(value) {
//   const schema = {
//     customerId: Joi.objectId().required(),
//     movieId: Joi.objectId().required(),
//     dateOut: Joi.date().min(0),
//     dateReturned: Joi.date().min(0)
//   };
//   return Joi.validate(value, schema);
// }

// exports.Rental = Rental;
// exports.validation = validation;
