import React from 'react';

const SettingsForm = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <p>Здесь будет форма для изменения настроек пользователя.</p>
      {/* Пример полей */}
      <div className="mt-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Изменить пароль
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          type="password"
          placeholder="Новый пароль"
        />
      </div>
    </div>
  );
};

export default SettingsForm;