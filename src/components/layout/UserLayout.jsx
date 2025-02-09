import React from "react";
import { Navigate, Outlet } from "react-router";
import { useFetchUsersByidQuery } from "../../Redux/API/User.Api";

const UserLayout = () => {
  const UserId = sessionStorage.getItem("_id");
  const { isSuccess } = useFetchUsersByidQuery(UserId);
  return <>{UserId ? <Outlet /> : <Navigate to="/" />}</>;
};

export default UserLayout;
