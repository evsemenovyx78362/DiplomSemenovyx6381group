const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String }, // Добавляем поле description
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  status: { type: String, enum: ['To Do', 'In Progress', 'Done'], default: 'To Do' },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Добавляем поле user, чтобы знать, кто создал задачу
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
