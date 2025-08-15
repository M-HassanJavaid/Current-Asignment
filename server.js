const { json } = require('body-parser');
const express = require('express');
const app = express();

app.use(json())

app.get('/', (req, res) => {
    res.send('Hello From the server!')
})

let products = [];

// Add a product
app.post('/addProduct', (req, res) => {
    const product = req.body;

    if (products.find(p => p.id === product.id)) {
        return res.status(400).send({ message: 'Product with this ID already exists!' });
    }

    products.push(product);

    res.status(200).send({
        message: 'Product has been added successfully!',
        newProductsDetails: products
    });
});

// Get product by ID (from body)
app.post('/getProduct', (req, res) => {
    const { id } = req.body;
    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).send({ message: 'Product not found!' });
    }

    res.status(200).send(product);
});

// Edit product by ID (from body)
app.put('/editProduct', (req, res) => {
    const { id, ...updates } = req.body;
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).send({ message: 'Product not found!' });
    }

    products[index] = { ...products[index], ...updates };

    res.status(200).send({
        message: 'Product updated successfully!',
        updatedProduct: products[index]
    });
});

// Delete product by ID (from body)
app.delete('/deleteProduct', (req, res) => {
    const { id } = req.body;
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).send({ message: 'Product not found!' });
    }

    const deletedProduct = products.splice(index, 1);

    res.status(200).send({
        message: 'Product deleted successfully!',
    });
});

app.listen(900, () => {
    console.log('Server is running at http://localhost:900')
});
