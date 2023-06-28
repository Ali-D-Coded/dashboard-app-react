import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MdOutlineSpaceDashboard,
  MdOutlineReviews,
  MdOutlineCategory,
  MdOutlineTag,
} from "react-icons/md";
import { TbBrandGoogleAnalytics, TbUsers } from "react-icons/tb";
import { AiOutlineShop, AiOutlineTags } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { IoNotificationsOutline, IoSearchOutline } from "react-icons/io5";
import { HiOutlineUserGroup, HiOutlineShoppingCart } from "react-icons/hi";
import { CgNotes } from "react-icons/cg";
import { Avatar, Tooltip } from "antd";
import Dropdown from "../../components/DropDown";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSideBar = () => setIsOpen(!isOpen);

  const [activeRoute] = useState();

  const routes: any = [
    {
      id: "admin",
      active: false,
      path: "/",

      name: "DASHBOARD",
      icon: <MdOutlineSpaceDashboard className="text-[1.5rem]" />,
    },
    {
      id: "analytics",
      active: false,
      path: "/dashboard/analytics",

      name: "ANALYTICS",
      icon: <TbBrandGoogleAnalytics className="text-[1.5rem]" />,
    },
    {
      id: "reviews",
      active: false,
      path: "/dashboard/reviews",

      name: "REVIEWS",
      icon: <MdOutlineReviews className="text-[1.5rem]" />,
    },
    {
      id: "users",
      path: "/dashboard/users/sellers",
      name: "USERS",
      icon: <TbUsers className="text-[1.5rem]" />,
      subRoutes: [
        {
          id: "seller",
          active: false,
          path: "/dashboard/users/sellers",
          name: "SHOP",
          icon: <AiOutlineShop className="text-[1.5rem]" />,
        },
        {
          id: "customers",
          active: false,

          path: "/dashboard/users/customers",
          name: "CUSTOMERS",
          icon: <HiOutlineUserGroup className="text-[1.5rem]" />,
        },
      ],
    },
    {
      id: "product",
      path: "/dashboard/products",
      name: "PRODUCTS",
      icon: <HiOutlineShoppingCart className="text-[1.5rem]" />,
      subRoutes: [
        {
          id: "product",
          active: false,
          path: "/dashboard/products",

          name: "PRODUCT",
          icon: <HiOutlineShoppingCart className="text-[1.5rem]" />,
        },
        {
          id: "categories",
          active: false,

          path: "/dashboard/product/categories",
          name: "CATEGORIES",
          icon: <BiCategory className="text-[1.5rem]" />,
        },
        {
          id: "sub-categories",
          active: false,
          path: "/dashboard/product/sub-categories",

          name: "SUB CATEGORIES",
          icon: <MdOutlineCategory className="text-[1.5rem]" />,
        },
        {
          id: "brands",
          active: false,
          path: "/dashboard/product/brands",

          name: "BRANDS",
          icon: <MdOutlineTag className="text-[1.5rem]" />,
          // icon: <Image src="/award.png" height={16} width={16} alt="brand" />,
        },
        {
          id: "tags",
          active: false,
          path: "/dashboard/product/tags",

          name: "TAGS",
          icon: <AiOutlineTags className="text-[1.5rem]" />,
        },
        // {
        //   id: "wishlist",
        //   active: false,
        //   path: "/dashboard/admin/wishlist",
        //   link: (
        //     <Link href={"/dashboard/admin/product/wishlist"}>WISHLIST</Link>
        //   ),
        //   name: "WISHLIST",
        //   icon: <BsHeart className="text-[1.2rem]" />,
        // },
      ],
    },
    {
      id: "manageorders",
      active: false,
      path: "/dashboard/admin/orders",
      link: "MANAGE ORDERS",
      name: "MANAGE ORDERS",
      icon: <CgNotes className="text-[1.5rem]" />,
      subRoutes: [
        {
          id: "orders",
          active: false,
          path: "/dashboard/admin/orders",
          link: <Link to={"/dashboard/admin/orders"}>ORDERS</Link>,
          name: "ORDERS",
          icon: <CgNotes className="text-[1.5rem]" />,
        },
        {
          id: "returns",
          active: false,
          path: "/dashboard/admin/orders/returns",
          link: <Link to={"/dashboard/admin/orders/returns"}>RETURNS</Link>,
          name: "RETURNS",
          icon: <CgNotes className="text-[1.5rem]" />,
        },
      ],
    },
    {
      id: "banners",
      active: false,
      path: "/dashboard/admin/banners",
      link: <Link to={"/dashboard/admin/banners"}>BANNERS</Link>,
      name: "BANNERS",
      icon: <CgNotes className="text-[1.5rem]" />,
    },
    {
      id: "coupons",
      active: false,
      path: "/dashboard/admin/coupons",
      link: <Link to={"/dashboard/admin/coupons"}>COUPONS</Link>,
      name: "COUPONS",
      icon: <CgNotes className="text-[1.5rem]" />,
    },
  ];
  return (
    <div className="flex ">
      <motion.aside
        className=" overflow-scroll z-30 h-screen py-3 bg-[#264050] rounded-r-2xl   "
        animate={{
          width: isOpen ? "200px" : "45px",
          minWidth: isOpen ? "200px" : "45px",
        }}
      >
        <div onClick={() => toggleSideBar()} className="m-2">
          <img
            className="duration-150"
            src={isOpen ? "/fursanLogobig.png" : "/fursanLogo.svg"}
            width={isOpen ? 355 : 100}
            height={isOpen ? 93 : 100}
            alt="fursan logo"
          />
        </div>
        <nav>
          <ul>
            {routes.map((it: any) => {
              if (it.subRoutes) {
                return (
                  <div key={it.id} onMouseEnter={() => setIsOpen(true)}>
                    <Dropdown
                      isOpen={isOpen}
                      route={it}
                      activeRoute={activeRoute}
                    />
                  </div>
                );
              }
              return (
                <li key={it.id}>
                  <NavLink
                    to={it.path}
                    style={({ isActive }) => {
                      return {
                        backgroundColor: isActive
                          ? "rgb(251 191 36 / 0.3)"
                          : "",
                      };
                    }}
                    className={`flex text-white text-sm items-center gap-3 py-4 px-3 hover:bg-amber-400/30  hover:after:block  w-full hover:text-base duration-150 `}
                  >
                    <Tooltip placement="right" title={it.name}>
                      <div>{it.icon}</div>
                    </Tooltip>

                    {it.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </motion.aside>
      <main className="w-full bg-slate-100">
        <header className=" max-h-[5rem] bg-white p-3">
          <nav className="flex justify-between">
            <div>
              {/* <Input className="w-[200px]" type="search" /> */}
              <Avatar className="flex items-center justify-center text-xl text-center text-black border shadow-xl cursor-pointer bg-slate-100">
                <IoSearchOutline />
              </Avatar>
            </div>
            <div className="flex gap-3">
              <Avatar className="flex items-center justify-center text-xl text-center shadow-xl cursor-pointer ">
                <IoNotificationsOutline />
              </Avatar>
              <Avatar
                className="shadow-xl cursor-pointer "
                src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2"
              />
            </div>
          </nav>
        </header>
        <Outlet />
      </main>
    </div>
  );
}

export default Sidebar;
