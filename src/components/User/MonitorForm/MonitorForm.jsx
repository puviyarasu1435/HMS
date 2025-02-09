import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  FormControl,
  Autocomplete,
} from "@mui/material";
import { usePredictMutation } from "../../../Redux/API/Prediction.Api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000");

const validationSchema = Yup.object({
  HeartRate: Yup.number()
    .typeError("Heart Rate must be a number")
    .required("Heart Rate is required")
    .min(30, "Heart Rate is too low (minimum: 30 bpm)")
    .max(200, "Heart Rate is too high (maximum: 200 bpm)"),
  OxygenSaturation: Yup.number()
    .typeError("Oxygen Saturation must be a number")
    .required("Oxygen Saturation is required")
    .min(0, "Oxygen Saturation cannot be negative")
    .max(100, "Oxygen Saturation cannot exceed 100%"),
  RespiratoryRate: Yup.number()
    .typeError("Respiratory Rate must be a number")
    .required("Respiratory Rate is required")
    .min(10, "Respiratory Rate is too low (minimum: 10 breaths per minute)")
    .max(40, "Respiratory Rate is too high (maximum: 40 breaths per minute)"),
  Temperature: Yup.number()
    .typeError("Temperature must be a number")
    .required("Temperature is required")
    .min(95, "Temperature is too low (minimum: 95°F)")
    .max(105, "Temperature is too high (maximum: 105°F)"),
  PainLevel: Yup.number()
    .typeError("Pain Level must be a number")
    .required("Pain Level is required")
    .min(0, "Pain Level cannot be negative")
    .max(10, "Pain Level cannot exceed 10"),
  UrineOutput: Yup.number()
    .typeError("Urine Output must be a number")
    .required("Urine Output is required")
    .min(0, "Urine Output cannot be negative"),
  SystolicBP: Yup.number()
    .typeError("Systolic BP must be a number")
    .required("Systolic BP is required")
    .min(70, "Systolic BP is too low (minimum: 70 mmHg)")
    .max(200, "Systolic BP is too high (maximum: 200 mmHg)"),
  DiastolicBP: Yup.number()
    .typeError("Diastolic BP must be a number")
    .required("Diastolic BP is required")
    .min(40, "Diastolic BP is too low (minimum: 40 mmHg)")
    .max(120, "Diastolic BP is too high (maximum: 120 mmHg)"),
  WoundStatus: Yup.number()
    .typeError("Wound Status must be a number")
    .required("Wound Status is required")
    .oneOf([1, 2], "Invalid Wound Status: 1 (Not Normal), 2 (Normal)"),
  Mobility: Yup.number()
    .typeError("Mobility must be a number")
    .required("Mobility status is required")
    .oneOf([1, 2], "Invalid Mobility: 1 (Can't Walk), 2 (Can Walk)"),
  ECGAbnormality: Yup.number()
    .typeError("ECG Abnormality must be a number")
    .required("ECG Abnormality status is required")
    .oneOf([0, 1], "Invalid ECG Abnormality: 0 (Not Normal), 1 (Normal)"),
  Complications: Yup.number()
    .typeError("Complications must be a number")
    .required("Complications field is required")
    .min(0, "Complications must be 0 or higher")
    .test(
      "validComplications",
      "Invalid Complications: 0 (Nothing), 1+ (Has Complications)",
      (value) => value >= 0
    ),
});

const MonitorForm = () => {
  const [updatePredict, { isLoading }] = usePredictMutation();
  const UserData = useSelector((state) => state.UserState);

  const formik = useFormik({
    initialValues: {
      HeartRate: "",
      OxygenSaturation: "",
      RespiratoryRate: "",
      Temperature: "",
      PainLevel: "",
      UrineOutput: "",
      SystolicBP: "",
      DiastolicBP: "",
      WoundStatus: "2",
      Mobility: "2",
      ECGAbnormality: "1",
      Complications: "0",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Form Data:", values);
      await updatePredict(
        {
          "Patient ID": UserData?.patientId,
          "Age": parseInt(UserData?.age),
          "HeartRate": parseInt(values.HeartRate),
          "OxygenSaturation": parseInt(values.OxygenSaturation),
          "RespiratoryRate":parseInt( values.RespiratoryRate),
          "Temperature": (5/9)*(values.Temperature-32),
          "PainLevel": parseInt(values.PainLevel),
          "UrineOutput": parseInt(values.UrineOutput),
          "SystolicBP": parseInt(values.SystolicBP),
          "DiastolicBP": parseInt(values.DiastolicBP),
          "WoundStatus": values.WoundStatus,
          "Mobility": values.Mobility,
          "ECGAbnormality": values.ECGAbnormality,
          "Complications": values.Complications
      }
      ).unwrap().then((res)=>{
        console.log(res)
        toast.success("AI Review:"+res?.classification);
        const message = { UserId:sessionStorage.getItem("_id"), role: "system", review:values,report:res?.classification };
        socket.emit("sendMessage", message);
      });
    },
  });

  return (
    <Card>
      <CardContent>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} justifyContent={"left"}>
            {Object.keys(formik.initialValues).map((field) =>
              field !== "WoundStatus" &&
              field !== "Mobility" &&
              field !== "ECGAbnormality" &&
              field !== "Complications" ? (
                <Grid item xs={12} sm={6} key={field}>
                  <TextField
                    fullWidth
                    label={field}
                    variant="outlined"
                    name={field}
                    value={formik.values[field]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched[field] && Boolean(formik.errors[field])
                    }
                    helperText={formik.touched[field] && formik.errors[field]}
                  />
                </Grid>
              ) : (
                <Grid item xs={12} sm={6} key={field}>
                  <FormControl fullWidth>
                    <Autocomplete
                      options={
                        field === "WoundStatus"
                          ? [1, 2]
                          : field === "Mobility"
                          ? [1, 2]
                          : field === "ECGAbnormality"
                          ? [0, 1]
                          : field === "Complications"
                          ? [0, 1]
                          : []
                      }
                      getOptionLabel={(option) => {
                        if (field === "WoundStatus") {
                          return option === 1 ? "Not Normal" : "Normal";
                        }
                        if (field === "Mobility") {
                          return option === 1 ? "Can't Walk" : "Can Walk";
                        }
                        if (field === "ECGAbnormality") {
                          return option === 0 ? "Not Normal" : "Normal";
                        }
                        if (field === "Complications") {
                          return option === 0 ? "Normal" : "Has Complications";
                        }
                        return option;
                      }}
                      value={formik.values[field]}
                      onChange={(event, newValue) => {
                        formik.setFieldValue(field, newValue);
                      }}
                      onBlur={formik.handleBlur}
                      disableClearable
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={field}
                          error={
                            formik.touched[field] &&
                            Boolean(formik.errors[field])
                          }
                          helperText={
                            formik.touched[field] && formik.errors[field]
                          }
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
              )
            )}
            <Grid item xs={2}>
              <Button
                type="submit"
                variant="contained"
                sx={{ color: "white", backgroundColor: "green" }}
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default MonitorForm;
