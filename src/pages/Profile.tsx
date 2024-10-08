import { Card, Typography, Layout } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store/store'

const { Content } = Layout

function ProfilePage () {
  const user = useSelector((state: RootState) => state.user.user)

  return (
    <Layout
      style={{ display: 'flex', justifyContent: 'center', marginTop: '50px',height:'650px' }}
    >
      <Content style={{ maxWidth: '600px', width: '100%',marginLeft:'250px' }}>
        <Card style={{ padding: '20px' }}>
            <div style={{ width: '70%', paddingLeft: '20px' }}>
              <Typography.Title
                level={4}
                style={{ textTransform: 'capitalize' }}
              >
                {user?.username}
              </Typography.Title>
              <Typography.Text type='secondary'>{user?.email}</Typography.Text>
            </div>
        </Card>
      </Content>
    </Layout>
  )
}

export default ProfilePage
