const Stock = require('../models/stock');

// 商品の一覧を取得
exports.getStocks = async (req, res) => {
    try {
        const stocks = await Stock.find();
        res.json(stocks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 商品を追加
exports.addStock = async (req, res) => {
    const stock = new Stock({
        productName: req.body.productName,
        category: req.body.category,
        stock: req.body.stock
    });

    try {
        const newStock = await stock.save();
        res.status(201).json(newStock);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 商品を更新
exports.updateStock = async (req, res) => {
    try {
        const stock = await Stock.findById(req.params.id);
        if (!stock) {
            return res.status(404).json({ message: '商品が見つかりません' });
        }

        stock.productName = req.body.productName || stock.productName;
        stock.category = req.body.category || stock.category;
        stock.stock = req.body.stock || stock.stock;

        const updatedStock = await stock.save();
        res.json(updatedStock);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 商品を削除
exports.deleteStock = async (req, res) => {
    try {
        const stock = await Stock.findById(req.params.id);
        if (!stock) {
            return res.status(404).json({ message: '商品が見つかりません' });
        }

        await stock.remove();
        res.json({ message: '商品が削除されました' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
