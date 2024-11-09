const mongoose = require('mongoose');

const procurementSchema = new mongoose.Schema({
    supplierName: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Procurement = mongoose.model('Procurement', procurementSchema);

module.exports = Procurement;
