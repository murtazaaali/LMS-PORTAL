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

function CoursesPage() {
  // Sample data for teachers and courses
  const initialData = [
    {
      teacherName: 'John Doe',
      courseAllotted: 'Mathematics',
      numClasses: 20,
      totalStudents: 500,
    },
    {
      teacherName: 'Jane Smith',
      courseAllotted: 'Science',
      numClasses: 15,
      totalStudents: 450,
    },
    // Add more data as needed
  ];

  // const [courseData, setCourseData] = useState(initialData);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Course Page
      </Typography>

      {/* Display course data in a table */}
      {initialData.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Teacher Name</TableCell>
                <TableCell>Course Allotted</TableCell>
                <TableCell>Number of Classes</TableCell>
                <TableCell>Total Number of Students</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {initialData.map((course, index) => (
                <TableRow key={index}>
                  <TableCell>{course.teacherName}</TableCell>
                  <TableCell>{course.courseAllotted}</TableCell>
                  <TableCell>{course.numClasses}</TableCell>
                  <TableCell>{course.totalStudents}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export { CoursesPage };
