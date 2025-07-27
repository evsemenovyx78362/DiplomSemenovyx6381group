import React, { useState } from "react";
import Header from "../components/Header";
import TaskCard from "../components/TaskCard";
import Modal from "../components/Modal";
import Spinner from "../components/Spinner";

const dummyTasks = [
  { id: 1, title: "Создать макет", description: "Проработать дизайн для лендинга", status: "В работе" },
  { id: 2, title: "Настроить API", description: "Связать фронт с бэком", status: "Ожидает" },
];

const ProjectBoardPage = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCardClick = (task) => {
    setSelectedTask(task);
  };

  const closeModal = () => {
    setSelectedTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Доска задач</h1>

        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dummyTasks.map((task) => (
              <TaskCard key={task.id} task={task} onClick={handleCardClick} />
            ))}
          </div>
        )}

        <Modal isOpen={!!selectedTask} onClose={closeModal}>
          {selectedTask && (
            <div>
              <h2 className="text-xl font-semibold mb-2">{selectedTask.title}</h2>
              <p className="text-gray-700 mb-4">{selectedTask.description}</p>
              <p className="text-sm text-gray-500">Статус: {selectedTask.status}</p>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default ProjectBoardPage;
