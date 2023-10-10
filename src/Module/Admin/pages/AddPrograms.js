import { React, useRef, useState } from 'react';
import LoadingBar from 'react-top-loading-bar';
import { useFormik } from 'formik';
import { ProgramSchema } from './ValidationSchemas';

function AddProgram() {
  const [Mes, setMes] = useState(null);
  const ref = useRef(null);

  
 
  let handleCourse = async(obj) => {
    setMes('')
    // const url = `http://localhost:8080/AddProgram`;
    const url = `${process.env.REACT_APP_URL}/AddProgram`;
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
        const data = await response.json();
        setMes(data.message);
      } else {
        setMes('HTTP Error :', response.status);
      }
    } 
   
  



  const RegisterProgramValue = {
    ProgramName: '',
  };

  const formik = useFormik({
    initialValues: RegisterProgramValue,
    validationSchema: ProgramSchema,
    onSubmit: (values) => {
        // console.log({ ...values });
        handleCourse({ ...values });
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
              <div className="row d-flex flex-wrap col-12 m-3">
                <h4 className="h4">Add Program</h4>
              </div>
              <div className="d-flex flex-wrap justify-content-center">
                <div className="row d-flex flex-wrap col-12 mt-2">
                  <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                    <div className="col-lg-4 col-12">
                      <h6 className="h6 mt-2">Program Name</h6>
                    </div>

                    <div className="col-lg-8 col-12">
                      <input
                        className="form-control h-100 shadow-sm"
                        type="text"
                        name="ProgramName"
                        onChange={formik.handleChange}
                        value={formik.values.ProgramName}
                      />
                    </div>
                    {formik.touched.CourseName && formik.errors.CourseName ? (
                      <div className="text-danger">{formik.errors.CourseName}</div>
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

export { AddProgram };
