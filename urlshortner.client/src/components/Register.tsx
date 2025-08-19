import React, { useState } from "react";
import { Form, Input, Button, Card, Typography } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const { Title, Text } = Typography;

interface RegisterFormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;

}

export function Register() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: RegisterFormValues) => {
    setLoading(true);
    try {

      const response = await axios.post("http://localhost:5295/api/User/register", {
        name: values.fullName,
        email: values.email,
        password: values.password,
      });

      console.log("Register success:", response.data);


      navigate("/login");
    } catch (error: any) {
      console.error("failed", error.response?.data || error.message);
      alert(error.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="shadow-xl border-0 rounded-2xl bg-white/95 w-[500px]">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Link2 className="w-6 h-6 text-white" />
            </div>
          </div>
          <Title level={2} className="text-gray-900">Signup</Title>
          <Text className="text-gray-600 text-sm">Sign up to create your account</Text>
        </div>

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
              { pattern: /^[a-zA-Z\s]+$/, message: "Only letters and spaces allowed" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter your full name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please create a password" },
              { min: 8, message: "At least 8 characters" },
              { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, message: "Must contain uppercase, lowercase & number" },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Create your password" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) return Promise.resolve();
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Confirm password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} className="w-full">
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </Form.Item>

          <div className="text-center">
            <Text>Already have an account? </Text>
            <Link to="/login" className="text-blue-600">Login</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}
