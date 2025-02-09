import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router";

const Auth = () => {

  return (
    <>
      <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', height:'95vh'}}>
        <Outlet/>
      </Box>
    </>
  );
};

export default Auth;
