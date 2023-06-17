import { Button, Checkbox, Form, Input, Switch } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import React from "react";
import { useCreateShop } from "../../../hooks/shops/useShops";
import { useNavigate } from "react-router-dom";

function CreateSeller({ closeDrawer }: any) {
  const { mutate: createData } = useCreateShop();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    const data = {
      username: values.username,
      shopName: values.shopName,
      email: values.email,
      password: values.password,
      phone: values.contact,
      verified: values.verifed,
    };

    createData(data, {
      onError(error, variables, context) {
        console.log({ error, variables, context });
      },
      onSuccess(data, variables, context) {
        console.log({ data, variables, context });
        form.resetFields();
        closeDrawer();
      },
    });
  };
  return (
    <div>
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item label="Username" name="username">
          <Input />
        </Form.Item>
        <Form.Item label="Shop Name" name="shopName">
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
            },
            {
              required: true,
            },
          ]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
            },
            {
              min: 6,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Contact"
          name="contact"
          rules={[
            {
              type: "string",
            },
            {
              required: true,
            },
            {
              len: 10,
            },
          ]}
        >
          <Input type="tel" maxLength={10} />
        </Form.Item>
        <Form.Item label="Verfied" name="verifed" valuePropName="checked">
          <Switch className="bg-slate-300" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" className="bg-blue-300">
            submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateSeller;
