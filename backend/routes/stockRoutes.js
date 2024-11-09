const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

// 商品一覧を取得
router.get('/', stockController.getStocks);

// 商品を追加
router.post('/', stockController.addStock);

// 商品を更新
router.put('/:id', stockController.updateStock);

// 商品を削除
router.delete('/:id', stockController.deleteStock);

module.exports = router;
