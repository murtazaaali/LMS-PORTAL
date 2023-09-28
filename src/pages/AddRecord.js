import { useState } from 'react';
import { Button } from '@mui/material';
import { useFormik } from 'formik';

import { AddRecordSchema } from './validationSchema';

function AddRecord() {
  const [Mes, setMes] = useState(null);

  const AddRecordValues = {
    Date: '',
    Type: '',
    SubmitedBy: '',
    StudentID: '',
    Amount: '',
  };

  const SubmitRecord = async (obj) => {
    console.log('working .. )');
    let Data = { ...obj };
    console.log(Data);

    const url = `${process.env.REACT_APP_URL}/AddRecord`;
    // const result =
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(Data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);

        setMes('Record Successfuly inserted');
      })
      .catch((err) => {
        console.error(err);
        setMes('Some technical Issue occour');
      });
  };
  const formik = useFormik({
    initialValues: AddRecordValues,
    validationSchema: AddRecordSchema,
    onSubmit: (values) => {
      //   console.log(values);
      SubmitRecord({ ...values });
    },
  });
  return (
    <>
      <div className="conatainer m-4">
        <form onSubmit={formik.handleSubmit}>
          <div className="card shadow-sm border- m-3 p-4" style={{ backgroundColor: '#F9FAFB' }}>
            <div className="row d-flex flex-wrap col-12 m-3">
              <h4 className="h4">Add Record</h4>
            </div>
            <div className="d-flex flex-wrap justify-content-center">
              <div className="row d-flex flex-wrap col-12 mt-2">
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Sr.</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input className="form-control h-100 shadow-sm" type="text" name="Srno" />
                  </div>
                </div>
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Type</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <select
                      name="Type"
                      className="form-control shadow-sm"
                      onChange={formik.handleChange}
                      value={formik.values.Type}
                    >
                      <option className="dropdown-item" value="">
                        --Choose an option--
                      </option>
                      <option className="dropdown-item" value="Expenses">
                        Expenses
                      </option>
                      <option className="dropdown-item" value="Sales">
                        Sales
                      </option>
                    </select>
                  </div>

                  {formik.touched.Type && formik.errors.Type ? (
                    <div className="text-danger">{formik.errors.Type}</div>
                  ) : null}
                </div>
              </div>
              <div className="row d-flex flex-wrap col-12 mt-2">
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Ammount</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="text"
                      name="Amount"
                      onChange={formik.handleChange}
                      value={formik.values.Amount}
                    />
                  </div>
                  {formik.touched.Amount && formik.errors.Amount ? (
                    <div className="text-danger">{formik.errors.Amount}</div>
                  ) : null}
                </div>
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">SubmitedBy</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="text"
                      name="SubmitedBy"
                      onChange={formik.handleChange}
                      value={formik.values.SubmitedBy}
                    />
                  </div>
                  {formik.touched.SubmitedBy && formik.errors.SubmitedBy ? (
                    <div className="text-danger">{formik.errors.SubmitedBy}</div>
                  ) : null}
                </div>
              </div>
              <div className="row d-flex flex-wrap col-12 mt-2">
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Date</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="date"
                      name="Date"
                      onChange={formik.handleChange}
                      value={formik.values.Date}
                    />
                  </div>
                  {formik.touched.Date && formik.errors.Date ? (
                    <div className="text-danger">{formik.errors.Date}</div>
                  ) : null}
                </div>
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Student ID</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="text"
                      name="StudentID"
                      onChange={formik.handleChange}
                      value={formik.values.StudentID}
                    />
                  </div>
                  {formik.touched.StudentID && formik.errors.StudentID ? (
                    <div className="text-danger">{formik.errors.StudentID}</div>
                  ) : null}
                </div>
              </div>

              <div className="m-3">
                {Mes && (
                  <div className="d-flex justify-content-center">
                    <h3>{Mes}</h3>
                  </div>
                )}
                <Button variant="contained" color="error" type="submit">
                  Add New Record
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export { AddRecord };
