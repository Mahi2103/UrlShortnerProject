import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Divider, Checkbox, message, Progress } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone, MailOutlined, GoogleOutlined, GithubOutlined } from '@ant-design/icons';
import { Link2 } from 'lucide-react';

const { Title, Text } = Typography;

interface RegisterFormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

export function Register() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPasswordStrength(calculatePasswordStrength(password));
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 25) return '#ff4d4f';
    if (passwordStrength <= 50) return '#faad14';
    if (passwordStrength <= 75) return '#1890ff';
    return '#52c41a';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 25) return 'Weak';
    if (passwordStrength <= 50) return 'Fair';
    if (passwordStrength <= 75) return 'Good';
    return 'Strong';
  };

  const onFinish = async (values: RegisterFormValues) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      message.success('Account created successfully!');
      console.log('Register values:', values);
    } catch (error) {
      message.error('Registration failed. Please try again.');
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
            Create Account
          </Title>
          <Text className="text-gray-600">
            Join thousands of users shortening their links
          </Text>
        </div>

        <Card className="shadow-xl border-0 rounded-2xl">
          <Form
            form={form}
            name="register"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            size="large"
          >
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: 'Please input your full name!',
                },
                {
                  min: 2,
                  message: 'Name must be at least 2 characters!',
                },
                {
                  pattern: /^[a-zA-Z\s]+$/,
                  message: 'Name can only contain letters and spaces!',
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Enter your full name"
                className="rounded-lg"
              />
            </Form.Item>

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
                prefix={<MailOutlined className="text-gray-400" />}
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
                  min: 8,
                  message: 'Password must be at least 8 characters!',
                },
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                  message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number!',
                },
              ]}
            >
              <div>
                <Input.Password
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder="Create a strong password"
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  className="rounded-lg"
                  onChange={onPasswordChange}
                />
                {passwordStrength > 0 && (
                  <div className="mt-2">
                    <Progress
                      percent={passwordStrength}
                      strokeColor={getPasswordStrengthColor()}
                      showInfo={false}
                      size="small"
                    />
                    <Text className="text-xs" style={{ color: getPasswordStrengthColor() }}>
                      Password strength: {getPasswordStrengthText()}
                    </Text>
                  </div>
                )}
              </div>
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Confirm your password"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="terms"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('Please accept the terms and conditions!')),
                },
              ]}
            >
              <Checkbox>
                I agree to the{' '}
                <a className="text-blue-600 hover:text-blue-700">Terms of Service</a>
                {' '}and{' '}
                <a className="text-blue-600 hover:text-blue-700">Privacy Policy</a>
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 border-0 rounded-lg font-semibold text-base hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </Form.Item>

            <Divider className="!my-6">
              <Text className="text-gray-500">Or sign up with</Text>
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
                Already have an account?{' '}
                <a className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                  Sign in
                </a>
              </Text>
            </div>
          </Form>
        </Card>

        <div className="text-center mt-8">
          <Text className="text-gray-500 text-sm">
            By creating an account, you agree to our{' '}
            <a className="text-blue-600 hover:text-blue-700">Terms of Service</a>
            {' '}and{' '}
            <a className="text-blue-600 hover:text-blue-700">Privacy Policy</a>
          </Text>
        </div>
      </div>
    </div>
  );
}