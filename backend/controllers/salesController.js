const Sales = require('../models/sales');

// 販売一覧を取得
exports.getSales = async (req, res) => {
    try {
        const sales = await Sales.find();
        res.json(sales);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 販売を追加
exports.addSales = async (req, res) => {
    const sales = new Sales({
        productName: req.body.productName,
        quantity: req.body.quantity
    });

    try {
        const newSales = await sales.save();
        res.status(201).json(newSales);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 販売を更新
exports.updateSales = async (req, res) => {
    try {
        const sales = await Sales.findById(req.params.id);
        if (!sales) {
            return res.status(404).json({ message: '販売データが見つかりません' });
        }

        sales.productName = req.body.productName || sales.productName;
        sales.quantity = req.body.quantity || sales.quantity;

        const updatedSales = await sales.save();
        res.json(updatedSales);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 販売を削除
exports.deleteSales = async (req, res) => {
    try {
        const sales = await Sales.findById(req.params.id);
        if (!sales) {
            return res.status(404).json({ message: '販売データが見つかりません' });
        }

        await sales.remove();
        res.json({ message: '販売データが削除されました' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
