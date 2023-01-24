const path = require('path');
const MongoClient = require('mongodb').MongoClient;

const express = require('express');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct);

//admin/total
// router.get('/total', isAuth, adminController.getTotal);

// /admin/products => GET
router.get('/products', isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', isAuth, adminController.postAddProduct);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product', isAuth, adminController.postEditProduct);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

router.get('/total', (req, res) =>{
    const uri = 'mongodb+srv://david:password4pf@cluster0.cmgywnj.mongodb.net/test';
    
    const client = new MongoClient(uri, {useUnifiedTopology: true, useNewUrlParser: true });
    client.connect(err => {
      const collection = client.db("test").collection("products");
      collection.countDocuments({}, (err, count) => {
        res.render('total', { count: count });
        client.close();
      });
    });
    
    
});

module.exports = router;
