import React from 'react';
import { Link } from 'react-router-dom';

const ProjectList = ({ projects }) => {
  if (projects.length === 0) {
    return (
      <div className="text-center p-10 bg-white rounded-lg shadow-md">
        <h2 className="text-xl text-gray-500">У вас пока нет проектов.</h2>
        <p className="text-gray-400 mt-2">Нажмите "Создать проект", чтобы начать работу.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Link
          key={project._id}
          to={`/project/${project._id}`}
          className="block bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <h3 className="text-xl font-bold text-blue-700">{project.name}</h3>
          <p className="text-gray-600 mt-2">{project.description || 'Нет описания'}</p>
        </Link>
      ))}
    </div>
  );
};

export default ProjectList;
