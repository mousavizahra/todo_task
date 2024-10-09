import { useState } from 'react';
import { Input, Button, Form, Typography, message, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slice/user';
import { RootState } from '../redux/store/store';
import texts from '../utils/texts';
import APP_URLS from '../utils/appurls';

const { Title } = Typography;

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state: RootState) => state.user.users);

  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  /**
    login button click
   */
  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(login({ username }));
      message.success(`Welcome back, ${username}!`);
      navigate(APP_URLS.TODOS);
    }
  };

  /**
   validate the form
   */
  const validateForm = (): boolean => {
    const newErrors = { ...errors };

    // Validate username
    if (username.trim().length < 3) {
      newErrors.username = texts.error_username;
    } else if (!users.some((user) => user.username === username.trim())) {
      newErrors.username = texts.error_username_doesnot_exist;
    } else {
      delete newErrors.username;
    }

    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };

  return (
    <div style={{ maxWidth: '500px',  margin:'70px auto',padding:'20px', backgroundColor:'#e0e0e0',height:'500px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%', textAlign: 'center'}}>
        <Title level={3}>Login Here</Title>

        <Form layout="vertical">
          <Form.Item
            label="User Name"
            validateStatus={errors.username ? 'error' : ''}
            help={errors.username}
          >
            <Input
              placeholder="Enter your username"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block onClick={handleLogin}>
              Login
            </Button>
          </Form.Item>
        </Form>

        <Button type="link" block>
          <Link to={APP_URLS.SIGNUP}>Click here to Sign Up</Link>
        </Button>
      </Space>
    </div>
  );
}

export default Login;
