
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
} from '@mui/material';


function TranscriptPage() {
  const data = JSON.parse(localStorage.getItem('Academy'))
  const StudentID = data.Username.split('@')[0];
  const location = useLocation()

  const CourseID = location.state
  const [Mes, setMes] = useState('')
  const [Result, setResult] = useState([])

  useEffect(() => {
    GetStudents()
    
  }, [])
  let GetStudents = async() => {
    setMes('')
    // console.log(location.state);
    // const url = `http://localhost:8080/GETStudentMarks`;
    let url = `${process.env.REACT_APP_URL}/GETStudentMarks`;
    let obj = {StudentID, CourseID}
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

     if(data.length<1){
          setMes('No Class Conducted')
     }
      const filteredData = data.map((record, index) => ({
        index: (index+1),
        Marks: record[StudentID],
      }));
      // console.log(filteredData);
      setResult(filteredData)
    

   }
  }
  

  return (
   
    <>
    {CourseID ?  (

      <>

<Container maxWidth="xl">
  <Typography variant="h4" sx={{ mb: 5 }}>
  Transcript Page
 </Typography>
   <Grid container spacing={3}>
    
      <Table>
        <TableHead>
          <TableRow>
          <TableCell>Sr.</TableCell>
          <TableCell>Student ID</TableCell>
            <TableCell>Marks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {Result && Result.map((ele, index) =>  
            {return(
              
              <>
                  {/* {ele.studentName} */}
                  <TableRow key={ele.Marks}>
                  <TableCell>{index}</TableCell>
                  <TableCell>{StudentID}</TableCell>
              <TableCell>{ele.Marks}</TableCell>
             
            </TableRow>
              </>
            )}
          )}
             
        </TableBody>
      </Table>
      </Grid>
     {Mes && <div>{Mes}</div>}
    </Container>
      </>
    ) : 'Course ID  not found Page kindly select course from Courses'}
    
    </>
  );
}

export { TranscriptPage };
