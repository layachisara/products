/** This is our server file! Where the magic happens. **/

// require express, for routing, and body parser, for form parsing
let express = require('express'),
    bodyParser = require('body-parser');

// connect to db models
let db = require('./models');

// make a new express app named "app".
let app = express();

// Body parser and encoding setup.
app.use(bodyParser.urlencoded({
    extended: true
}));

// get all
app.get('/api/products', (req, res) => {
  db.Product.find((err, allProducts) => {
    if (err) {
      console.log(`index error: ${err}`);
    } else {
      res.json({
        products: allProducts
      });
    }
  });
});

// get one
app.get('/api/products/:id', (req, res) => {
  db.Product.findOne({
    _id: req.params.id
  }, (err, product) => {
    if (err) {
      console.log(`show error: ${err}`);
    }
    res.json(product);
  });
});

// create new
app.post('/api/products', (req, res) => {
  let newProducts = new db.Product(req.body);
  newProducts.save((err, product) => {
    if (err) {
      console.log(`save error: ${err}`);
    }
    console.log(`saved new product: ${product.name}`);
    res.json(product);
  });
});

// delete one
app.delete('/api/products/:id', (req, res) => {
  let productId = req.params.id;
  db.Product.findOneAndRemove({
    _id: productId
  })
  .populate('product')
  .exec((err, deletedProducts) => {
    res.json(deletedProducts);
  });
});

// update one
app.put('/api/products/:id', (req, res) => {
  let productId = req.params.id;
  db.Product.findOne({
    _id: productId
  }, (err, foundProducts) => {
    if (err) {
      console.log('cound not find the product.')
    }
    foundProducts.name = req.body.name || foundProducts.name;
    foundProducts.type = req.body.type || foundProducts.type;
    foundProducts.price = req.body.price || foundProducts.price;
    foundProducts.quantity = req.body.quantity || foundProducts.quantity;
    foundProducts.imageUrl = req.body.imageUrl || foundProducts.imageUrl;
    console.log(`updating: ${foundProducts.name}`);
    //save it
    foundProducts.save((err, product) => {
      if (err) {
        console.log(`update error: ${err}`);
      }
      console.log(`updated: ${product.name}`);
      res.json(product);
    });
  });
});

// This is where we serve our API!
app.listen(process.env.PORT || 7000, () => {
    console.log('Your First API is running on http://localhost:7000/');
});
