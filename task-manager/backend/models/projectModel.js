const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  teamMembers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  deadline: { type: Date },
  // ... другие поля при необходимости
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
