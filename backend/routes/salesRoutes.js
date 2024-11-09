const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

// 販売一覧を取得
router.get('/', salesController.getSales);

// 販売を追加
router.post('/', salesController.addSales);

// 販売を更新
router.put('/:id', salesController.updateSales);

// 販売を削除
router.delete('/:id', salesController.deleteSales);

module.exports = router;
