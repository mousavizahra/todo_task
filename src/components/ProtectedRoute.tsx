import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import APP_URLS from '../utils/appurls';

// A protected route wrapper component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = useSelector((state: RootState) => state.user.user); // Get current user from Redux store

  if (!user) {
    // If user is not logged in, redirect to login page
    return <Navigate to={APP_URLS.LOGIN} />;
  }

  return <>{children}</>; // Render children if user is authenticated
};

export default ProtectedRoute;
