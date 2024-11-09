const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');

// ユーザー一覧を取得
router.get('/', settingsController.getUsers);

// ユーザーを追加
router.post('/', settingsController.addUser);

// ユーザーを更新
router.put('/:id', settingsController.updateUser);

// ユーザーを削除
router.delete('/:id', settingsController.deleteUser);

module.exports = router;
