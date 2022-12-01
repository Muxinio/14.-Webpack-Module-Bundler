const Product = require('../models/product');
const Cart = require('../models/cart');


exports.getAllProducts = (req, res, next) => {
    const products = Product.findAll();
    res.render('index', { name: 'Usuario', prods: products, path: '/', pageTitle: 'Principal' });
};

exports.getProductDetail = (req, res, next) => {
    const products = Product.findById(req.params.prodId);
    res.render('product-detail', { prod: products[0], pageTitle: 'Detalle del Producto', path: '/', name: 'Usuario' });
}

exports.addToCart = (req, res, next) => {
    const addedProduct = Product.findById(req.body.id)[0];
    Cart.save(addedProduct);
    res.redirect('/cart');
}

exports.getCart = (req, res, next) => {
    res.render('cart', { cart: Cart.getCart(), pageTitle: 'Detalle de Compra', path: '/cart', name: 'Usuario' })
}

exports.deleteInCart = (req, res, next) => {
    Cart.delete(req.body.prodId);
    res.redirect('/cart');
}

exports.BuyInCart = (req, res, next) => {
    Cart.Buy(req.body.prodId);
    res.redirect('/cart2');
}