import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { user } = useSelector((state) => state.auth);

  // Если пользователь залогинен, показываем дочерний компонент (страницу),
  // иначе перенаправляем на страницу входа.
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;