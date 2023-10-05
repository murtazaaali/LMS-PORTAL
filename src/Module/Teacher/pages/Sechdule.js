import React from 'react';
import {
  Container,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from '@mui/material';

function SchedulePage() {
  // Sample schedule data (replace with your data)
  const scheduleData = [
    { day: 'Monday', time: '10:00 AM', course: 'Mathematics', room: 'Room 101' },
    { day: 'Tuesday', time: '11:30 AM', course: 'Science', room: 'Room 102' },
    { day: 'Wednesday', time: '09:00 AM', course: 'History', room: 'Room 103' },
    { day: 'Thursday', time: '02:00 PM', course: 'English', room: 'Room 104' },
    // Add more schedule entries as needed
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Schedule Page
      </Typography>

      {scheduleData.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Day</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Room</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scheduleData.map((schedule, index) => (
                <TableRow key={index}>
                  <TableCell>{schedule.day}</TableCell>
                  <TableCell>{schedule.time}</TableCell>
                  <TableCell>{schedule.course}</TableCell>
                  <TableCell>{schedule.room}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1">No schedule available.</Typography>
      )}
    </Container>
  );
}

export { SchedulePage };
