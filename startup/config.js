const config = require('config');

module.exports = function() {

    // if (!config.get('jwtPrivateKey')) {
    //     console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    //     process.exit(1)
    // }

    // always throw error object, we will get stack trace.
    // if we throw error message with throw 'error', we wont get the stack trace error message.
  if (!config.get('jwtPrivateKey')) {
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
  }
}