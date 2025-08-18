import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, Divider, Checkbox } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link2 } from "lucide-react";

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

  const onFinish = async (values: RegisterFormValues) => {
    setLoading(true);
    try {
      console.log("Register values:", values);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-auto flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-sm">
        {" "}
        {/* Small form width */}
        {/* Logo Section */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Link2 className="w-6 h-6 text-white" />
            </div>
          </div>
          <Title level={2} className="text-gray-900 text-center">
            Link Short
          </Title>
          <Text className="text-gray-600">
            Fill in your details to register
          </Text>
        </div>
       
          <Card className="shadow-xl border-0 rounded-2xl bg-white/95 w-[500px]">
            <div className="p-2">
              <Form
                form={form}
                name="register"
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
                size="large"
              >
                <Form.Item
                  label="Full Name"
                  name="fullName"
                  rules={[
                    { required: true, message: "Please enter your full name" },
                    { min: 2, message: "Name must be at least 2 characters" },
                    {
                      pattern: /^[a-zA-Z\s]+$/,
                      message: "Name can only contain letters and spaces",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="text-gray-400" />}
                    placeholder="Enter your full name"
                    className="rounded-xl h-10"
                  />
                </Form.Item>

                <Form.Item
                  label="Email Address"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your email address",
                    },
                    {
                      type: "email",
                      message: "Please enter a valid email address",
                    },
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
                    { required: true, message: "Please create a password" },
                    {
                      min: 8,
                      message: "Password must be at least 8 characters",
                    },
                    {
                      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                      message:
                        "Password must contain uppercase, lowercase, and numbers",
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="text-gray-400" />}
                    placeholder="Create your password"
                    className="rounded-xl h-10"
                  />
                </Form.Item>

                <Form.Item
                  label="Confirm Password"
                  name="confirmPassword"
                  dependencies={["password"]}
                  rules={[
                    { required: true, message: "Please confirm your password" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Passwords do not match")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="text-gray-400" />}
                    placeholder="Confirm your password"
                    className="rounded-xl h-10"
                  />
                </Form.Item>

             

                <Form.Item className="mb-3">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="w-full h-10 rounded-xl"
                  >
                    {loading ? "Creating account..." : "Create Account"}
                  </Button>
                </Form.Item>

                <div className="text-center mt-1">
                  <Text className="text-gray-600 text-sm">
                    Already have an account?{" "}
                    <a
                      href="#"
                      className="text-blue-600 font-semibold hover:underline"
                    >
                      Login
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
