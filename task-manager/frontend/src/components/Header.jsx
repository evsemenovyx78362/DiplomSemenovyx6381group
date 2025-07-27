import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Project Manager</Link>
        <nav className="space-x-4">
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/settings" className="hover:underline">Settings</Link>
          <Link to="/login" className="hover:underline">Logout</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
