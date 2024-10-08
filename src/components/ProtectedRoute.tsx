import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import APP_URLS from '../utils/appurls';

 
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useSelector((state: RootState) => state.user.user);  

  if (!user) {
 
    return <Navigate to={APP_URLS.LOGIN} />;
  }

  return <>{children}</>;  
}

export default ProtectedRoute;
