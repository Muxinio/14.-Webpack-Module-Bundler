const Product = require('../models/product');

exports.getProductForm = (req, res, next) => {
    res.render('add-product', { name: 'Admin', path: '/admin/add-product', pageTitle: 'Agregar Producto' });
}

exports.postProduct = (req, res, next) => {
    const id = req.body.id;
    const title = req.body.title;
    const imageUrl = req.body.imageURL;
    const price = req.body.price;
    const description = req.body.description;

    const prod = new Product(id, title, price, imageUrl, description);
    prod.save();
    console.log('Info Producto:',req.body); // <<<<< muestra la info en consola
    res.redirect('/');
}

exports.editProductPage = (req, res, next) => {
    const products = Product.findById(req.params.prodId);
    res.render('edit-product', { product: products[0], path: '/', pageTitle: 'Editar Producto', name: 'Admin' });
}

exports.editProductPost = (req, res, next) => {
    const updatedProduct = new Product(req.body.id, req.body.title, req.body.price, req.body.imageURL, req.body.description);
    updatedProduct.update();
    // res.redirect('/');
    res.redirect('/products/' + updatedProduct.id);
    console.log('Producto Editado : ',updatedProduct);
}

exports.deleteProduct = (req, res, next) => {
    Product.deleteById(req.body.id);
    console.log('Producto eliminado',req.body);
    res.redirect('/');
}