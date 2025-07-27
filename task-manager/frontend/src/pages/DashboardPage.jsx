import React from "react";
import Sidebar from "../components/Sidebar";
import ProjectList from "../components/ProjectList";

const DashboardPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-4">Мои проекты</h1>
        <ProjectList />
      </main>
    </div>
  );
};

export default DashboardPage;
