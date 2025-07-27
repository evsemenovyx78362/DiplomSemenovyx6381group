const express = require('express');
const router = express.Router();
const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

router.post('/', createUser);               // Регистрация пользователя (без auth, если открыта)
router.get('/', auth, getUsers);            // Получить всех пользователей
router.get('/:id', auth, getUserById);      // Получить пользователя по ID
router.put('/:id', auth, updateUser);       // Обновить пользователя
router.delete('/:id', auth, deleteUser);    // Удалить пользователя

module.exports = router;
