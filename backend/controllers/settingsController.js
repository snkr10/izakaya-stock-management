const User = require('../models/user');

// ユーザー一覧を取得
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ユーザーを追加
exports.addUser = async (req, res) => {
    const user = new User({
        userName: req.body.userName,
        role: req.body.role
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// ユーザーを更新
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'ユーザーが見つかりません' });
        }

        user.userName = req.body.userName || user.userName;
        user.role = req.body.role || user.role;

        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// ユーザーを削除
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'ユーザーが見つかりません' });
        }

        await user.remove();
        res.json({ message: 'ユーザーが削除されました' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
