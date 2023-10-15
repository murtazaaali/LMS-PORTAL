import { React, useState, useRef, useEffect } from 'react';
import LoadingBar from 'react-top-loading-bar';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { RegisterQuerySchema } from './validationSchema';

function RegisterQuery() {
  const [StudentID, setStudentID] = useState(0);
  const [Mes, setMes] = useState('');
  const Navigate = useNavigate();
  const ref = useRef(null);

  useEffect(() => {
    GETID();
  }, []);

  const GETID = async () => {
    // const url = `${process.env.REACT_APP_URL}/QueryRegister`;
    const url = `http://localhost:8080/QueryRegister`;
    await fetch(url, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        // // return res;
        // console.log(res.length);
        setStudentID(` STD_ID_0${res.length + 1}`);
      });
  };

  const InsertQuery = async (obj) => {
    setMes('');
    console.log('func runs');
    let ID = { Student_ID: StudentID };
    const Data = { ...ID, ...obj };
    // console.log(Data);
    ref.current.continuousStart();
    // console.log({ ...obj, StudentID: StudentID });
    ref.current.staticStart();

    const url = `${process.env.REACT_APP_URL}/QueryRegister`;
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(Data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setMes('Data Successfully Inserted');
      if (window.confirm('Go to Add Query ..!')) {
        Navigate('/dashboard/query');
      }
    } else {
      console.error('HTTP error:', response.status);
      setMes('HTTP Error');
    }
  };

  const RegisterQueryValues = {
    DOB: '',
    DealBy: '',
    DoneBy: '',
    Phone: '',
    QueryDate: '',
    Status1: '',
    Status2: '',
    Status3: '',
    StudentName: '',
    refrence: '',
    remarks: '',
    AppliedCourse: '',
  };

  const formik = useFormik({
    initialValues: RegisterQueryValues,
    validationSchema: RegisterQuerySchema,
    onSubmit: (values) => {
      // console.log({ ...values, StudentID: StudentID });
      InsertQuery({ ...values });
    },
  });
  return (
    <>
      <div className="container-fluid">
        <form onSubmit={formik.handleSubmit}>
          <LoadingBar color="#f11946" ref={ref} />
          <div className="conatainer m-4">
            <div className="card shadow-sm border- m-3 p-4" style={{ backgroundColor: '#F9FAFB' }}>
              <div className="row d-flex flex-wrap col-12 m-3">
                <h4 className="h4">Add Query</h4>
              </div>
              <div className="d-flex flex-wrap justify-content-center">
                <div className="row d-flex flex-wrap col-12 mt-2">
                  <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                    <div className="col-lg-4 col-12">
                      <h6 className="h6 mt-2">Student ID</h6>
                    </div>
                    <div className="col-lg-8 col-12">
                      <input
                        className="form-control h-100 shadow-sm"
                        type="text"
                        name="STD_ID"
                        onChange={formik.handleChange}
                        value={StudentID}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                    <div className="col-lg-4 col-12">
                      <h6 className="h6 mt-2">Student Name</h6>
                    </div>
                    <div className="col-lg-8 col-12">
                      <input
                        className="form-control h-100 shadow-sm"
                        type="text"
                        name="StudentName"
                        onChange={formik.handleChange}
                        value={formik.values.StudentName}
                      />
                    </div>
                    {formik.touched.StudentName && formik.errors.StudentName ? (
                      <div className="text-danger">{formik.errors.StudentName}</div>
                    ) : null}
                  </div>
                  <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                    <div className="col-lg-4 col-12">
                      <h6 className="h6 mt-2">Date</h6>
                    </div>
                    <div className="col-lg-8 col-12">
                      <input
                        className="form-control h-100 shadow-sm"
                        type="date"
                        name="QueryDate"
                        onChange={formik.handleChange}
                        value={formik.values.QueryDate}
                      />
                    </div>
                    {formik.touched.QueryDate && formik.errors.QueryDate ? (
                      <div className="text-danger">{formik.errors.QueryDate}</div>
                    ) : null}
                  </div>
                  <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                    <div className="col-lg-4 col-12">
                      <h6 className="h6 mt-2">Applied Course</h6>
                    </div>
                    <div className="col-lg-8 col-12">
                      <input
                        className="form-control h-100 shadow-sm"
                        type="text"
                        name="AppliedCourse"
                        onChange={formik.handleChange}
                        value={formik.values.AppliedCourse}
                      />
                    </div>
                    {formik.touched.AppliedCourse && formik.errors.AppliedCourse ? (
                      <div className="text-danger">{formik.errors.AppliedCourse}</div>
                    ) : null}
                  </div>
                </div>

                <div className="row d-flex flex-wrap col-12 mt-2">
                  <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                    <div className="col-lg-4 col-12">
                      <h6 className="h6 mt-2">Date of Birth</h6>
                    </div>
                    <div className="col-lg-8 col-12">
                      <input
                        className="form-control h-100 shadow-sm"
                        type="date"
                        name="DOB"
                        onChange={formik.handleChange}
                        value={formik.values.DOB}
                      />
                    </div>
                    {formik.touched.DOB && formik.errors.DOB ? (
                      <div className="text-danger">{formik.errors.DOB}</div>
                    ) : null}
                  </div>

                  <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                    <div className="col-lg-4 col-12">
                      <h6 className="h6 mt-2">Phno</h6>
                    </div>
                    <div className="col-lg-8 col-12">
                      <input
                        className="form-control h-100 shadow-sm"
                        type="text"
                        name="Phone"
                        onChange={formik.handleChange}
                        value={formik.values.Phone}
                      />
                    </div>
                    {formik.touched.Phone && formik.errors.Phone ? (
                      <div className="text-danger">{formik.errors.Phone}</div>
                    ) : null}
                  </div>
                </div>
                <div className="row d-flex flex-wrap col-12 mt-2">
                  <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                    <div className="col-lg-4 col-12">
                      <h6 className="h6 mt-2">Refrence</h6>
                    </div>
                    <div className="col-lg-8 col-12">
                      <select
                        name="refrence"
                        className="form-control shadow-sm"
                        onChange={formik.handleChange}
                        value={formik.values.refrence}
                      >
                        <option className="dropdown-item" value="">
                          --Choose an option--
                        </option>
                        <option className="dropdown-item" value="Website">
                          Website
                        </option>
                        <option className="dropdown-item" value="Friend">
                          Friend
                        </option>
                        <option className="dropdown-item" value="Friend">
                          Media
                        </option>
                        <option className="dropdown-item" value="Teacher">
                          Teacher
                        </option>
                        <option className="dropdown-item" value="Friend">
                          Other
                        </option>
                      </select>
                    </div>
                    {formik.touched.refrence && formik.errors.refrence ? (
                      <div className="text-danger">{formik.errors.refrence}</div>
                    ) : null}
                  </div>
                  <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                    <div className="col-lg-4 col-12">
                      <h6 className="h6 mt-2">Remarks :</h6>
                    </div>
                    <div className="col-lg-8 col-12">
                      <input
                        className="form-control h-100 shadow-sm"
                        type="text"
                        name="remarks"
                        onChange={formik.handleChange}
                        value={formik.values.remarks}
                      />
                    </div>
                    {formik.touched.remarks && formik.errors.remarks ? (
                      <div className="text-danger">{formik.errors.remarks}</div>
                    ) : null}
                  </div>
                </div>

                <div className="row d-flex flex-wrap col-12 mt-2">
                  <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                    <div className="col-lg-4 col-12">
                      <h6 className="h6 mt-2">DealBy</h6>
                    </div>
                    <div className="col-lg-8 col-12">
                      <input
                        className="form-control shadow-sm"
                        type="text"
                        name="DealBy"
                        id="DealBy"
                        onChange={formik.handleChange}
                        value={formik.values.DealBy}
                      />
                    </div>
                    {formik.touched.DealBy && formik.errors.DealBy ? (
                      <div className="text-danger">{formik.errors.DealBy}</div>
                    ) : null}
                  </div>
                  <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                    <div className="col-lg-4 col-12">
                      <h6 className="h6 mt-2">DoneBy</h6>
                    </div>
                    <div className="col-lg-8 col-12">
                      <input
                        className="form-control shadow-sm"
                        type="text"
                        name="DoneBy"
                        onChange={formik.handleChange}
                        value={formik.values.DoneBy}
                      />
                    </div>
                    {formik.touched.DoneBy && formik.errors.DoneBy ? (
                      <div className="text-danger">{formik.errors.DoneBy}</div>
                    ) : null}
                  </div>
                </div>

                <div className="row d-flex flex-wrap col-12 m-3">
                  <h4 className="h4">Status</h4>
                </div>

                <div className="row d-flex flex-wrap col-lg-8 col-12">
                  <h6 className="h6">Status 1</h6>
                  <select
                    name="Status1"
                    className="form-control shadow-sm"
                    onChange={formik.handleChange}
                    value={formik.values.Status1}
                  >
                    <option className="dropdown-item" value="">
                      --Choose an option--
                    </option>
                    <option className="dropdown-item" value="Active">
                      Active
                    </option>
                    <option className="dropdown-item" value="Deactive">
                      Deactive
                    </option>
                  </select>
                  {formik.touched.Status1 && formik.errors.Status1 ? (
                    <div className="text-danger">{formik.errors.Status1}</div>
                  ) : null}
                </div>

                <div className="row d-flex flex-wrap col-lg-8 col-12">
                  <h6 className="h6">Status 2</h6>
                  <select
                    name="Status2"
                    className="form-control shadow-sm"
                    onChange={formik.handleChange}
                    value={formik.values.Status2}
                  >
                    <option className="dropdown-item" value="">
                      --Choose an option--
                    </option>
                    <option className="dropdown-item" value="Active">
                      Active
                    </option>
                    <option className="dropdown-item" value="Deactive">
                      Deactive
                    </option>
                  </select>
                  {formik.touched.Status2 && formik.errors.Status2 ? (
                    <div className="text-danger">{formik.errors.Status2}</div>
                  ) : null}
                </div>

                <div className="row d-flex flex-wrap col-lg-8 col-12">
                  <h6 className="h6">Status 3</h6>
                  <select
                    name="Status3"
                    className="form-control shadow-sm"
                    onChange={formik.handleChange}
                    value={formik.values.Status3}
                  >
                    <option className="dropdown-item" value="">
                      --Choose an option--
                    </option>
                    <option className="dropdown-item" value="Active">
                      Active
                    </option>
                    <option className="dropdown-item" value="Deactive">
                      Deactive
                    </option>
                  </select>
                  {formik.touched.Status3 && formik.errors.Status3 ? (
                    <div className="text-danger">{formik.errors.Status3}</div>
                  ) : null}
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

export default RegisterQuery;
