import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import ReviewTable from "../../User/MonitorTable/ReviewTable";


const UserCard = ({ username, age, id }) => {
  return (
    <Card sx={{ width: "100%",height:'15%', borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Name:{username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Age: {age}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ID: {id}
        </Typography>

        {/* <Box
          sx={{
            mt: 2,
            p: 1,
            bgcolor: "#f5f5f5",
            borderRadius: 1,
            boxShadow: "inset 0px 2px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          
        </Box> */}
      </CardContent>
    </Card>
  );
};

export default UserCard;
