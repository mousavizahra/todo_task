import { useState, SetStateAction } from 'react';
import { Form, Input, Button, Typography, Card } from 'antd';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../redux/slice/user';
import texts from '../utils/texts';
import APP_URLS from '../utils/appurls';

const { Title } = Typography;

function SignupForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  // Error state for validation
  const [errors, setErrors] = useState<Record<string, string>>({});

  /**
   Validate the form data
   */
  const validateForm = (): boolean => {
    const newErrors = { ...errors };

    // Validate username
    if (username.trim().length < 3) {
      newErrors.username = texts.error_signup_username;
    } else {
      delete newErrors.username;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = texts.error_signup_valid_emailId;
    } else {
      delete newErrors.email;
    }

    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };

  /**
   handle the form submit button click
   */
  const handleSubmit = () => {
    if (validateForm()) {
      dispatch(signup({ username, email }));
      navigate(APP_URLS.TODOS, { state: { fromSignup: true } });
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBlock:'50px',height:'600px' }}>
      <Card style={{ width: 400 }}>
        <Title level={3} style={{ textAlign: 'center' }}>
          Sign up here..
        </Title>

        <Form layout="vertical" onFinish={handleSubmit} noValidate>
          {/* Username Field */}
          <Form.Item
            label="User Name"
            validateStatus={errors.username ? 'error' : ''}
            help={errors.username}
          >
            <Input
              value={username}
              onChange={(e: { target: { value: SetStateAction<string> } }) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </Form.Item>

          {/* Email Field */}
          <Form.Item
            label="Email"
            validateStatus={errors.email ? 'error' : ''}
            help={errors.email}
          >
            <Input
              value={email}
              onChange={(e: { target: { value: SetStateAction<string> } }) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Sign up
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <Button type="link">
            <Link to={APP_URLS.LOGIN}>Click here to Login</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default SignupForm;
