import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks, updateTask, reset, reorderTasks, createTask } from '../features/tasks/taskSlice'; // Импортируем createTask
import Spinner from '../components/Spinner';
import TaskCard from '../components/TaskCard';
import Modal from '../components/Modal'; // Импортируем Modal
import { toast } from 'react-toastify'; // Импортируем toast
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const columnsFromBackend = {
  'To Do': { name: 'К выполнению', items: [] },
  'In Progress': { name: 'В работе', items: [] },
  'Done': { name: 'Готово', items: [] },
};

const ProjectBoardPage = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const { tasks, isLoading, isError, message } = useSelector((state) => state.tasks);

  // Состояния для модального окна новой задачи
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');


  useEffect(() => {
    if (isError) {
        toast.error(message);
    }
    dispatch(getTasks(projectId));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, projectId, isError, message]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;

    // Если задача осталась в той же колонке
    if (source.droppableId === destination.droppableId) {
        // В рамках текущей реализации, без бэкенд-логики для порядка, мы просто ничего не делаем.
        return;
    }

    // Оптимистичное обновление UI
    const taskToMove = tasks.find(t => t._id === draggableId);
    if (!taskToMove) return; // Добавлена проверка, чтобы избежать ошибок, если задача не найдена

    const updatedTasks = tasks.map(t => t._id === draggableId ? {...t, status: destination.droppableId} : t);
    dispatch(reorderTasks(updatedTasks));

    // Отправка запроса на сервер для обновления статуса
    dispatch(updateTask({ _id: taskToMove._id, status: destination.droppableId }));
  };

  // Функция для обработки создания новой задачи
  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle) {
      toast.error('Пожалуйста, введите название задачи');
      return;
    }
    // Отправляем задачу на сервер, включая project ID
    dispatch(createTask({ title: newTaskTitle, description: newTaskDescription, project: projectId }));
    setNewTaskTitle('');
    setNewTaskDescription('');
    setIsAddTaskModalOpen(false);
    toast.success('Задача успешно создана!');
  };


  if (isLoading) return <Spinner />;

  // Распределяем задачи по колонкам
  const columns = { ...columnsFromBackend };
  columns['To Do'].items = tasks.filter(task => task.status === 'To Do');
  columns['In Progress'].items = tasks.filter(task => task.status === 'In Progress');
  columns['Done'].items = tasks.filter(task => task.status === 'Done');

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Доска задач</h1>
        {/* Кнопка "Добавить задачу" */}
        <button
          onClick={() => setIsAddTaskModalOpen(true)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          + Добавить задачу
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-5">
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.entries(columns).map(([columnId, column]) => {
            return (
              <Droppable droppableId={columnId} key={columnId}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`bg-gray-100 p-4 rounded-lg w-full ${snapshot.isDraggingOver ? 'bg-blue-100' : ''}`}
                  >
                    <h2 className="font-bold mb-4">{column.name}</h2>
                    {column.items.map((item, index) => (
                      <Draggable key={item._id} draggableId={item._id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`mb-4 ${snapshot.isDragging ? 'opacity-80' : ''}`}
                          >
                            <TaskCard task={item} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </DragDropContext>
      </div>

      {/* Модальное окно для добавления задачи */}
      <Modal isOpen={isAddTaskModalOpen} onClose={() => setIsAddTaskModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">Новая задача</h2>
        <form onSubmit={handleCreateTask}>
          <div className="mb-4">
            <label htmlFor="newTaskTitle" className="block text-gray-700 font-bold mb-2">
              Название задачи
            </label>
            <input
              type="text"
              id="newTaskTitle"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newTaskDescription" className="block text-gray-700 font-bold mb-2">
              Описание (необязательно)
            </label>
            <textarea
              id="newTaskDescription"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              rows="3"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setIsAddTaskModalOpen(false)}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Создать задачу
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProjectBoardPage;
