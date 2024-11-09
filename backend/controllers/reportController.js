const Stock = require('../models/stock');
const Sales = require('../models/sales');

// 在庫レポートを生成
exports.getStockReport = async (req, res) => {
    try {
        const stocks = await Stock.find();
        res.json(stocks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 売上レポートを生成
exports.getSalesReport = async (req, res) => {
    try {
        const sales = await Sales.find();
        res.json(sales);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
