const express = require('express');
const router = express.Router();
const procurementController = require('../controllers/procurementController');

// 仕入れ一覧を取得
router.get('/', procurementController.getProcurements);

// 仕入れを追加
router.post('/', procurementController.addProcurement);

// 仕入れを更新
router.put('/:id', procurementController.updateProcurement);

// 仕入れを削除
router.delete('/:id', procurementController.deleteProcurement);

module.exports = router;
