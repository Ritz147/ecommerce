const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const { validateProduct, isLoggedIn, isSeller, isAuthor } = require('../middlewares');

router.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        console.log(req.session);
        res.render('products/index', { products });
    } 
    catch (e) {
        res.render('err', {err:e.message});
    }

});

router.get('/products/new', isLoggedIn, isSeller, (req, res) => {
    res.render('products/new');
});

router.post('/products',isLoggedIn, isSeller, validateProduct, async (req, res) => {
    try {
        const { name, image, price, desc } = req.body;
        await Product.create({ name, image, price, desc, author:req.user._id });

        req.flash('success', 'Successfully added your product!');
        res.redirect('/products');
    } 
    catch (e) {
        res.render('err', {err:e.message});
    }
});

router.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate('reviews');

    res.render('products/show', { product });
});

router.get('/products/:id/edit', isLoggedIn, isSeller, isAuthor, async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);

    res.render('products/edit', { product });
});

router.patch('/products/:id',isLoggedIn, isSeller, validateProduct, async (req, res) => {
    const { id } = req.params;
    const { name, image, price, desc } = req.body;

    await Product.findByIdAndUpdate(id, { name, image, price, desc });

    req.flash('success', 'Changes saved!');
    res.redirect(`/products/${id}`);
});

router.delete('/products/:id', isLoggedIn, isSeller, isAuthor, async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);

    req.flash('success', 'Successfully deleted your product!');
    res.redirect('/products');
});


module.exports = router;