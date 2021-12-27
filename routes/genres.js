// const express = require('express');
// const router = express.Router();

// const genres = [
//     { id: 1, name : 'Action'},
//     { id: 2, name : 'Horror'},
//     { id: 3, name : 'Romance'},
// ]

// app.get('/api/genres', (req, res) => {
//         res.send(genres);
//     });

//     app.get('/api/genres/:id', (req, res) => {
//         const genre = genres.find(c => c.id === parseInt(req.params.id));
//         if (!genre) return res.status(404).send('The course with the given id was not found');
//         res.send(genre);
//     });

//     app.post('/api/genres', (req, res) => {
//         const { error } = validateCourse(req.body);

//         if (error)  return res.status(400).send(error.details[0].message);

//         const genre = {
//             id: genres.length + 1,
//             name: req.body.name
//         };

//         genres.push(genre);
//         res.send(genre);
//     });

//     app.put('/api/genres/:id', (req, res) => {

//         const genre = genres.find(c => c.id === parseInt(req.params.id));

//         if (!genre) return res.status(404).send('The course with the given id was not found');

//         const { error } = validateCourse(req.body);
//         if (error) return res.status(400).send(error.details[0].message);

//         genre.name = req.body.name;
//         res.send(genre);
//     });

//     function validateCourse(genre) {
//         const schema = {
//             name: Joi.string().min(3).required()
//         };
//         return Joi.validate(genre, schema);
//     }

//     app.delete("/api/genres/:id", (req, res) => {
//         const genre = genres.find(c => c.id === parseInt(req.params.id));
//         if (!genre) return res.status(404).send('The course with the given id was not found');

//         const index = genres.indexOf(genre);
//         genres.splice(index, 1);

//         res.send()
//     })

// // 2nd
// const express = require("express");
// const router = express.Router();

// const genres = [
//   { id: 1, name: "Action" },
//   { id: 2, name: "Horror" },
//   { id: 3, name: "Romance" },
// ];

// router.get("/", (req, res) => {
//   res.send(genres);
// });

// router.get("/:id", (req, res) => {
//   const genre = genres.find((c) => c.id === parseInt(req.params.id));
//   if (!genre)
//     return res.status(404).send("The genre with the given id was not found");
//   res.send(genre);
// });

// router.post("/", (req, res) => {
//   const { error } = validateCourse(req.body);

//   if (error) return res.status(400).send(error.details[0].message);

//   const genre = {
//     id: genres.length + 1,
//     name: req.body.name,
//   };

//   genres.push(genre);
//   res.send(genre);
// });

// router.put("/:id", (req, res) => {
//   const genre = genres.find((c) => c.id === parseInt(req.params.id));

//   if (!genre)
//     return res.status(404).send("The genre with the given id was not found");

//   const { error } = validateCourse(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   genre.name = req.body.name;
//   res.send(genre);
// });

// function validateCourse(genre) {
//   const schema = {
//     name: Joi.string().min(3).required(),
//   };
//   return Joi.validate(genre, schema);
// }

// router.delete("/:id", (req, res) => {
//   const genre = genres.find((c) => c.id === parseInt(req.params.id));
//   if (!genre)
//     return res.status(404).send("The genre with the given id was not found");

//   const index = genres.indexOf(genre);
//   genres.splice(index, 1);

//   res.send();
// });

// module.exports = router;

// // 3rd
// const mongoose = require('mongoose');
// const Joi = require("joi");
// const express = require("express");
// const router = express.Router();

// // const genreSchema = new mongoose.Schema ({
// //   name: {
// //     type: String,
// //     required: true,
// //     minlength: 5,
// //     maxlength: 50
// //   }
// // });

// // const Genre = new mongoose.model('Genre', genreSchema);

// const Genre = mongoose.model('Genre', new mongoose.Schema ({
//   name: {
//     type: String,
//     required: true,
//     minlength: 5,
//     maxlength: 50
//   }
// }));

// // const genres = [
// //   { id: 1, name: "Action" },
// //   { id: 2, name: "Horror" },
// //   { id: 3, name: "Romance" },
// // ];

// router.get("/", async (req, res) => {
//   // res.send(genres);

//   const genres = await Genre.find().sort('name');
//   res.send(genres);

//   // we can also rewrite like this
//   // res.send(await Genre.find().sort('name'));
// });

// router.get("/:id", async (req, res) => {
//   const genre = await Genre.findById(req.params.id);

//   if (!genre)
//     return res.status(404).send("The genre with the given ID was not found");
//   res.send(genre);

//   // const genre = genres.find((c) => c.id === parseInt(req.params.id));
//   // if (!genre)
//   //   return res.status(404).send("The genre with the given id was not found");
//   // res.send(genre);
// });

// router.post("/", async (req, res) => {
//   const { error } = validateGenre(req.body);

//   if (error) return res.status(400).send(error.details[0].message);

//   // const genre = {
//   //   id: genres.length + 1,
//   //   name: req.body.name,
//   // };
//   // genres.push(genre);
//   // res.send(genre);

//   let genre = new Genre({ name: req.body.name });
//   genre = await genre.save();
//   res.send(genre);

// });

