import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import {
  Container,
  Typography,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@mui/material';



const AttendancePage = () => {
 
  const data = JSON.parse(localStorage.getItem('Academy'))
  const TeacherID = data.Username.split('@')[0];
  const location = useLocation()
  const CourseID = location.state
  const [Mes, setMes] = useState('')
  const [Result, setResult] = useState([])
  const [AttandanceDetails, setAttandanceDetails] = useState({})
  const [AttandanceDate, setAttandanceDate] = useState('')

  useEffect(() => {
    GetStudents()
    
  }, [])
  let GetStudents = async() => {
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
    setMes('Some Issue Found')
   }else{
    let data = await response.json()
    
    // console.log(data);

    let students = data[0].Students
    setResult(students)

    // console.log(students);
    
    // Set Pre Values

    students.forEach((students) => {
      AttandanceDetails[students.studentID] = 'Present';
    });

   }
  }
  

  let InsertAttandance = async() => {
    if(AttandanceDate === '' && !AttandanceDate){
      alert('Kindly select Date')
    }else{
      let Attandancedata = {...AttandanceDetails, AttandanceDate}
      let data = {Attandancedata, CourseID}
      // console.log(data);
      const url = `http://localhost:8080/AddAttandance`;
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

   
     
  }

  return (
   
    <>
    {CourseID ?  (

      <>

<Container maxWidth="xl">
  <Typography variant="h4" sx={{ mb: 5 }}>
  Attendance Page
 </Typography>
   <Grid container spacing={3}>
     <Grid item xs={12} md={4} style={{display:'flex'}}>
     <Typography variant="h6" sx={{ mb: 5, pr:2 }}>
  Attendance Date
 </Typography>
        <Grid item xs={12} md={4}>
          <input
            type="date"
            name="AttendanceDate"
            className="form-control shadow-sm"
            onChange={(e) => setAttandanceDate(e.target.value)}
          />
        </Grid>
      </Grid>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Roll No</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Option</TableCell>
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
                <select className="form-select" name={ele.studentID}  aria-label="Default select example" onChange={(e) => setAttandanceDetails({...AttandanceDetails, [e.target.name] : e.target.value})}>         
  <option value="Present" >Present</option>
  <option value="Absend">Absent</option>
</select>
                
              </TableCell>
            </TableRow>
              </>
            )}
          )}
        </TableBody>
      </Table>
      </Grid>
      <div className="d-flex justify-content-center mt-3">
        <Button variant="contained" color="primary" onClick={InsertAttandance}>
          Submit
        </Button>
      </div>
      {Mes && <div>{Mes}</div>}
    </Container>
      </>
    ) : 'Course ID  not found Page kindly select course from Courses'}
    
    </>
  );
};

export { AttendancePage };
