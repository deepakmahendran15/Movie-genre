// const mongoose = require('mongoose');
// const Joi = require("joi");
// const express = require("express");
// const router = express.Router();

// const Customer = mongoose.model('Customer', new mongoose.Schema ({
//   name: {
//     type: String,
//     required: true,
//     minlength: 5,
//     maxlength: 50
//   },
//   isGold: {
//       type: Boolean,
//       default: false
//   },
//   phone: {
//     type: String,
//     required: true,
//     minlength: 5,
//     maxlength: 50
//   },
// }));

// router.get("/", async (req, res) => {
//   const customers = await Customer.find().sort('name');
//   res.send(customers);
// });

// router.get("/:id", async (req, res) => {
//   const customer = await Customer.findById(req.params.id);

//   if (!customer)
//     return res.status(404).send("The customer with the given ID was not found");
//   res.send(customer);
// });

// router.post("/", async (req, res) => {
//   const { error } = validateCustomer(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   let customer = new Customer({ 
//       name: req.body.name,
//       phone: req.body.phone,
//       isGold: req.body.isGold,
//     });
//   customer = await customer.save();
//   res.send(customer);
// });

// router.put("/:id", async (req, res) => {

//   const { error } = validateCustomer(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const customer = await Customer.findByIdAndUpdate(req.params.id, 
//     { 
//         name: req.body.name,
//         phone: req.body.phone,
//         isGold: req.body.isGold,
//     }, { new: true });

//   if (!customer)
//     return res.status(404).send("The customer with the given ID was not found");

//   res.send(customer);
// });

// router.delete("/:id", async (req, res) => {

//   const customer = await Customer.findByIdAndRemove(req.params.id);

//   if (!customer)
//     return res.status(404).send("The customer with the given ID  was not found");

//   res.send(customer);
// });

// function validateCustomer(customer) {
//   const schema = {
//     name: Joi.string().min(5).max(50).required(),
//     phone: Joi.string().min(5).max(50).required(),
//     isGold: Joi.boolean()
//   };
//   return Joi.validate(customer, schema);
// }

// module.exports = router;

// // 2nd
// const customer = require('../models/customer');

// the above customer model has two properties.
// one is Customer object and other is validate
// in order to reference, we have to code like this 
// await customer.Customer.find().sort('name');

// for better approach , is object resturcturing
const {Customer, validate} = require('../models/customer');
const mongoose = require('mongoose');
// const Joi = require("joi");
const express = require("express");
const router = express.Router();

// const Customer = mongoose.model('Customer', new mongoose.Schema ({
//   name: {
//     type: String,
//     required: true,
//     minlength: 5,
//     maxlength: 50
//   },
//   isGold: {
//       type: Boolean,
//       default: false
//   },
//   phone: {
//     type: String,
//     required: true,
//     minlength: 5,
//     maxlength: 50
//   },
// }));

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer)
    return res.status(404).send("The customer with the given ID was not found");
  res.send(customer);
});

router.post("/", async (req, res) => {
//   const { error } = validateCustomer(req.body);
    const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({ 
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold,
    });
  customer = await customer.save();
  res.send(customer);
});

router.put("/:id", async (req, res) => {

//   const { error } = validateCustomer(req.body);
    const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(req.params.id, 
    { 
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold,
    }, { new: true });

  if (!customer)
    return res.status(404).send("The customer with the given ID was not found");

  res.send(customer);
});

router.delete("/:id", async (req, res) => {

  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer)
    return res.status(404).send("The customer with the given ID  was not found");

  res.send(customer);
});

// function validateCustomer(customer) {
//   const schema = {
//     name: Joi.string().min(5).max(50).required(),
//     phone: Joi.string().min(5).max(50).required(),
//     isGold: Joi.boolean()
//   };
//   return Joi.validate(customer, schema);
// }

module.exports = router;