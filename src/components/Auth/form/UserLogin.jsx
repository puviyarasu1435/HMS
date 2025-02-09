import React from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useLoginUserMutation } from "../../../Redux/API/User.Api";

const validationSchema = Yup.object({
  patientId: Yup.string().required("Patient ID is required"),
  password: Yup.string().required("Password is required"),
});

const UserLogin = () => {
  const [UserLoginPost, { isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      patientId: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await UserLoginPost({
          patientId: values.patientId,
          password: values.password,
        }).unwrap();
        console.log("Login Success:", response);
        sessionStorage.setItem("_id", response.user_id);
        toast.success("Login Success");
        navigate("/User");
      } catch (error) {
        console.error("Login Error:", error);
        if (error.status === 401 || (error.data && error.data.error)) {
          toast.error("Login Failed: Check Your Credentials");
          
        } else {
          toast.error("Something went wrong. Please try again.");
          
        }
      }
    },
  });

  return (
    <Paper
      elevation={10}
      sx={{
        p: 4,
        width: 300,
        boxShadow: "0px 15px 60px rgb(23, 145, 161)",
        outline: "1px solid rgb(14, 122, 136)",
        borderRadius: "10px",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" fontWeight={600} color="rgb(23, 120, 161)">
        HMS
      </Typography>
      <Typography variant="h6" sx={{ fontSize: "15px" }} mt={2}>
        Ensure your Health
      </Typography>

      <Box mt={5} component="form" onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          variant="outlined"
          label="Patient ID"
          name="patientId"
          value={formik.values.patientId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.patientId && Boolean(formik.errors.patientId)}
          helperText={formik.touched.patientId && formik.errors.patientId}
          sx={{
            input: { color: "#1773a1" },
            fieldset: { borderColor: "#1773a1" },
            mb: 2,
          }}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Password"
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          sx={{
            input: { color: "#1773a1" },
            fieldset: { borderColor: "#1773a1" },
          }}
        />
        <Box mt={3}>
          <Button
            fullWidth
            variant="outlined"
            type="submit"
            sx={{
              color: "#1773a1",
              borderColor: "#1773a1",
              fontWeight: 600,
              "&:hover": { backgroundColor: "#1773a1", color: "white" },
            }}
          >
            Login
          </Button>
        </Box>
        <Box mt={2}>
          <Link
            to={"/doctor"}
            underline="none"
            sx={{ color: "#1773a1", fontSize: 12 }}
          >
            Doctor Login
          </Link>
        </Box>
      </Box>
    </Paper>
  );
};

export default UserLogin;
