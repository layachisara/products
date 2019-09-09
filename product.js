// set up mongoose
let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let ProductSchema = new Schema({
  // list model properties
  name: String,
  type: String,
  price: Number,
  quantity: Number,
  imageUrl: String,
});

let Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
