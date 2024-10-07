import { Form, Input, Button, Typography } from 'antd';

const { Title, Link } = Typography;

const SignUpForm = () => {
//   const onFinish = (values) => {
//     console.log('Form values:', values);
//   };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#111' }}>
      <div style={{ width: 300, padding: 20, backgroundColor: '#222', borderRadius: 10 }}>
        <Title level={3} style={{ color: '#fff', textAlign: 'center' }}>Sign up </Title>
        <Form
          name="signup_form"
        //   onFinish={onFinish}
          style={{ marginTop: 20 }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="User Name" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email address!' },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Sign up
            </Button>
          </Form.Item>

          <Form.Item>
            <Link href="#" style={{ color: 'red', textAlign: 'center', display: 'block' }}>
              Click here to Login
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignUpForm;
