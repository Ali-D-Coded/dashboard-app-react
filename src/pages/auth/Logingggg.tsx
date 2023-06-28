import { Button, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import  { APIClient } from "../../utils/axios";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

function Login() {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);
    try {
      const data = {
        email: values.email,
        password: values.password,
      };
      const res = await APIClient.post("/auth/local/admin/login", data);
      if (
        signIn({
          token: res.data.tokens.access_token,
          expiresIn: 360000,
          tokenType: "Bearer",
          authState: res.data.user,
          //   refreshToken: res.data.tokens.refresh_token, // Only if you are using refreshToken feature
          //   refreshTokenExpireIn: 360000, // Only if you are using refreshToken feature
        })
      ) {
        // Redirect or do-something
        navigate("/");
      }
    } catch (error) {
      message.error("Something went wrong");
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-blue-800">
      <div className="w-[300px] bg-white">
        <Form
          name="normal_login"
          className="login-form "
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
