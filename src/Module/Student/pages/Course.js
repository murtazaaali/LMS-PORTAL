import React, { useEffect, useState} from 'react';
import {  useNavigate } from 'react-router-dom';

function CoursePage() {


  const data = JSON.parse(localStorage.getItem('Academy'))
  const StudentID = data.Username.split('@')[0];
  // console.log(StudentID);
  // const [Mes, setMes] = useState('')
  const [Result, setResult] = useState([])
  const Navigate = useNavigate()

  useEffect(() => {
    GetClasses()
  }, [])

  
  let GetClasses = async() => {

    // setMes('')
    // const url = `http://localhost:8080/GETStudentClass`;
    let url = `${process.env.REACT_APP_URL}/GETStudentClass`;
    let obj = {StudentID}
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
    setResult(data)
   }
  }

  const handleAttandance = (classid) => {
    // console.log(`class id  recoeved is ${classid}`);
    Navigate('/dashboard/attandance', { state:classid})
 }

 
 const handleMarks = (classid) => {
  // console.log(`class id  recoeved is ${classid}`);
  Navigate('/dashboard/transcript', { state:classid})
}

  return (

    <>
      <div className='d-flex flex-wrap p-3'>
       {Result && Result.map((ele) => {
         return(<>
           <div className="card shadow-sm m-3" style={{width: '18rem'}}>
  <div className="card-body">
    <h5 className="card-title">{ele.CourseName}</h5>
    <p className="card-text">{ele.CourseID}</p>
    <div className='d-flex flex-wrap justify-content-start'>
    <button className='btn btn-info m-2' onClick={() => handleAttandance(ele.CourseID)}>Attandance</button>
    <button className='btn btn-danger m-2' onClick={() => handleMarks(ele.CourseID)}>Marks</button>
    </div>
  </div>
</div>
         </>)
       })            
}
                
     
      {/* {Mes && <div className='d-flex flex-wrap justify-content-center'>{Mes}</div>} */}
      </div>
    </>
  );
}

export { CoursePage };



