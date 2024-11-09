const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    saleDate: {
        type: Date,
        default: Date.now
    }
});

const Sales = mongoose.model('Sales', salesSchema);

module.exports = Sales;
