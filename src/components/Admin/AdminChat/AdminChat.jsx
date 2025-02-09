import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router";
import ReviewTable from "../../User/MonitorTable/ReviewTable";
// import ReviewTable from "../MonitorTable/ReviewTable";

const socket = io("http://localhost:8080"); // Change to your backend URL

const AdminChat = ({UserId}) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const messagesEndRef = useRef(null); // Reference for auto-scroll

  if (!UserId) {
    return <></>
  }

  useEffect(() => {
    socket.emit("joinRoom", UserId); // Send user ID to server

    socket.on("Joined", (messages) => {
      setMessages(messages);
    });

    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]); // Append new message
    });

    return () => {
      socket.off("Joined");
      socket.off("receiveMessage");
    };
  }, [UserId]);

  // Auto-scroll to latest message when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      const message = { UserId, role: "admin", text: input };
      socket.emit("sendMessage", message); // Send message to server
      setInput("");
    }
  };

  function GetTime(temp) {
    if (temp) {
      const [date, time] = temp.split(", ");
      return time;
    } else {
      return "";
    }
  }

  return (
    <Paper
      elevation={3}
      sx={{
        height: "90vh",
        p: 2,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* <Typography variant="h6" align="center">
        Review
      </Typography> */}

      <Box
        sx={{
          overflowY: "auto",
          p: 1,
          mb: 1,
          flexGrow: 1,
          scrollbarWidth: "none", // Hide scrollbar for Firefox
          "&::-webkit-scrollbar": {
            display: "none", // Hide scrollbar for Chrome, Safari, Edge
          },
          backgroundColor:'lightblue',
          borderRadius:'10px',
          boxShadow: "inset 0px 4px 10px rgba(19, 132, 176, 0.2)", // Inner shadow effect
        }}
      >
        {messages?.map((msg, index) => (
          <Box
            key={index}
            sx={{ textAlign: msg.role === "user" ? "left" : "right", mb: 1 }}
          >
            {msg.role != "system" ? (
              <Typography
                sx={{
                  display: "inline-block",
                  bgcolor: msg.role === "user" ? "#e0e0e0" : "#1976d2",
                  color: msg.role === "user" ? "black" : "white",
                  p: 1,
                  borderRadius: 1,
                }}
              >
                {msg.text}
                <br />
                {GetTime(msg?.time)}
              </Typography>
            ) : (
              <ReviewTable
                Data={msg?.review}
                Report={msg?.report}
                Date={msg?.time}
              />
            )}
          </Box>
        ))}
        {/* Invisible div to scroll into view */}
        <div ref={messagesEndRef} />
      </Box>

      <Box display="flex">
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
        />
        <Button variant="contained" sx={{ ml: 1 }} onClick={handleSend}>
          Send
        </Button>
      </Box>
    </Paper>
  );
};

export default AdminChat;
