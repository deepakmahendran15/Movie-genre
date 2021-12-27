// const Joi = require('joi');
// const express = require('express');
// const app = express();

// app.use(express.json());

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
//         if (!genre) return res.status(404).send('The genre with the given id was not found');
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

//         if (!genre) return res.status(404).send('The genre with the given id was not found');

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
//         if (!genre) return res.status(404).send('The genre with the given id was not found');

//         const index = genres.indexOf(genre);
//         genres.splice(index, 1);

//         res.send()
//     })

//     const port = process.env.PORT || 3000;
//     app.listen(port, () => console.log(`Listening on port ${port}....`));

// 2nd
// const Joi = require("joi");
// const genres = require("./routes/genres");
// const express = require("express");
// const app = express();

// app.use(express.json());
// app.use('/api/genres', genres);

// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Listening on port ${port}....`));

// 3rd ( connecting to mongodb when application starts)
// const mongoose = require('mongoose');
// // const Joi = require("joi");
// const customers = require('./routes/customers');
// const genres = require("./routes/genres");
// const express = require("express");
// const app = express();

// mongoose.connect('mongodb://localhost/vidly')
//     .then(() => console.log('Connected to MongoDB...'))
//     .catch(err => console.error('Could not connect to MongoDB...'))

// app.use(express.json());
// app.use('/api/genres', genres);
// app.use('/api/customers', customers);

// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Listening on port ${port}....`));


//3rd
// require('express-async-errors');
// const winston = require('winston');
// require('winston-mongodb');
// const error = require('./middleware/error');
// const config = require('config');
// const mongoose = require('mongoose');
// const Joi = require("joi");
// Joi.objectId = require('joi-objectid')(Joi);
// const customers = require('./routes/customers');
// const genres = require("./routes/genres");
// const movies = require("./routes/movies");
// const rentals = require("./routes/rentals");
// const users = require('./routes/users');
// const auth = require('./routes/auth');
// const express = require("express");
// const app = express();

// // process.on('uncaughtException', (ex) => {
// //     // console.log('WE GOT AN UNCAUGHT EXCEPTION');
// //     winston.error(ex.message, ex);
// //     // zero is success, anything other than zero is failure.
// //     process.exit(1);
// // });

// // winston.handleExceptions( new winston.transports.File({ filename: 'uncaughtExceptions.log'}));

// // process.on('unhandledRejection', (ex) => {
// //     // console.log('WE GOT AN UNHANDLED REJECTION');
// //     winston.error(ex.message, ex);
// //     // zero is success, anything other than zero is failure.
// //     process.exit(1);
// // });

// winston.handleExceptions( new winston.transports.File({ filename: 'uncaughtExceptions.log'}));

// process.on('unhandledRejection', (ex) => {
//     throw ex;
// });


// winston.add(winston.transports.File, { filename: 'logfile.log'});
// // winston.add(winston.transports.MongoDB, { db: 'mongodb://localhost/vidly' });
// // if you want to store only error messages in the log
// // winston.add(winston.transports.MongoDB, { db: 'mongodb://localhost/vidly', level: 'error' });
// winston.add(winston.transports.MongoDB, { db: 'mongodb://localhost/vidly', level: 'info' });

// // throw new Error('Something failed during startup.');

// // assume this call to the remote database or http server of an asynchornous operation
// const p = Promise.reject(new Error('Something failed miserably!'));
// // p.then().catch()
// // here, we are not going to write catach, so we will get unhandled rejection.
// p.then(() => console.log('Done'));


// if (!config.get('jwtPrivateKey')) {
//     console.error('FATAL ERROR: jwtPrivateKey is not defined.');
//     // process is a global object using exit. here 0 is success other than 0 is error.
//     process.exit(1)
// }

// mongoose.connect('mongodb://127.0.0.1/vidly')
//     .then(() => console.log('Connected to MongoDB...'))
//     .catch(err => console.error('Could not connect to MongoDB...'))

// app.use(express.json());
// app.use('/api/genres', genres);
// // app.use('/api/customers', customers);
// // app.use('/api/movies', movies);
// // app.use('/api/rentals', rentals);
// // app.use('/api/users', users);
// // app.use('/api/auth', auth);

// // app.use(function(err, req, res, next) {
// //     // Log the exeception
// //     res.status(500).send("Something failed.");
// // })

// app.use(error); // we are not calling this function, simply passing reference to the function.

// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Listening on port ${port}....`));


// 4th
// const winston = require("winston");
// const express = require("express");
// const app = express();

// require("./startup/logging")();
// require("./startup/routes")(app);
// require("./startup/db")();
// require("./startup/config")();
// require("./startup/validation")();
// require("./startup/prod")(app);

// // const port = process.env.PORT || 3000;
// // app.listen(port, () =>
// //   winston.info(`Listening on port ${port}...`)

// const port = process.env.PORT || config.get("port");
// const server = app.listen(port, () =>
//   winston.info(`Listening on port ${port}...`)

// );

// module.exports = server;

// https://dwarak-vidly.herokuapp.com/ | https://git.heroku.com/dwarak-vidly.git

// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://Dwarak:<password>@cluster0.omgo8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// Replace <password> with the password for the Dwarak user. Replace myFirstDatabase with the name of the database that connections will use by default. Ensure any option params are URL encoded.
// mongodb+srv://Dwarak:Sairam1312@cluster0.omgo8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// mongodb+srv://Dwarak:Sairam1312@cluster0.omgo8.mongodb.net/vidly?retryWrites=true&w=majority

//5th

const winston = require("winston");
const express = require("express");
// const config = require("config");
const app = express();

require("./startup/logging")();
// require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

// const port = process.env.PORT || 3000;
// app.listen(port, () => winston.info(`Listening on port ${port}...`)

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`)

);

module.exports = server;