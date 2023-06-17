import React, { useState } from "react";
import { useGetAllShops } from "../../../hooks/shops/useShops";
import Table, { ColumnsType } from "antd/es/table";
import { Avatar, Button, Drawer, Tag } from "antd";
import CreateSeller from "./CreateSeller";
import EditSeller from "./EditSeller";

interface DataType {
  key: React.Key;
  name: string | null;
  phone: string | null;
  address: string | null;
  email: string | null;
  referalCode: string | null;
  images: [] | null;
  blocked?: boolean;
  adminApproved?: boolean;
  action: any;
}

function Seller() {
  const { data: shops, isLoading, isSuccess, isError } = useGetAllShops();
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const showEditDrawer = (v: any) => {
    setOpenEdit(true);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Full Name",
      width: 100,
      dataIndex: "name",
      key: "name",
      // fixed: "left",
    },
    {
      title: "Images",
      dataIndex: "images",
      key: "images",
      width: 150,
      render: (i: any) => (
        <Avatar.Group>
          {i?.map((it: any, index: number) => (
            <Avatar key={index} src={it.url} />
          ))}
        </Avatar.Group>
      ),
    },
    {
      title: "Phone",
      width: 110,
      dataIndex: "phone",
      key: "phone",
      // fixed: "left",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 150,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 150,
      render: (i) => (
        <div>
          {i?.map((it: any) => (
            <div key={it.id}>{it.address}</div>
          ))}
        </div>
      ),
    },
    {
      title: "Referal Code",
      dataIndex: "referalCode",
      key: "referalCode",
      width: 150,
    },
    {
      title: "Status",
      dataIndex: "blocked",
      key: "blocked",
      fixed: "right",
      width: 100,
      render: (i) => (
        <div>
          {!i ? (
            <Tag color="green">Active</Tag>
          ) : (
            <Tag color="red">Blocked</Tag>
          )}
        </div>
      ),
    },
    {
      title: "Admin Approved",
      dataIndex: "adminApproved",
      key: "adminApproved",
      fixed: "right",
      width: 150,
      render: (i) => (
        <div>
          {i ? (
            <Tag color="green">Approved</Tag>
          ) : (
            <Tag color="yellow">Pending</Tag>
          )}
        </div>
      ),
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (i) => (
        <Button onClick={() => showEditDrawer(i)} className="bg-orange-400">
          Edit
        </Button>
      ),
    },
  ];

  const data: DataType[] = [];
  if (isSuccess) {
    for (let i = 0; i < shops.data?.length; i++) {
      data.push({
        key: shops.data[i].id,
        name: shops.data[i].Shop?.shopName,
        phone: shops.data[i].Shop?.shopContact,
        address: shops.data[i]?.Shop?.shopAddress,
        email: shops.data[i].Shop?.shopEmail,
        images: shops.data[i]?.image,
        referalCode: shops.data[i]?.referalCode,
        blocked: shops.data[i].blocked,
        adminApproved: shops.data[i].verified,
        action: shops.data[i],
      });
    }
  }

  return (
    <div className="">
      <Table
        className="mt-10"
        title={() => (
          <div className="flex justify-between">
            <div className="text-3xl font-bold ">Shops</div>
            <div className="">
              <Button onClick={() => setOpenCreate(true)}>Create</Button>
            </div>
          </div>
        )}
        loading={isLoading}
        columns={columns}
        dataSource={data}
        scroll={{ x: 800, y: 500 }}
      />

      <Drawer
        title="Create Shop"
        placement="right"
        onClose={() => setOpenCreate(false)}
        open={openCreate}
      >
        <CreateSeller closeDrawer={() => setOpenCreate(!openCreate)} />
      </Drawer>
      <Drawer
        title="Edit Shop"
        placement="right"
        onClose={() => setOpenEdit(false)}
        open={openEdit}
      >
        <EditSeller />
      </Drawer>
    </div>
  );
}

export default Seller;
