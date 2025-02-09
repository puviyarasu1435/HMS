import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { setPredictions } from "../../../Redux/Slice/UserSlice";
import { useEffect } from "react";

export default function ReviewTable({ Data, Report, Date }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPredictions({ Data, Report,Date }))
  },[]);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={6}>
              AI Review :<strong>{Report}</strong>
            </TableCell>
            <TableCell align="center" colSpan={6}>
              Review :<strong>{Date}</strong>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">HR</TableCell>
            <TableCell align="center">SpO₂</TableCell>
            <TableCell align="center">RR</TableCell>
            <TableCell align="center">Temp</TableCell>
            <TableCell align="center">Pain</TableCell>
            <TableCell align="center">UO</TableCell>
            <TableCell align="center">SBP</TableCell>
            <TableCell align="center">DBP</TableCell>
            <TableCell align="center">Wound</TableCell>
            <TableCell align="center">Mobility</TableCell>
            <TableCell align="center">ECG</TableCell>
            <TableCell align="center">Comp</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align="center">{Data?.HeartRate}</TableCell>
            <TableCell align="center">{Data?.OxygenSaturation}</TableCell>
            <TableCell align="center">{Data?.RespiratoryRate}</TableCell>
            <TableCell align="center">{Data?.Temperature}</TableCell>
            <TableCell align="center">{Data?.PainLevel}</TableCell>
            <TableCell align="center">{Data?.UrineOutput}</TableCell>
            <TableCell align="center">{Data?.SystolicBP}</TableCell>
            <TableCell align="center">{Data?.DiastolicBP}</TableCell>
            <TableCell align="center">
              {Data?.WoundStatus == 1 ? "Not Normal" : "Normal"}
            </TableCell>
            <TableCell align="center">
              {Data?.Mobility == 1 ? "Can't Walk" : "Can Walk"}
            </TableCell>
            <TableCell align="center">
              {Data?.ECGAbnormality == 0 ? "Not Normal" : "Normal"}
            </TableCell>
            <TableCell align="center">
              {Data?.Complications == 0 ? "Nothing" : "Has Complications"}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
