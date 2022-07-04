import DashBoard from "components/views/dashboard";
import ProductList from "components/views/productList";
import OrderList from "components/views/orderList";
import CustomerList from "components/views/customerList";
import MemberList from "components/views/memberList";
import PostList from "components/views/postList";
import { Dashboard } from "@styled-icons/boxicons-solid/Dashboard";
import { FileEarmarkRichtextFill } from "@styled-icons/bootstrap/FileEarmarkRichtextFill";
import { Storefront } from "@styled-icons/ionicons-sharp/Storefront";
import { CartFill } from "@styled-icons/bootstrap/CartFill";
import { CustomerService } from "@styled-icons/remix-fill/CustomerService";
import { User } from "@styled-icons/boxicons-solid/User";
export const menuAdmin = [
  {
    id: 1,
    title: "Tổng Quan",
    path: "/dashboard",
    page: <DashBoard />,
    icon: <Dashboard />,
  },
  {
    id: 2,
    title: "Quản Lí Bài Viết",
    path: "/post-manager",
    page: <PostList />,
    icon: <FileEarmarkRichtextFill />,
    rightArr: `<ion-icon name="chevron-forward"></ion-icon>`,
    downArr: `<ion-icon name="chevron-down"></ion-icon>`,
    subMenu: [
      {
        id: 2.1,
        title: "Thêm Bài Viết",
        path: "/post-manager/add-post",
        icon: `<ion-icon name="home"/></ion-icon>`,
      },
    ],
  },
  {
    id: 3,
    title: "Quản Lí Sản Phẩm",
    path: "/product-manager",
    page: <ProductList />,
    icon: <Storefront />,
    rightArr: `<ion-icon name="chevron-forward"></ion-icon>`,
    downArr: `<ion-icon name="chevron-down"></ion-icon>`,
    subMenu: [
      {
        id: 3.1,
        title: "Thêm Sản Phẩm",
        path: "/product-manager/add-product",
        icon: `<ion-icon name="home"/></ion-icon>`,
      },
    ],
  },
  {
    id: 4,
    title: "Quản Lí Đơn Hàng",
    path: "/order-manager",
    page: <OrderList />,
    icon: <CartFill />,
    rightArr: `<ion-icon name="chevron-forward"></ion-icon>`,
    downArr: `<ion-icon name="chevron-down"></ion-icon>`,
    subMenu: [
      {
        id: 4.1,
        title: "Thêm Đơn Hàng",
        path: "/order-manager/add-order",
        icon: `<ion-icon name="home"/></ion-icon>`,
      },
    ],
  },
  {
    id: 5,
    title: "Quản Lí Khách Hàng",
    path: "/customer-manager",
    page: <CustomerList />,
    icon: <CustomerService />,
    rightArr: `<ion-icon name="chevron-forward"></ion-icon>`,
    downArr: `<ion-icon name="chevron-down"></ion-icon>`,
    subMenu: [
      {
        id: 5.1,
        title: "Thêm Khách Hàng",
        path: "/customer-manager/add-customer",
        icon: `<ion-icon name="home"/></ion-icon>`,
      },
    ],
  },
  {
    id: 6,
    title: "Quản Lí Thành Viên",
    path: "/member-manager",
    page: <MemberList />,
    icon: <User />,
    rightArr: `<ion-icon name="chevron-forward"></ion-icon>`,
    downArr: `<ion-icon name="chevron-down"></ion-icon>`,

    subMenu: [
      {
        id: 6.1,
        title: "Thêm Thành Viên",
        path: "/member-manager/add-member",
        icon: `<ion-icon name="home"/></ion-icon>`,
      },
    ],
  },
];

export const menuSale = [
  {
    id: 1,
    title: "Tổng Quan",
    path: "/dashboard",
    page: <Dashboard />,
    // icon: <SunFill />,
  },
  {
    id: 2,
    title: "Quản Lí Bài Viết",
    path: "/post-manager",
    page: <PostList />,
    icon: <FileEarmarkRichtextFill />,
    rightArr: `<ion-icon name="chevron-forward"></ion-icon>`,
    downArr: `<ion-icon name="chevron-down"></ion-icon>`,
    subMenu: [
      {
        id: 2.1,
        title: "Thêm Bài Viết",
        path: "/post-manager/add-post",
        icon: `<ion-icon name="home"/></ion-icon>`,
      },
    ],
  },
  {
    id: 3,
    title: "Quản Lí Sản Phẩm",
    path: "/product-manager",
    page: <ProductList />,
    icon: <Storefront />,
    rightArr: `<ion-icon name="chevron-forward"></ion-icon>`,
    downArr: `<ion-icon name="chevron-down"></ion-icon>`,
    subMenu: [
      {
        id: 3.1,
        title: "Thêm Sản Phẩm",
        path: "/product-manager/add-product",
        icon: `<ion-icon name="home"/></ion-icon>`,
      },
    ],
  },
  {
    id: 4,
    title: "Quản Lí Đơn Hàng",
    path: "/order-manager",
    page: <OrderList />,
    icon: <CartFill />,
    rightArr: `<ion-icon name="chevron-forward"></ion-icon>`,
    downArr: `<ion-icon name="chevron-down"></ion-icon>`,
    subMenu: [
      {
        id: 4.1,
        title: "Thêm Đơn Hàng",
        path: "/order-manager/add-order",
        icon: `<ion-icon name="home"/></ion-icon>`,
      },
    ],
  },
];
