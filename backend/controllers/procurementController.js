const Procurement = require('../models/procurement');

// 仕入れ一覧を取得
exports.getProcurements = async (req, res) => {
    try {
        const procurements = await Procurement.find();
        res.json(procurements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 仕入れを追加
exports.addProcurement = async (req, res) => {
    const procurement = new Procurement({
        supplierName: req.body.supplierName,
        contact: req.body.contact,
        address: req.body.address,
        productName: req.body.productName,
        quantity: req.body.quantity
    });

    try {
        const newProcurement = await procurement.save();
        res.status(201).json(newProcurement);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 仕入れを更新
exports.updateProcurement = async (req, res) => {
    try {
        const procurement = await Procurement.findById(req.params.id);
        if (!procurement) {
            return res.status(404).json({ message: '仕入れが見つかりません' });
        }

        procurement.supplierName = req.body.supplierName || procurement.supplierName;
        procurement.contact = req.body.contact || procurement.contact;
        procurement.address = req.body.address || procurement.address;
        procurement.productName = req.body.productName || procurement.productName;
        procurement.quantity = req.body.quantity || procurement.quantity;

        const updatedProcurement = await procurement.save();
        res.json(updatedProcurement);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 仕入れを削除
exports.deleteProcurement = async (req, res) => {
    try {
        const procurement = await Procurement.findById(req.params.id);
        if (!procurement) {
            return res.status(404).json({ message: '仕入れが見つかりません' });
        }

        await procurement.remove();
        res.json({ message: '仕入れが削除されました' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
