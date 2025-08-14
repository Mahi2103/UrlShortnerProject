import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Divider, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone, GoogleOutlined, GithubOutlined } from '@ant-design/icons';
import { Link2 } from 'lucide-react';

const { Title, Text } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

export function Login() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      message.success('Login successful!');
      console.log('Login values:', values);
    } catch (error) {
      message.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error('Please check your input and try again.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Link2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">LinkShort</span>
          </div>
          <Title level={2} className="!mb-2 !text-gray-900">
            Welcome Back
          </Title>
          <Text className="text-gray-600">
            Sign in to your account to continue
          </Text>
        </div>

        <Card className="shadow-xl border-0 rounded-2xl">
          <Form
            form={form}
            name="login"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            size="large"
          >
            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
                {
                  type: 'email',
                  message: 'Please enter a valid email address!',
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Enter your email"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  min: 6,
                  message: 'Password must be at least 6 characters!',
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Enter your password"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item>
              <div className="flex items-center justify-between">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a className="text-blue-600 hover:text-blue-700 transition-colors duration-200">
                  Forgot password?
                </a>
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 border-0 rounded-lg font-semibold text-base hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </Form.Item>

            <Divider className="!my-6">
              <Text className="text-gray-500">Or continue with</Text>
            </Divider>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <Button
                icon={<GoogleOutlined />}
                className="h-12 rounded-lg border-gray-300 hover:border-blue-400 hover:text-blue-600 transition-all duration-200"
              >
                Google
              </Button>
              <Button
                icon={<GithubOutlined />}
                className="h-12 rounded-lg border-gray-300 hover:border-gray-600 hover:text-gray-800 transition-all duration-200"
              >
                GitHub
              </Button>
            </div>

            <div className="text-center">
              <Text className="text-gray-600">
                Don't have an account?{' '}
                <a className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                  Sign up
                </a>
              </Text>
            </div>
          </Form>
        </Card>

        <div className="text-center mt-8">
          <Text className="text-gray-500 text-sm">
            By signing in, you agree to our{' '}
            <a className="text-blue-600 hover:text-blue-700">Terms of Service</a>
            {' '}and{' '}
            <a className="text-blue-600 hover:text-blue-700">Privacy Policy</a>
          </Text>
        </div>
      </div>
    </div>
  );
}