import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@mui/material';

const studentsData = [
  {
    RollNo: '01',
    Name: 'Ahmad',
    AttendancePer: 80,
    Status: 'Present',
    Issue: 'NO',
  },
  // Add more student data as needed
];

const AttendancePage = () => {
  const [classDetail, setClassDetail] = useState({
    Degree: '',
    ClassSection: '',
    AttendanceDate: '',
  });

  const [attendanceDetail, setAttendanceDetail] = useState({});

  const handleClassDetailChange = (e) => {
    setClassDetail({
      ...classDetail,
      [e.target.name]: e.target.value,
    });
  };

  const handleStudentAttendanceChange = (e, rollNo) => {
    setAttendanceDetail({
      ...attendanceDetail,
      [rollNo]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const classInfo = {
      ...classDetail,
      StudentAttendanceDetail: attendanceDetail,
    };

    console.log(classInfo);
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Attendance Page
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Select
            fullWidth
            name="Degree"
            value={classDetail.Degree}
            onChange={handleClassDetailChange}
            variant="outlined"
            sx={{ mb: 2 }}
          >
            <MenuItem value="">-- Course --</MenuItem>
            <MenuItem value="BSCS">BSCS</MenuItem>
            <MenuItem value="BSIT">BSIT</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} md={4}>
          <Select
            fullWidth
            name="ClassSection"
            value={classDetail.ClassSection}
            onChange={handleClassDetailChange}
            variant="outlined"
            sx={{ mb: 2 }}
          >
            <MenuItem value="">-- Section --</MenuItem>
            <MenuItem value="A">A</MenuItem>
            <MenuItem value="B">B</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} md={4}>
          <input
            type="date"
            name="AttendanceDate"
            value={classDetail.AttendanceDate}
            onChange={handleClassDetailChange}
            className="form-control shadow-sm"
          />
        </Grid>
      </Grid>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Roll No</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Attendance %</TableCell>
            <TableCell>Issue</TableCell>
            <TableCell>Option</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentsData.map((student) => (
            <TableRow key={student.RollNo}>
              <TableCell>{student.RollNo}</TableCell>
              <TableCell>{student.Name}</TableCell>
              <TableCell>{student.AttendancePer}</TableCell>
              <TableCell>{student.Issue}</TableCell>
              <TableCell>
                <Select
                  name={student.RollNo}
                  value={attendanceDetail[student.RollNo] || ''}
                  onChange={(e) => handleStudentAttendanceChange(e, student.RollNo)}
                  variant="outlined"
                >
                  <MenuItem value="">-Select Status-</MenuItem>
                  <MenuItem value="Present">Present</MenuItem>
                  <MenuItem value="Absent">Absent</MenuItem>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="d-flex justify-content-center mt-3">
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </Container>
  );
};

export { AttendancePage };
