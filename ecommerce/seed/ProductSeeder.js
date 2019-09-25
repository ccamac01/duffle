var Product = require('../models/product');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true });


var products = 
    [
        new Product({
            imagePath: 'https://target.scene7.com/is/image/Target/GUEST_9890f880-20fc-4f94-b325-c1c6875327ad?wid=488&hei=488&fmt=pjpeg',
            title: 'Flamin Hot Cheetos',
            description: 'Flamin HOT',
            price: 2
        }),
        new Product({
            imagePath: 'https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fconsidertheproduct.com%2Fwp-content%2Fuploads%2F2016%2F03%2Ftakis-fuego-1.jpg&f=1&nofb=1',
            title: 'Takis',
            description: 'Fuego',
            price: 5
        }),
        new Product({
            imagePath: 'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Ftarget.scene7.com%2Fis%2Fimage%2FTarget%2FGUEST_987e7eaf-7ba8-4e24-b01d-702f24a113cc%3Fwid%3D488%26hei%3D488%26fmt%3Dpjpeg&f=1&nofb=1',
            title: 'Munchies',
            description: 'Snack Mix',
            price: 3
        }),
];




let productUpload = async (products) => {
    products.forEach(product => {
        product.save(); // mongoose automatically saves to MongoDB
    });
}

productUpload(products)
    .then(() => {
        console.log(`Successfully uploaded products to DB, now disconnecting!\n`);
        // mongoose.disconnect();
    })
    .catch(err => console.log(err));