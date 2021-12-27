// const mongoose = require('mongoose');
// const Joi = require('joi');

// const User = mongoose.model('User', new mongoose.Schema({
//   name: {
//     type: String,
//     minlength: 5,
//     maxlength: 50,
//     required: true,
//   },
//   email: {
//     type: String,
//     minlength: 5,
//     maxlength: 255,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     minlength: 6,
//     maxlength: 1024
//   },
// }));

// function validateUser(user) {
//   const schema = {
//     name: Joi.string()
//       .min(5)
//       .max(50)
//       .required(),
//     email: Joi.string()
//       .min(5)
//       .max(255)
//       .email()
//       .required(),
//     password: Joi.string().min(5).max(255).required()
//   };
//   return Joi.validate(user, schema);
// }

// exports.User = User;
// exports.validate = validateUser;

// 2nd
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
    trim: true
  },
  email: {
    type: String,
    minlength: 10,
    maxlength: 255,
    required: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 1024
  },
  isAdmin: Boolean,
  // roles: [],
  // operations: []
});

userSchema.methods.generateAuthToken = function() {

  // const token = jwt.sign(
  //   { _id: this._id },
  //   config.get('jwtPrivateKey')
  // );
  // return token;

  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get('jwtPrivateKey')
  );
  return token;

  // return jwt.sign(
  //   { _id: this._id, isAdmin: this.isAdmin },
  //   config.get('jwtPrivateKey')
  // );

};

const User = mongoose.model('User', userSchema);

function validateUser(value) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    email: Joi.string()
      .min(10)
      .max(255)
      .email()
      .required(),
    password: Joi.string().required()
  };
  return Joi.validate(value, schema);
}

exports.User = User;
exports.validate = validateUser;


// FINAL
// const jwt = require('jsonwebtoken');
// const config = require('config');
// const mongoose = require('mongoose');
// const Joi = require('joi');
// const PasswordComplexity = require('joi-password-complexity');

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     minlength: 3,
//     maxlength: 50,
//     required: true,
//     trim: true
//   },
//   email: {
//     type: String,
//     minlength: 10,
//     maxlength: 255,
//     required: true,
//     lowercase: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     minlength: 6,
//     maxlength: 1024
//   },
//   isAdmin: Boolean
// });

// userSchema.methods.generateAuthToken = function() {
//   return jwt.sign(
//     { _id: this._id, isAdmin: this.isAdmin },
//     config.get('jwtPrivateKey')
//   );
// };

// const User = mongoose.model('User', userSchema);

// function validation(value) {
//   const schema = {
//     name: Joi.string()
//       .min(3)
//       .max(50)
//       .required(),
//     email: Joi.string()
//       .min(10)
//       .max(255)
//       .email()
//       .required(),
//     password: Joi.string().required()
//   };
//   return Joi.validate(value, schema);
// }

// function passwordValidation(value) {
//   const complexityOptions = {
//     min: 8,
//     max: 30,
//     lowerCase: 1,
//     upperCase: 1,
//     numeric: 1
//   };
//   return Joi.validate(value, new PasswordComplexity(complexityOptions));
// }

// exports.User = User;
// exports.validation = validation;
// exports.passwordValidation = passwordValidation;
