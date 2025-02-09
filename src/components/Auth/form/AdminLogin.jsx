import React from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  doctorId: Yup.string().required("Doctor ID is required"),
  password: Yup.string().required("Password is required"),
});

const AdminLogin = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      doctorId: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Submitted", values);
      if(values.doctorId=="admin" && values.password=="admin@123"){
        sessionStorage.setItem("_id", "71d06137d8bbc375f713a855986a5ec9f5267073");
        toast.success("Login Success");
        navigate("/admin");
      }else{
        toast.error("Login Failed: Check Your Credentials");
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
        Welcome! Doctor..
      </Typography>

      <Box mt={5} component="form" onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          variant="outlined"
          label="Doctor ID"
          name="doctorId"
          value={formik.values.doctorId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.doctorId && Boolean(formik.errors.doctorId)}
          helperText={formik.touched.doctorId && formik.errors.doctorId}
          sx={{ input: { color: "#1773a1" }, fieldset: { borderColor: "#1773a1" }, mb: 2 }}
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
          sx={{ input: { color: "#1773a1" }, fieldset: { borderColor: "#1773a1" } }}
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
              '&:hover': { backgroundColor: "#1773a1", color: "white" },
            }}
          >
            Login
          </Button>
        </Box>

        <Box mt={2}>
          <Link to={"/"} underline="none" sx={{ color: "#1773a1", fontSize: 12 }}>
            Patient Login
          </Link>
        </Box>
      </Box>
    </Paper>
  );
};

export default AdminLogin;