// // here we are doing , query first and update next
// // now we are changing to update first , query next. this is more efficient.
// router.put("/:id", async (req, res) => {

//   const { error } = validateGenre(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })

//   if (!genre)
//     return res.status(404).send("The genre with the given ID was not found");

//   res.send(genre);

//   // const genre = genres.find((c) => c.id === parseInt(req.params.id));

//   // if (!genre)
//   //   return res.status(404).send("The genre with the given id was not found");

//   // const { error } = validateCourse(req.body);
//   // if (error) return res.status(400).send(error.details[0].message);

//   // genre.name = req.body.name;
//   // res.send(genre);
// });

// router.delete("/:id", async (req, res) => {

//   const genre = await Genre.findByIdAndRemove(req.params.id);

//   if (!genre)
//     return res.status(404).send("The genre with the given ID  was not found");

//   res.send(genre);

//   // const genre = genres.find((c) => c.id === parseInt(req.params.id));
//   // if (!genre)
//   //   return res.status(404).send("The genre with the given ID  was not found");

//   // const index = genres.indexOf(genre);
//   // genres.splice(index, 1);

//   // res.send(genre);
// });

// function validateGenre(genre) {
//   const schema = {
//     name: Joi.string().min(3).required(),
//   };
//   return Joi.validate(genre, schema);
// }

// module.exports = router;

// 4th
// const genre = require('../models/genre');

// the above customer model has two properties.
// one is Customer object and other is validate function
// in order to reference, we have to code like this
// await genre.Genre.find().sort('name');

// for better approach , is object resturcturing
// const {Genre, validate} = require('../models/genre');
// const mongoose = require('mongoose');
// // const Joi = require("joi");
// const express = require("express");
// const router = express.Router();

// // const Genre = mongoose.model('Genre', new mongoose.Schema ({
// //   name: {
// //     type: String,
// //     required: true,
// //     minlength: 5,
// //     maxlength: 50
// //   }
// // }));

// router.get("/", async (req, res) => {

//   const genres = await Genre.find().sort('name');
//   res.send(genres);

// });

// router.get("/:id", async (req, res) => {
//   const genre = await Genre.findById(req.params.id);

//   if (!genre)
//     return res.status(404).send("The genre with the given ID was not found");
//   res.send(genre);

// });

// router.post("/", async (req, res) => {

//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   let genre = new Genre({ name: req.body.name });
//   genre = await genre.save();
//   res.send(genre);

// });

// router.put("/:id", async (req, res) => {

//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })

//   if (!genre)
//     return res.status(404).send("The genre with the given ID was not found");

//   res.send(genre);
// });

// router.delete("/:id", async (req, res) => {

//   const genre = await Genre.findByIdAndRemove(req.params.id);

//   if (!genre)
//     return res.status(404).send("The genre with the given ID  was not found");

//   res.send(genre);
// });

// // function validateGenre(genre) {
// //   const schema = {
// //     name: Joi.string().min(3).required(),
// //   };
// //   return Joi.validate(genre, schema);
// // }

// module.exports = router;

// 5th
// const asyncMiddleware = require("../middleware/async");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Genre, validate } = require("../models/genre");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// router.get("/", async (req, res) => {
//   // const genres = await Genre.find().sort('name');
//   // res.send(genres);
//   try {
//     const genres = await Genre.find().sort('name');
//   res.send(genres);
//   }
//   catch (ex) {
//     // 500 for internal server error
//     // we have to log this exeception
//     res.status(500).send('Something failed.');
//   }
// });

// this is a template should have every route handler
// function asyncMiddleware(handler) {
//   // we pass route handler function
//   try {
//     handler();
//   }
//   catch (ex){
//     next(ex);
//   }
// }

// router.get("/", async (req, res, next) => {
//   try {
//     const genres = await Genre.find().sort('name');
//     res.send(genres);
//   }
//   catch (ex) {
//     next(ex);
//   }
// });

// function asyncMiddleware(handler) {
//   return async (req, res, next) => {
//     try {
//       await handler(req, res);
//     } catch (ex) {
//       next(ex);
//     }
//   };
// }

// router.get(
//   "/",
//   asyncMiddleware(async (req, res) => {
//     const genres = await Genre.find().sort("name");
//     res.send(genres);
//   })
// );

router.get(
  "/",
  async (req, res) => {
    // throw new Error('Could not get the genres.');
    const genres = await Genre.find().sort("name");
    res.send(genres);
  });

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found");
  res.send(genre);
});

// run middleware functions before executes router
// router.post(
//   "/",
//   auth,
//   asyncMiddleware(async (req, res) => {
//     // const token = req.header('x-auth-token');
//     // res.status(401) // 401 means client does not have authentication credentials to access this resource

//     const { error } = validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     let genre = new Genre({ name: req.body.name });
//     genre = await genre.save();
//     res.send(genre);
//   })
// );


router.post(
  "/",
  auth,
  async (req, res) => { 
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();

    res.send(genre);
  });

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found");

  res.send(genre);
});

// run middleware functions before executes router
// first it will check auth and admin and passed to router
router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre)
    return res.status(404).send("The genre with the given ID  was not found");

  res.send(genre);
});

module.exports = router;
