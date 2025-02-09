import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useCreateUserMutation } from "../../../Redux/API/User.Api";
import toast from "react-hot-toast";

const validationSchema = Yup.object().shape({
  patientId: Yup.string().required("patientId is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  role: Yup.string()
    .oneOf(["user"], "Select a valid role")
    .required("Role is required"),
  age: Yup.number().min(18, "Must be 18 or older").required("Age is required"),
});

const UserForm = ({ open, setOpen }) => {
  const [CreateUser, { isLoading }] = useCreateUserMutation();
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>User Form</DialogTitle>
        <Formik
          initialValues={{
            patientId: "",
            username: "",
            password: "",
            role: "",
            age: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            await CreateUser({
              patientId: values.patientId,
              username: values.username,
              password: values.password,
              role: values.role,
              age: values.age,
            })
              .unwrap()
              .then((res) => {
                toast.success("user Add");
              });
            setOpen(false);
          }}
        >
          {({ errors, touched, handleChange, handleBlur, values }) => (
            <Form>
              <DialogContent>
                <TextField
                  fullWidth
                  margin="dense"
                  label="patientId"
                  name="patientId"
                  value={values.patientId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.patientId && Boolean(errors.patientId)}
                  helperText={touched.patientId && errors.patientId}
                />
                <TextField
                  fullWidth
                  margin="dense"
                  label="Username"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                />

                <TextField
                  fullWidth
                  margin="dense"
                  label="Password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />

                <TextField
                  select
                  fullWidth
                  margin="dense"
                  label="Role"
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.role && Boolean(errors.role)}
                  helperText={touched.role && errors.role}
                >
                  <MenuItem value="user">User</MenuItem>
                </TextField>

                <TextField
                  fullWidth
                  margin="dense"
                  label="Age"
                  name="age"
                  type="number"
                  value={values.age}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.age && Boolean(errors.age)}
                  helperText={touched.age && errors.age}
                />
              </DialogContent>

              <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default UserForm;
