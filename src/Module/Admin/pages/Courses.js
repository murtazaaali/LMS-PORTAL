import { React, useEffect, useRef, useState } from 'react';
import LoadingBar from 'react-top-loading-bar';
import { useNavigate } from 'react-router-dom';

function Courses() {
  const [Mes, setMes] = useState(null);
  const ref = useRef(null);
  // const classArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let [CoursesList, setCoursesList] = useState(null);
  let [Course, setCourse] = useState([])
  const Navigate = useNavigate();


  useEffect(() => {
    GETProgramList()
  },[])

  const handleAssign = () => {
    Navigate('/dashboard/assign');
  };

  const handleProgram = () =>{
    Navigate('/dashboard/program');
  }

  const GETProgramList = async () => {
    setMes('');
    // let url = `http://localhost:8080/GETProgramList`;
    let url = `${process.env.REACT_APP_URL}/GETProgramList`;
    try {
      let response = await fetch(url, {
        method: 'GET'
      });
      if (!response.ok) {
        setMes('Netwrok Error');
      }

      const data = await response.json();
      setCoursesList(data);
      // console.log(data);
    } catch (err) {
      setMes(err.message);
    }
  };

  const AddCourse = async () => {
    setMes('')
    if(!Course || Course ===' ' || Course === null){
      alert('Kindly select Course')
    }else{
    let date =  new Date().getFullYear().toString().substring(2);
    let CourseID = `${Course.replace(/\s/g, '')}-S${date}`;
    let Data = {CourseName : Course, CourseID,Teacher: 'TOA', Students : [], Attandance : [], Marks : []}

    try {
      // const url = `http://localhost:8080/RegisterCourse`;
      let url = `${process.env.REACT_APP_URL}/RegisterCourse`;
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(Data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        setMes(data.message);
      } else {
        // console.error('HTTP error:', response.status);
        setMes('HTTP Error :', response.status);
      }
    } catch (error) {
      ref.current.complete();
      console.error('Error:', error);
      setMes(`Some Technical Issue Found ... )`);
    }
  }
  
    

  };

  
  return (
    <>
      <div className="container-fluid">
          <LoadingBar color="#f11946" ref={ref} />
          <div className="conatainer m-4">
            <div className="card shadow-sm border- m-3 p-4" style={{ backgroundColor: '#F9FAFB' }}>
              {/* Assgin Course */}
              <div className="col-12 d-flex justify-content-end m-3">
                <button className="btn btn-info p-2 ps-4 pe-4 m-3" onClick={handleAssign}>
                  Assign Course
                </button>
                <button className="btn btn-warning p-2 ps-4 pe-4 m-3" onClick={handleProgram}>
                  Add Program
                </button>
              </div>
              <div className="row d-flex flex-wrap col-12 m-3">
                <h4 className="h4">Add Course</h4>
              </div>
              <div className="d-flex flex-wrap justify-content-center">
                <div className="row d-flex flex-wrap col-12 mt-2">
                  <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                    <div className="col-lg-4 col-12">
                      <h6 className="h6 mt-2">Course Name</h6>
                    </div>

                    <div className="col-lg-8 col-12">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="TeacherName"
                    onChange={(e) => setCourse(e.target.value)}
                  >
                    <option selected>{''}</option>
                    {CoursesList &&
                      CoursesList.map((ele) => {
                        return (
                          <>
                            <option value={ele.ProgramName}>{ele.ProgramName}</option>
                          </>
                        );
                      })}
                  </select>
                </div>
                  </div>
                  {/* <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                    <div className="col-lg-4 col-12">
                      <h6 className="h6 mt-2">Course ID</h6>
                    </div>
                    <div className="col-lg-8 col-12">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        name="Class"
                        onChange={formik.handleChange}
                        value={formik.values.Class}
                      >
                        <option selected>Open this select menu</option>
                        {classArray.map((ele) => {
                          return (
                            <>
                              <option value={`C${ele}`}>{`Class ${ele}`}</option>
                            </>
                          );
                        })}
                      </select>
                    </div>
                    {formik.touched.Class && formik.errors.Class ? (
                      <div className="text-danger">{formik.errors.Class}</div>
                    ) : null}
                  </div> */}
                </div>
              </div>

              {Mes && <div className="d-flex justify-content-center p-3">{Mes}</div>}
              <div className="col-12 d-flex justify-content-center mt-5">
                <button className="btn btn-danger p-2 ps-4 pe-4" onClick={AddCourse}>
                  Submit
                </button>
              </div>
            </div>
          </div>
      </div>
    </>
  );
}


export { Courses };
