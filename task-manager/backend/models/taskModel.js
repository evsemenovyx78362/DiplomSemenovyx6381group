const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: { type: String, required: true },
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  status: { type: String, enum: ['To Do', 'In Progress', 'Done'], default: 'To Do' },
  // ... другие поля
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
