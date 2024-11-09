const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// 在庫レポートを取得
router.get('/stock', reportController.getStockReport);

// 売上レポートを取得
router.get('/sales', reportController.getSalesReport);

module.exports = router;
