// const { Rental, validate } = require("../models/rental");
// const { Movie } = require("../models/movie");
// const { Customer } = require("../models/customer");
// const mongoose = require("mongoose");
// const express = require("express");
// const router = express.Router();

// router.get("/", async (req, res) => {
//   const rentals = await Rental.find().sort("-dateOut"); // - (minus) in descending order
//   res.send(rentals);
// });

// router.post("/", async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const customer = await Customer.findById(req.body.customerId);
//   if (!customer) return res.status(400).send("Invalid customer.");

//   const movie = await Movie.findById(req.body.movieId);
//   if (!movie) return res.status(400).send("Invalid movie.");

//   if (movie.numberInStock === 0)
//     return res.status(400).send("Movie not in stock.");

//   let rental = new Rental({
//     customer: {
//       _id: customer._id,
//       name: customer.name,
//       phone: customer.phone
//     },
//     movie: {
//       _id: movie._id,
//       title: movie.title,
//       dailyRentalRate: movie.dailyRentalRate
//     }
//   });

// // here we have the problem , we have two separate operations.
//     rental = await rental.save();
// // after saving the above rental , maybe the connection goes wrong, server crashes, connection to mongodb drops, so the second operation will not complete. for that we have to use transactions to update both rental and movie datas to database(commit) or non of them will be applied (drop). should be atomic (both complete or both rollback). there is no transactional in mongodb. but there is a technique called two phase commit. for that we will use npm package fawn to simulate that transaction.

//   movie.numberInStock--;
//   movie.save();

//   res.send(rental);

// });

// router.get("/:id", async (req, res) => {
//   const rental = await Rental.findById(req.params.id)

//   if (!rental)
//     return res.status(404).send("The rental with the given ID was not found.");

//   res.send(rental);
// });

// module.exports = router;



// 2nd
const { Rental, validate } = require("../models/rental");
const { Movie } = require("../models/movie");
const { Customer } = require("../models/customer");
const mongoose = require("mongoose");
const Fawn = require("fawn"); // transactions (two phase commits) 
const express = require("express");
const router = express.Router();

// Fawn.init(mongoose);
Fawn.init("mongodb://127.0.0.1:27017/vidly");

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut"); // in descending order
  res.send(rentals);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // following code is the bad approach to check the validity of objectID. this function should belongs to validate functionof rental.js
  
  // if (!mongoose.Types.ObjectId.isValid(req.body.customerId))
  // return res.status(400).send("Invalid customer.");

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer.");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid movie.");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in stock.");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });

//   rental = await rental.save();

//   movie.numberInStock--;
//   movie.save();

//   res.send(rental);

  try {
    new Fawn.Task()
    // here we are directly working with collections. actual name of the collection in database is rentals (plural and case sensitive) and new rental object.
      .save("rentals", rental)
      .update(
        "movies",
        { _id: movie._id },
        {
          $inc: { numberInStock: -1 }
        }
      )
      .run();

    res.send(rental);
  } catch (ex) {
    res.status(500).send("Something failed.");
  }

});

router.get("/:id", async (req, res) => {
  const rental = await Rental.findById(req.params.id)

  if (!rental)
    return res.status(404).send("The rental with the given ID was not found.");

  res.send(rental);
});

module.exports = router;


// FINAL
// const { Rental, validate } = require("../models/rental");
// const { Movie } = require("../models/movie");
// const { Customer } = require("../models/customer");
// const auth = require("../middleware/auth");
// const mongoose = require("mongoose");
// const Fawn = require("fawn");
// const express = require("express");
// const router = express.Router();

// Fawn.init(mongoose);

// router.get("/", auth, async (req, res) => {
//   const rentals = await Rental.find()
//     .select("-__v")
//     .sort("-dateOut");
//   res.send(rentals);
// });

// router.post("/", auth, async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const customer = await Customer.findById(req.body.customerId);
//   if (!customer) return res.status(400).send("Invalid customer.");

//   const movie = await Movie.findById(req.body.movieId);
//   if (!movie) return res.status(400).send("Invalid movie.");

//   if (movie.numberInStock === 0)
//     return res.status(400).send("Movie not in stock.");

//   let rental = new Rental({
//     customer: {
//       _id: customer._id,
//       name: customer.name,
//       phone: customer.phone
//     },
//     movie: {
//       _id: movie._id,
//       title: movie.title,
//       dailyRentalRate: movie.dailyRentalRate
//     }
//   });

//   try {
//     new Fawn.Task()
//       .save("rentals", rental)
//       .update(
//         "movies",
//         { _id: movie._id },
//         {
//           $inc: { numberInStock: -1 }
//         }
//       )
//       .run();

//     res.send(rental);
//   } catch (ex) {
//     res.status(500).send("Something failed.");
//   }
// });

// router.get("/:id", [auth], async (req, res) => {
//   const rental = await Rental.findById(req.params.id).select("-__v");

//   if (!rental)
//     return res.status(404).send("The rental with the given ID was not found.");

//   res.send(rental);
// });

// module.exports = router;

