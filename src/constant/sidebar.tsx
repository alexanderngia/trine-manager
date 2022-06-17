import Dashboard from "../components/views/dashboard";
import ProductList from "../components/views/productList";
import OrderList from "../components/views/orderList";
import CustomerList from "../components/views/customerList";
import MemberList from "../components/views/memberList";
import PostList from "../components/views/postList";

// export interface IMenuAdmin {
//   id?: number;
//   title?: string;
//   path?: string;
//   page?: JSX.Element;
//   icon?: any;
//   rightArr?: any;
//   downArr?: any;
//   subMenu?: IMenuAdminSub;
// }

// export interface IMenuAdminSub {
//   id?: number;
//   title?: string;
//   path?: string;
//   icon?: any;
// }

export const menuAdmin = [
  {
    id: 1,
    title: "Tổng Quan",
    path: "/dashboard",
    page: <Dashboard />,
    icon: `<ion-icon name="home"/></ion-icon>`,
  },
  {
    id: 2,
    title: "Quản Lí Bài Viết",
    path: "/post-manager",
    page: <PostList />,
    icon: `<ion-icon name="document-text"></ion-icon>`,
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
    icon: `<ion-icon name="storefront"></ion-icon>`,
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
    icon: `<ion-icon name="bag"/></ion-icon>`,
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
    icon: `<ion-icon name="person"/></ion-icon>`,
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
    icon: `<ion-icon name="people-circle"/></ion-icon>`,
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

// export const menuSale = [
//   // {
//   //   id: 1,
//   //   title: "Tổng Quan",
//   //   path: "/",
//   //   page: <Dashboard />,
//   //   icon: `<ion-icon name="home"/></ion-icon>`,
//   // },
//   {
//     id: 2,
//     title: "Quản Lí Bài Viết",
//     path: "/post-manager",
//     page: <PostList />,
//     icon: `<ion-icon name="document-text"></ion-icon>`,
//     rightArr: `<ion-icon name="chevron-forward"></ion-icon>`,
//     downArr: `<ion-icon name="chevron-down"></ion-icon>`,
//     subMenu: {
//       id: 2.1,
//       title: "Thêm Bài Viết",
//       path: "/post-manager/add-post",
//       icon: `<ion-icon name="home"/></ion-icon>`,
//     },
//   },
//   {
//     id: 3,
//     title: "Quản Lí Sản Phẩm",
//     path: "/product-manager",
//     page: <ProductList />,
//     icon: `<ion-icon name="storefront"></ion-icon>`,
//     rightArr: `<ion-icon name="chevron-forward"></ion-icon>`,
//     downArr: `<ion-icon name="chevron-down"></ion-icon>`,
//     subMenu: {
//       id: 2.1,
//       title: "Thêm Sản Phẩm",
//       path: "/product-manager/add-product",
//       icon: `<ion-icon name="home"/></ion-icon>`,
//     },
//   },

//   {
//     id: 4,
//     title: "Quản Lí Đơn Hàng",
//     path: "/order-manager",
//     page: <OrderList />,
//     icon: `<ion-icon name="bag"/></ion-icon>`,
//     rightArr: `<ion-icon name="chevron-forward"></ion-icon>`,
//     downArr: `<ion-icon name="chevron-down"></ion-icon>`,
//     subMenu: {
//       id: 4.1,
//       title: "Thêm Đơn Hàng",
//       path: "/order-manager/add-order",
//       icon: `<ion-icon name="home"/></ion-icon>`,
//     },
//   },
//   // {
//   //   id: 4,
//   //   title: "Quản Lí Khách Hàng",
//   //   path: "/customer-manager",
//   //   page: <CustomerList />,
//   //   icon: `<ion-icon name="person"/></ion-icon>`,
//   //   rightArr: `<ion-icon name="chevron-forward"></ion-icon>`,
//   //   downArr: `<ion-icon name="chevron-down"></ion-icon>`,
//   //   subMenu: {
//   //     id: 4.1,
//   //     title: "Thêm Khách Hàng",
//   //     path: "/customer-manager/add-customer",
//   //     icon: `<ion-icon name="home"/></ion-icon>`,
//   //   },
//   // },
//   // {
//   //   id: 5,
//   //   title: "Quản Lí Thành Viên",
//   //   path: "/member-manager",
//   //   page: <MemberList />,
//   //   icon: `<ion-icon name="people-circle"/></ion-icon>`,
//   //   rightArr: `<ion-icon name="chevron-forward"></ion-icon>`,
//   //   downArr: `<ion-icon name="chevron-down"></ion-icon>`,
//   //   subMenu: {
//   //     id: 5.1,
//   //     title: "Thêm Thành Viên",
//   //     path: "/member-manager/add-member",
//   //     icon: `<ion-icon name="home"/></ion-icon>`,
//   //   },
//   // },
// ];
