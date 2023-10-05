import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Select,
  MenuItem,
  TextField,
  Button,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from '@mui/material';

function MarksPage() {
  const [section, setSection] = useState('');
  const [studentName, setStudentName] = useState('');
  const [grade, setGrade] = useState('');
  const [marks, setMarks] = useState('');
  const [studentData, setStudentData] = useState([]);

  const handleSectionChange = (event) => {
    setSection(event.target.value);
  };

  const handleStudentNameChange = (event) => {
    setStudentName(event.target.value);
  };

  const handleGradeChange = (event) => {
    setGrade(event.target.value);
  };

  // const handleMarksChange = (event) => {
  //   setMarks(event.target.value);
  // };

  const handleAddMarks = () => {
    if (section && studentName && grade && marks) {
      const newStudent = {
        section,
        studentName,
        grade,
        marks,
      };
      setStudentData([...studentData, newStudent]);
      // Clear input fields
      setSection('');
      setStudentName('');
      setGrade('');
      setMarks('');
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Marks Page
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Select fullWidth label="Select Section" value={section} onChange={handleSectionChange}>
            <MenuItem value="A">programming Fundamentals</MenuItem>
            <MenuItem value="B">Cyber Sequrity</MenuItem>
            {/* Add more sections as needed */}
          </Select>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField fullWidth label="Student Name" value={studentName} onChange={handleStudentNameChange} />
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Select fullWidth label="Select Grade" value={grade} onChange={handleGradeChange}>
            <MenuItem value="A+">A+</MenuItem>
            <MenuItem value="A-">A-</MenuItem>
            <MenuItem value="B+">B+</MenuItem>
            <MenuItem value="B-">B-</MenuItem>
            <MenuItem value="C+">C+</MenuItem>
            <MenuItem value="C-">C-</MenuItem>
            <MenuItem value="D+">D+</MenuItem>
            <MenuItem value="F">F</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Button fullWidth variant="contained" color="primary" onClick={handleAddMarks}>
            Add Marks
          </Button>
        </Grid>
      </Grid>

      {/* Display entered data in a table */}
      {studentData.length > 0 && (
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Section</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>Grade</TableCell>
                <TableCell>Marks</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentData.map((student, index) => (
                <TableRow key={index}>
                  <TableCell>{student.section}</TableCell>
                  <TableCell>{student.studentName}</TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>{student.marks}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export { MarksPage };
