import React from "react";
import { Box, Grid, Grid2 } from "@mui/material";
import MonitorForm from "./MonitorForm/MonitorForm";
import MonitorTable from "../Admin/MonitorTable/MonitorTable";
import UserChat from "./UserChat/UserChat";
import UserCard from "./UserCard/UserCard";
import { useSelector } from "react-redux";

const UserView = () => {
  const UserState = useSelector((state) => state.UserState);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid2 container spacing={2}>
          <Grid2 container size={6} >
            {UserState?.predictions && <UserCard username={UserState?.username} age={UserState?.age} predictions={UserState?.predictions}/>}
            <MonitorForm />
          </Grid2>
          <Grid2 size={6}>
            <UserChat/>
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
};

export default UserView;
