import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { Link2 } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

export function Login() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string; remember: boolean }) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5295/api/User/login', {
        email: values.email,
        password: values.password
      });

      // Save token in localStorage
      localStorage.setItem('token', response.data.jwttoken);
      localStorage.setItem('userid', response.data.userid);

      message.success('Login successful!');

      // Redirect to URLShortener page
      navigate('/shorten');
    } catch (error: any) {
      console.error(error);
      if (error.response) {
        message.error(error.response.data || 'Login failed');
      } else {
        message.error('Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-auto flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Link2 className="w-6 h-6 text-white" />
            </div>
          </div>
          <Title level={2} className="text-gray-900 text-center">
            Welcome Back!
          </Title>
          <Text className="text-gray-600 text-sm">Sign in to continue to Link Short</Text>
        </div>

        <Card className="shadow-xl border-0 rounded-2xl bg-white/95 w-[500px]">
          <div className="p-2">
            <Form
              form={form}
              name="login"
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
              size="large"
            >
              <Form.Item
                label="Email Address"
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email address' },
                  { type: 'email', message: 'Please enter a valid email address' },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="text-gray-400" />}
                  placeholder="Enter your email"
                  className="rounded-xl h-10"
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: 'Please enter your password' },
                  { min: 6, message: 'Password must be at least 6 characters' },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder="Enter your password"
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  className="rounded-xl h-10"
                />
              </Form.Item>

              <Form.Item className="mb-4">
                <div className="flex items-center justify-between">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox className="text-gray-600 text-sm">Remember me</Checkbox>
                  </Form.Item>
                  <a className="text-blue-600 hover:text-blue-700 text-sm font-medium">Forgot password?</a>
                </div>
              </Form.Item>

              <Form.Item className="mb-4">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="w-full h-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 border-0 font-medium hover:from-blue-700 hover:to-indigo-700"
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </Form.Item>

              <div className="text-center mt-2 mb-4 text-sm">
                <Text className="text-gray-600">
                  New to Link Short?{' '}
                  <a href="/register" className="text-blue-600 font-semibold hover:underline">
                    Create Account
                  </a>
                </Text>
              </div>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  );
}
