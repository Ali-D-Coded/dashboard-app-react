import { Button, Form, Input, Switch } from "antd";

import { useCreateShop } from "../../../hooks/shops/useShops";

function CreateSeller({ closeDrawer }) {
  const { mutate: createData } = useCreateShop();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const { username, shopName, email, password, contact, verified } = values;

    const data = {
      username,
      shopName,
      email,
      password,
      phone: contact,
      verified,
    };

    createData(data, {
      onError: (error, variables, context) => {
        console.log({ error, variables, context });
      },
      onSuccess: (data, variables, context) => {
        console.log({ data, variables, context });
        form.resetFields();
        closeDrawer();
      },
    });
  };

  return (
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
      <Form.Item label="Verified" name="verified" valuePropName="checked">
        <Switch className="bg-slate-300" />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" className="bg-blue-300">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default CreateSeller;
