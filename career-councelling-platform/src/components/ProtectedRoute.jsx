import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  console.log('ProtectedRoute - User:', user); // Debug log

  return user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;