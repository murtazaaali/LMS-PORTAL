import { React, useRef, useState } from 'react';
import LoadingBar from 'react-top-loading-bar';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { RegisterCourse } from './ValidationSchemas';

function Courses() {
  const [Mes, setMes] = useState(null);
  const ref = useRef(null);
  const classArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const Navigate = useNavigate();

  const handleAssign = () => {
    Navigate('/dashboard/assign');
  };

  const InsertCourse = async (obj) => {
    let CourseID = `${obj.CourseName.replace(/\s/g, '')}-${obj.Class}`;
    let Data = { ...obj, CourseID, Teacher: 'TOA', Students: [] };
    console.log(Data);
    try {
      const url = `http://localhost:8080/RegisterCourse`;
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
  };

  const RegisterCourseValue = {
    CourseName: '',
    Class: '',
  };

  const formik = useFormik({
    initialValues: RegisterCourseValue,
    validationSchema: RegisterCourse,
    onSubmit: (values) => {
      //   console.log({ ...values });
      InsertCourse({ ...values });
    },
  });
  return (
    <>
      <div className="container-fluid">
        <form onSubmit={formik.handleSubmit}>
          <LoadingBar color="#f11946" ref={ref} />
          <div className="conatainer m-4">
            <div className="card shadow-sm border- m-3 p-4" style={{ backgroundColor: '#F9FAFB' }}>
              {/* Assgin Course */}
              <div className="col-12 d-flex justify-content-end m-3">
                <button className="btn btn-info p-2 ps-4 pe-4 me-5" onClick={handleAssign}>
                  Assign Course
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
                      <input
                        className="form-control h-100 shadow-sm"
                        type="text"
                        name="CourseName"
                        onChange={formik.handleChange}
                        value={formik.values.CourseName}
                      />
                    </div>
                    {formik.touched.CourseName && formik.errors.CourseName ? (
                      <div className="text-danger">{formik.errors.CourseName}</div>
                    ) : null}
                  </div>
                  <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
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
                        <option value={'Courses'}>Courses</option>
                      </select>
                    </div>
                    {formik.touched.Class && formik.errors.Class ? (
                      <div className="text-danger">{formik.errors.Class}</div>
                    ) : null}
                  </div>
                </div>
              </div>

              {Mes && <div className="d-flex justify-content-center p-3">{Mes}</div>}
              <div className="col-12 d-flex justify-content-center mt-5">
                <button className="btn btn-danger p-2 ps-4 pe-4" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export { Courses };
