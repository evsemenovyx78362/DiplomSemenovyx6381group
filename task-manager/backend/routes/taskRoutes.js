const express = require('express');
const router = express.Router();
const { createTask, getTasksByProject, updateTask } = require('../controllers/taskController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, createTask);
router.get('/:projectId', auth, getTasksByProject);
router.put('/:id', auth, updateTask);

module.exports = router;
