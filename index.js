let mongoose = require('mongoose');
// This is where we serve our DB!
mongoose.connect(
    process.env.MONGODB_URI ||
    'mongodb://localhost/my-first-api'
);

let Product = require('./creature');

module.exports.Product = Product;
