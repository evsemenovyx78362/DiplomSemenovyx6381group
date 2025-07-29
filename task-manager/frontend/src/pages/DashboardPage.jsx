import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects, reset } from '../features/projects/projectSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import ProjectList from '../components/ProjectList';
import Modal from '../components/Modal';
import { toast } from 'react-toastify';
import { createProject } from '../features/projects/projectSlice';

const DashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { projects, isLoading, isError, message } = useSelector(
    (state) => state.projects
  );
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState('');

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getProjects());

    return () => {
      dispatch(reset());
    };
  }, [navigate, isError, message, dispatch]);

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!projectName) {
      toast.error('Пожалуйста, введите название проекта');
      return;
    }
    dispatch(createProject({ name: projectName }));
    setProjectName('');
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Мои проекты</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          + Создать проект
        </button>
      </div>

      <ProjectList projects={projects} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">Новый проект</h2>
        <form onSubmit={handleCreateProject}>
          <div className="mb-4">
            <label htmlFor="projectName" className="block text-gray-700 font-bold mb-2">
              Название проекта
            </label>
            <input
              type="text"
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Создать
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DashboardPage;
