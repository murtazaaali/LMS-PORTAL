import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Select,
  MenuItem
} from '@mui/material';

function MarksPage() {
  const data = JSON.parse(localStorage.getItem('Academy'))
  const TeacherID = data.Username.split('@')[0];
  const location = useLocation()
  const CourseID = location.state
  const [Result, setResult] = useState([])
  const [MarksDetails, setMarksDetails] = useState({})
  const [Mes, setMes] = useState('')
 

  useEffect(() => {
    GetStudents()
    
  }, [])
  let GetStudents = async() => {
    setMes('')
    // console.log(location.state);
    const url = `http://localhost:8080/GETCourseStudents`;
    let obj = {TeacherID, CourseID}
    let response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
      },
    });
   if(!response.ok){
    // setMes('Some Issue Found')
   }else{
    let data = await response.json()

    // console.log(data);

    let students = data[0].Students
    setResult(students)

    // console.log(students);
    
    // Set Pre Values

    students.forEach((students) => {
      MarksDetails[students.studentID] = '0';
    });

   }
  }
  

  let InsertMarks = async() => {
    console.log(MarksDetails);
   
      let Marks = {...MarksDetails}
      let data = {Marks, CourseID}
      // console.log(data);
      const url = `http://localhost:8080/AddMarks`;
      let response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
     if(!response.ok){
      // setMes('Some Issue Found')
     }else{
      let data = await response.json()
      console.log(data);
      // setResult(data)
      setMes(data.message)
     }
  }

  return (
   
    <>
    {CourseID ?  (

      <>

<Container maxWidth="xl">
  <Typography variant="h4" sx={{ mb: 5 }}>
  Marks Page
 </Typography>
   <Grid container spacing={3}>
     
     
    
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Roll No</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Marks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Result && Result.map((ele) =>  
            {return(
              
              <>
                  {/* {ele.studentName} */}
                  <TableRow key={ele.studentID}>
              <TableCell>{ele.studentID}</TableCell>
              <TableCell>{ele.studentName}</TableCell>
              <TableCell>
              


        <Select fullWidth label="Select Grade"  name={ele.studentID} onChange={(e) => setMarksDetails({...MarksDetails, [e.target.name] : e.target.value})}>
            <MenuItem value="A+">A+</MenuItem>
            <MenuItem value="A-">A-</MenuItem>
            <MenuItem value="B+">B+</MenuItem>
            <MenuItem value="B-">B-</MenuItem>
            <MenuItem value="C+">C+</MenuItem>
            <MenuItem value="C-">C-</MenuItem>
            <MenuItem value="D+">D+</MenuItem>
            <MenuItem value="F">F</MenuItem>
          </Select>
                
              </TableCell>
            </TableRow>
              </>
            )}
          )}
        </TableBody>
      </Table>
      </Grid>
      <div className="d-flex justify-content-center mt-3">
        <Button variant="contained" color="primary" onClick={InsertMarks}>
          Submit
        </Button>
      </div>
      {Mes && <div>{Mes}</div>}
    </Container>

      </>
    ) : 'Course ID  not found Page kindly select course from Courses'}
    
    </>
  );
}

export { MarksPage };
