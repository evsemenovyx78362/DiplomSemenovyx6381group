const Task = require('../models/taskModel');
const Project = require('../models/projectModel');

// @desc    Создать новую задачу
// @route   POST /api/tasks
// @access  Private
exports.createTask = async (req, res) => {
  const { title, description, project } = req.body;

  if (!title || !project) {
    return res.status(400).json({ msg: 'Please provide a title and project ID' });
  }

  try {
    
    const projectExists = await Project.findById(project);
    if (!projectExists) {
        return res.status(404).json({ msg: 'Project not found' });
    }
    
    const isMember = projectExists.teamMembers.some(member => member.toString() === req.user.id);
    if (projectExists.owner.toString() !== req.user.id && !isMember) {
        return res.status(403).json({ msg: 'User not authorized for this project' });
    }

    const newTask = new Task({
      title,
      description,
      project,
      user: req.user.id, 
    });

    const task = await newTask.save();
    res.status(201).json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Получить все задачи для проекта
// @route   GET /api/tasks/:projectId
// @access  Private
exports.getTasksByProject = async (req, res) => {
  try {
    
    const project = await Project.findById(req.params.projectId);
    if (!project) {
        return res.status(404).json({ msg: 'Project not found' });
    }
    const isMember = project.teamMembers.some(member => member.toString() === req.user.id);
    if (project.owner.toString() !== req.user.id && !isMember) {
        return res.status(403).json({ msg: 'User not authorized for this project' });
    }

    const tasks = await Task.find({ project: req.params.projectId });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Обновить задачу (статус, название и т.д.)
// @route   PUT /api/tasks/:id
// @access  Private
exports.updateTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) {
        return res.status(404).json({ msg: 'Task not found' });
    }

   

    task = await Task.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Удалить задачу
// @route   DELETE /api/tasks/:id
// @access  Private
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
        return res.status(404).json({ msg: 'Task not found' });
    }

    
    const project = await Project.findById(task.project);
    if (task.user.toString() !== req.user.id && project.owner.toString() !== req.user.id) {
        return res.status(403).json({ msg: 'User not authorized to delete this task' });
    }
    
    await Task.findByIdAndDelete(req.params.id);

    res.json({ id: req.params.id, msg: 'Task removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
