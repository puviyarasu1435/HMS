import React, { useState } from "react";
import { Box, Button, Grid, Grid2 } from "@mui/material";
import { useSelector } from "react-redux";
import AdminChat from "./AdminChat/AdminChat";
import UserList from "./UserList/UserList";
import {
  useFetchUsersByidQuery,
  useFetchUsersQuery,
} from "../../Redux/API/User.Api";
import MonitorTable from "./MonitorTable/MonitorTable";
import UserCard from "./UserCard/UserCard";
import UserForm from "./UserList/UserForm";

const AdminView = () => {
  const UserState = useSelector((state) => state.UserState);
  const { data: UserData } = useFetchUsersQuery();
  const [SelectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);
  const handleSelectUser = (id) => {
    setSelectedUser(id);
  };
  const handleDialog = (val) => {
    setOpen(val);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid2 container spacing={2}>
          <Grid2 container size={2}>

            <Button
              onClick={()=>handleDialog(true)}
              sx={{
                width: "100%",
                height:'50px',
                backgroundColor: "green",
                color: "white",
              }}
            >
              Create User
            </Button>
            {UserData?.users && (
              <UserList Data={UserData?.users} onSelect={handleSelectUser} />
            )}
          </Grid2>
          {SelectedUser && (
            <>
              <Grid2 size={10}>
                <AdminChat UserId={SelectedUser} />
              </Grid2>
            </>
          )}
        </Grid2>
      </Box>
      <UserForm open={open} setOpen={handleDialog} />
    </>
  );
};

export default AdminView;
