import React from "react";

const TaskCard = ({ task, onClick }) => {
  return (
    <div
      className="bg-white shadow p-4 rounded-md cursor-pointer hover:bg-gray-50 transition"
      onClick={() => onClick(task)}
    >
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
      <div className="text-xs text-gray-400 mt-2">Статус: {task.status}</div>
    </div>
  );
};

export default TaskCard;
