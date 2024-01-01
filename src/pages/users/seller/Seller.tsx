import React, { useState, useMemo, useCallback } from "react";
import { useGetAllShops } from "../../../hooks/shops/useShops";
import { Table, Avatar, Button, Drawer, Tag, FixedType } from "antd";
import CreateSeller from "./CreateSeller";
import EditSeller from "./EditSeller";
import { useGlobalState } from "../../../context/GlobalStateContext";

interface ShopData {
  key: React.Key;
  name: string | null;
  phone: string | null;
  address: string[] | null;
  email: string | null;
  referalCode: string | null;
  images: { url: string }[] | null;
  blocked?: boolean;
  adminApproved?: boolean;
  action: any;
}

function Seller() {
  const { data: shops, isLoading, isSuccess } = useGetAllShops();
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const { collectToEdit } = useGlobalState();

  const showEditDrawer = useCallback(
    (item: ShopData) => {
      collectToEdit(item);
      setOpenEdit(true);
    },
    [collectToEdit]
  );

  const columns = useMemo(
    () => [
      {
        title: "Full Name",
        dataIndex: "name",
        key: "name",
        width: 100,
      },
      {
        title: "Images",
        dataIndex: "images",
        key: "images",
        width: 150,
        render: (images: { url: string }[] | null) => (
          <Avatar.Group>
            {images?.map((image, index) => (
              <Avatar key={index} src={image.url} />
            ))}
          </Avatar.Group>
        ),
      },
      {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
        width: 110,
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
        render: (addresses: string[] | null) => (
          <div>
            {addresses?.map((address, index) => (
              <div key={index}>{address}</div>
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
        fixed: "right" as FixedType ,
        width: 100,
        render: (blocked: boolean | undefined) => (
          <div>
            {!blocked ? (
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
        render: (adminApproved: boolean | undefined) => (
          <div>
            {adminApproved ? (
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
        render: (item: ShopData) => (
          <Button
            onClick={() => showEditDrawer(item)}
            className="bg-orange-400"
          >
            Edit
          </Button>
        ),
      },
    ],
    [showEditDrawer]
  );

  const data: ShopData[] = useMemo(
    () =>
      isSuccess
        ? shops.data?.map((shop: any) => ({
            key: shop.id,
            name: shop.Shop?.shopName,
            phone: shop.Shop?.shopContact,
            address: shop?.Shop?.shopAddress,
            email: shop.Shop?.shopEmail,
            images: shop?.image,
            referalCode: shop?.referalCode,
            blocked: shop.blocked,
            adminApproved: shop.verified,
            action: shop,
          })) ?? []
        : [],
    [isSuccess, shops.data]
  );

  return (
    <>
      <Table
        className="mt-10"
        title={() => (
          <div className="flex justify-between">
            <div className="text-3xl font-bold">Shops</div>
            <div className="">
              <Button onClick={() => setOpenCreate(true)}>Create</Button>
            </div>
          </div>
        )}
        loading={isLoading && !isSuccess}
        columns={columns}
        dataSource={data}
        scroll={{ x: 800, y: 500 }}
        rowKey={(record) => record.key.toString()}
      />

      <Drawer
        title="Create Shop"
        placement="right"
        onClose={() => setOpenCreate(false)}
        visible={openCreate}
      >
        <CreateSeller closeDrawer={() => setOpenCreate(false)} />
      </Drawer>
      <Drawer
        title="Edit Shop"
        placement="right"
        onClose={() => setOpenEdit(false)}
        visible={openEdit}
      >
        <EditSeller
          openEdit={openEdit}
          closeDrawer={() => setOpenEdit(false)}
        />
      </Drawer>
    </>
  );
}

export default Seller;
