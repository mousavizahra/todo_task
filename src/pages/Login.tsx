import { SetStateAction, useState } from 'react';
import { Input, Button, Form, Typography, message, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slice/user';
import { RootState } from '../redux/store/store';
import texts from '../utils/texts';
import APP_URLS from '../utils/appurls';

const { Title } = Typography;

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state: RootState) => state.user.users);

  const [username, setUsername] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [errors, setErrors] = useState<any>({});

  /**
   * To handle login button click
   * @param e 
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLogin = (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(login({ username }));
      message.success(`Welcome back, ${username}!`);
      navigate(APP_URLS.TODOS);
    }
  };

  /**
   * To validate the form
   * @returns boolean
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
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%', textAlign: 'center' }}>
        <Title level={3}>Login here..</Title>

        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            label="User Name"
            validateStatus={errors.username ? 'error' : ''}
            help={errors.username}
          >
            <Input
              placeholder="Enter your username"
              value={username}
              onChange={(e: { target: { value: SetStateAction<string>; }; }) => setUsername(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
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
};

export default Login;
