import React from "react";
import { Outlet } from "react-router";

const AdminLayout = () => {
  const _admin = sessionStorage.getItem("_id")
  return <>{_admin=="71d06137d8bbc375f713a855986a5ec9f5267073" ? <Outlet /> : <Navigate to="/" />}</>;
};

export default AdminLayout;
