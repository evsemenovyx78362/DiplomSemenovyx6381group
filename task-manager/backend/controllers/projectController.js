const Project = require('../models/projectModel');
const Task = require('../models/taskModel');

// 📌 Создать проект
exports.createProject = async(req, res) => {
    const { name, description, deadline, teamMembers } = req.body;
    try {
        const project = await new Project({
            name,
            description,
            deadline,
            teamMembers,
            owner: req.user.id
        }).save();

        res.status(201).json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// 📌 Получить все проекты
exports.getProjects = async(req, res) => {
    try {
        // Находим проекты, где текущий пользователь является владельцем или участником
        const projects = await Project.find({
            $or: [{ owner: req.user.id }, { teamMembers: req.user.id }],
        }).populate('teamMembers', 'name email').populate('owner', 'name email');
        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// 📌 Получить проект по ID
exports.getProjectById = async(req, res) => {
    try {
        const project = await Project.findById(req.params.id)
            .populate('owner', 'name email')
            .populate('teamMembers', 'name email');

        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        // Проверяем, является ли пользователь владельцем или участником проекта
        const isMember = project.teamMembers.some(member => member._id.toString() === req.user.id);
        const isOwner = project.owner._id.toString() === req.user.id;

        if (!isMember && !isOwner) {
            return res.status(403).json({ msg: 'Access denied' });
        }

        res.json(project);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Project not found' });
        }
        res.status(500).send('Server Error');
    }
};

// 📌 Обновить проект
exports.updateProject = async(req, res) => {
    try {
        let project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ msg: 'Project not found' });

        // Только владелец может обновлять проект
        if (project.owner.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Access denied. Only the owner can update the project.' });
        }

        project = await Project.findByIdAndUpdate(
            req.params.id, { $set: req.body }, { new: true }
        ).populate('teamMembers', 'name email').populate('owner', 'name email');

        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// 📌 Удалить проект
exports.deleteProject = async(req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        // Только владелец может удалить проект
        if (project.owner.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Access denied. Only the owner can delete the project.' });
        }

        // Удаляем все задачи, связанные с этим проектом
        await Task.deleteMany({ project: req.params.id });

        // Удаляем сам проект
        await Project.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Project and all associated tasks removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};