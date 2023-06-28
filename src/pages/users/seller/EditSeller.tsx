import { Button, Form, Input, Switch, message } from "antd";
import { useGlobalState } from "../../../context/GlobalStateContext";
import { useEditShop } from "../../../hooks/shops/useShops";
// import userRou/ from "react-router-dom"

type EditSellerProps = {
  openEdit: boolean;
  closeDrawer: () => void;
};

function EditSeller({ openEdit,closeDrawer }: EditSellerProps) {
  const { editData } = useGlobalState();
  const { mutate: editSeller } = useEditShop();

  console.log({ editData });

  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    const data = {
      username: values.username,
      shopName: values.shopName,
      email: values.email,
      password: values.password,
      phone: values.contact,
      verified: values.verifed,
    };

    await editSeller(data, {
      onError(error) {
        message.error(`Something went wrong ${error}`);
      },
      onSuccess(data) {
        console.log({ data });
          form.resetFields();
        message.success("Seller updated successfully");
      },
    });

    console.log({ data });

    // createData(data, {
    //   onError(error, variables, context) {
    //     console.log({ error, variables, context });
    //   },
    //   onSuccess(data, variables, context) {
    //     console.log({ data, variables, context });
    //     form.resetFields();
    //     closeDrawer();
    //   },
    // });
  };

  // if (!openEdit) roou

  return (
    <div>
      <Form
        layout="vertical"
        onFinish={onFinish}
        form={form}
        initialValues={{
          username: editData.name,
          shopName: editData.action.Shop.shopName,
          email: editData.action.email,
          contact: editData.phone,
          verifed: editData.action.verified,
        }}
      >
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

        {/* <Form.Item
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
        </Form.Item> */}
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

export default EditSeller;
