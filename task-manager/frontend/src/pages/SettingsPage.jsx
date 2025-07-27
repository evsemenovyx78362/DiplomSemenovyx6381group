import React from "react";
import SettingsForm from "../components/SettingsForm";

const SettingsPage = () => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Настройки аккаунта</h1>
      <SettingsForm />
    </div>
  );
};

export default SettingsPage;
