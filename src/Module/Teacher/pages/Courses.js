import React, { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';


function CoursesPage() {
  const data = JSON.parse(localStorage.getItem('Academy'))
  const TeacherID = data.Username.split('@')[0];
  const [Mes, setMes] = useState('')
  const [Result, setResult] = useState([])
  const Navigate = useNavigate()

  useEffect(() => {
    GetClasses()
  }, [])

  
  let GetClasses = async() => {

    setMes('')
    // const url = `http://localhost:8080/GETTeacherClasses`;
    let url = `${process.env.REACT_APP_URL}/GETTeacherClasses`;
    let obj = {TeacherID}
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
    setResult(data)
   }
  }

  const handleAttandance = (classid) => {
    // console.log(`class id  recoeved is ${classid}`);
    Navigate('/dashboard/attendance', { state:classid})
 }
  
 const handleMarks = (classid) => {
  Navigate('/dashboard/marks', { state:classid})
}

  return (

    <>
      <div className='d-flex flex-wrap p-3'>
        {
          Result && Result.map((ele) => {
                return(
                  <div className="card shadow-sm m-3" style={{width: '18rem'}}>
  <div className="card-body">
    <h5 className="card-title">{ele.CourseName}</h5>
    <p className="card-text">Course Id is : {ele.CourseID}</p>
    <div className='d-flex flex-wrap justify-content-start'>
    <button className='btn btn-info m-2' onClick={() => handleAttandance(ele.CourseID)}>Attandance</button>
    <button className='btn btn-danger m-2' onClick={() => handleMarks(ele.CourseID)}>Marks</button>
    </div>
  </div>
</div>
                )
          })
        }
     
      {Mes && <div className='d-flex flex-wrap justify-content-center'>{Mes}</div>}
      </div>
    </>
  );
}

export { CoursesPage };
