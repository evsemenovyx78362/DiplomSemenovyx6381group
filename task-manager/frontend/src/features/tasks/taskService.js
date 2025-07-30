import axios from 'axios';

const API_URL = '/api/tasks/';

// Получить задачи для проекта
const getTasks = async (projectId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + projectId, config);
  return response.data;
};

// Обновить задачу
const updateTask = async (taskData, token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.put(API_URL + taskData._id, taskData, config);
    return response.data;
}

// Создать новую задачу
const createTask = async (taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, taskData, config); // Отправляем данные новой задачи
  return response.data;
};


const taskService = {
  getTasks,
  updateTask,
  createTask, // Добавляем новую функцию
};

export default taskService;

