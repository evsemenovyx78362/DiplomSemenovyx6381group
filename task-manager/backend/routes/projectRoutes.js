const express = require('express');
const router = express.Router();
const { createProject, getProjects, getProjectById, updateProject, deleteProject } = require('../controllers/projectController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, createProject);          // Создать проект
router.get('/', auth, getProjects);             // Получить все проекты
router.get('/:id', auth, getProjectById);       // Получить проект по ID
router.put('/:id', auth, updateProject);        // Обновить проект
router.delete('/:id', auth, deleteProject);     // Удалить проект

module.exports = router;
