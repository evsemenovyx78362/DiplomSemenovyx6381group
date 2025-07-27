const Project = require('../models/projectModel');

// 📌 Создать проект
exports.createProject = async (req, res) => {
  const { name, description, deadline, teamMembers } = req.body;
  try {
    const project = await new Project({
      name,
      description,
      deadline,
      teamMembers,
      owner: req.user.id
    }).save();

    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// 📌 Получить все проекты
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user.id }).populate('teamMembers', 'name email');
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// 📌 Получить проект по ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('owner', 'name email')
      .populate('teamMembers', 'name email');

    if (!project) return res.status(404).json({ msg: 'Project not found' });
    if (project.owner.toString() !== req.user.id)
      return res.status(403).json({ msg: 'Access denied' });

    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// 📌 Обновить проект
exports.updateProject = async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });
    if (project.owner.toString() !== req.user.id)
      return res.status(403).json({ msg: 'Access denied' });

    project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// 📌 Удалить проект
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });
    if (project.owner.toString() !== req.user.id)
      return res.status(403).json({ msg: 'Access denied' });

    await project.remove();
    res.json({ msg: 'Project removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
