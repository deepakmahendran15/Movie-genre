
// module.exports = function(err, req, res, next){
//     // Log the exeception
//   res.status(500).send('Something failed.');
// }

const winston = require('winston');

module.exports = function(err, req, res, next){
  winston.error(err.message, err); // first argument is message, second argument is meta data object. this err object is having lot of properties, and everything stored in the mongodb

  // following are different login levels 
  // error
  // warn
  // info
  // verbose
  // debug 
  // silly

  res.status(500).send('Something failed.');
}