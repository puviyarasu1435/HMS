import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import ReviewTable from "../MonitorTable/ReviewTable";

const UserCard = ({ username, age, predictions }) => {
  return (
    <Card sx={{ width: "100%", borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Name:{username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Age: {age}
        </Typography>

        <Box
          sx={{
            mt: 2,
            p: 1,
            bgcolor: "#f5f5f5",
            borderRadius: 1,
            boxShadow: "inset 0px 2px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Last Report
          </Typography>
          {predictions?.Data && <ReviewTable
            Data={predictions?.Data}
            Report={predictions?.Report}
            Date={predictions?.Date}
          />}
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserCard;
