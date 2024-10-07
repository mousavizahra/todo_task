 import { Avatar, Card, Typography, Layout } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';

const { Content } = Layout;

const ProfilePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <Layout style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <Content style={{ maxWidth: '600px', width: '100%' }}>
        <Card style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* Profile Icon / Avatar */}
            <div style={{ display: 'flex', justifyContent: 'center', width: '30%' }}>
              <Avatar
                size={100}
                src={'https://via.placeholder.com/150'}
                alt={user?.username}
              />
            </div>

            {/* Profile Details */}
            <div style={{ width: '70%', paddingLeft: '20px' }}>
              <Typography.Title level={4} style={{ textTransform: 'capitalize' }}>
                {user?.username}
              </Typography.Title>
              <Typography.Text type="secondary">
                {user?.email}
              </Typography.Text>
            </div>
          </div>
        </Card>
      </Content>
    </Layout>
  );
};

export default ProfilePage;
