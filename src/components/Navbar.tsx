import { Layout, Menu, Typography } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slice/user';
import { RootState } from '../redux/store/store';
import APP_URLS from '../utils/appurls';

const { Header } = Layout;
const { Text } = Typography;

function Navbar() {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Layout>
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         
        <div>
          {user ? (
            <Menu theme="dark" mode="horizontal" selectable={false}>
              <Menu.Item key="todos">
                <Link to={APP_URLS.TODOS}>To do's</Link>
              </Menu.Item>
            </Menu>
          ) : (
            <Text style={{ color: '#fff', fontSize: '18px', textAlign: 'center' }}>
              Welcome to To Do's App
            </Text>
          )}
        </div>

 
        {user && (
          <Menu theme="dark" mode="horizontal" selectable={false} style={{ marginLeft: 'auto' }}>
            <Menu.Item key="profile">
              <Link to="/profile">Profile</Link>
            </Menu.Item>
            <Menu.Item key="logout" onClick={handleLogout}>
              Log out
            </Menu.Item>
          </Menu>
        )}
      </Header>
 
      <Outlet />
    </Layout>
  );
}

export default Navbar;
