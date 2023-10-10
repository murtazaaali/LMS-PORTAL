
import React, { useEffect,useState } from 'react';
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

function AttandancePage() {
  const data = JSON.parse(localStorage.getItem('Academy'))
  const StudentID = data.Username.split('@')[0];
  const location = useLocation()

  const CourseID = location.state
  // console.log(StudentID);
  // console.log(CourseID);
  const [Mes, setMes] = useState('')
  const [Result, setResult] = useState([])
  // const [AttandanceDetails, setAttandanceDetails] = useState({})
  // const [AttandanceDate, setAttandanceDate] = useState('')

  useEffect(() => {
    GetStudents()
    
  }, [])
  let GetStudents = async() => {
    setMes('')
    // console.log(location.state);
    // const url = `http://localhost:8080/GETStudentAttandance`;
    let url = `${process.env.REACT_APP_URL}/GETStudentAttandance`;
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
        status: record[StudentID],
        AttandanceDate: record.AttandanceDate
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
  Attendance Page
 </Typography>
   <Grid container spacing={3}>
    
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
 {Result && Result.map((ele) =>  
            {return(
              
              <>
                  {/* {ele.studentName} */}
                  <TableRow key={ele.studentID}>
              <TableCell>{ele.status}</TableCell>
              <TableCell>{ele.AttandanceDate}</TableCell>
             
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

export { AttandancePage };










