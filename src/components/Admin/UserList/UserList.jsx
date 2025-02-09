import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import UserForm from "./UserForm";

export default function UserList({ Data,onSelect }) {

  return (
    <>
    <List
      sx={{
        height: "85vh",
        width: "100%",
        padding: 2,
        bgcolor: "background.paper",
        overflowY: "scroll",
        scrollbarWidth: "none", // Hide scrollbar for Firefox
        "&::-webkit-scrollbar": {
          display: "none", // Hide scrollbar for Chrome, Safari, Edge
        },
      }}
    >
      {Data &&
        Data?.map((user, index) => (
          <>
            <ListItem
              component={"button"}
              alignItems="flex-start"
              sx={{ mb: 1 }}
              onClick={()=>onSelect(user?.id)}
            >
              <ListItemText
                primary={"Name : "+user?.username}
                secondary={<> 
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ color: "text.primary", display: "inline" }}
                  >
                    Age:{user?.age}
                  </Typography>
                  <br />
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ color: "text.primary", display: "inline" }}
                  >
            Patient ID :{user?.patientId}
                  </Typography>
                </>
                }
              />
            </ListItem>
          </>
        ))}
      <Divider component="li" />

    </List>
    
    </>
  );
}
