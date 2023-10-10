import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ContactValidation = Yup.object({
  Name: Yup.string().required('Name is Required'),
  Designation: Yup.string().required('Designation is Required'),
  Contact: Yup.number().required('Contact Number is Required'),
  Email: Yup.string().email('invalid input').required('Email is Required')
});

function StaffContactPage() {
  const [Mes, setMes] = useState('');

  let InsertContract = async (obj) => {
    setMes('');
    console.log(obj);
    try {
      // let url = 'http://localhost:8080/RegisterContactInfo';
      let url = `${process.env.REACT_APP_URL}/RegisterContactInfo`;
      let response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ ...obj }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        console.log(`${response}`);
      }
      const data = await response.json();
      // console.log(data);
      setMes(data.message);
    } catch (err) {
      // console.log(`Error Found `);
      setMes('Http Error ..');
    }

  };

  const RegisterContactValue = {
    Name:'',
  Designation:'',
  Contact:'',
  Email:'',
  };

  const formik = useFormik({
    initialValues: RegisterContactValue,
    validationSchema: ContactValidation,
    onSubmit: async (values) => {
      InsertContract({ ...values });
    },
  });

  return (
    <div className="container m-4">
      <form onSubmit={formik.handleSubmit}>
        <div className="card shadow-sm border- m-3 p-4" style={{ backgroundColor: '#F9FAFB' }}>
          <div className="row d-flex flex-wrap col-12 m-3">
            <h4 className="h4">Add Contract</h4>
          </div>

          <div className="d-flex flex-wrap justify-content-center">
            <div className="row d-flex flex-wrap col-12 mt-2">
              {/* Company Name */}
              <div className="col-12 col-lg-6 mt-3 d-flex flex-wrap">
                <div className="col-lg-4 col-12">
                  <h6 className="h6 mt-2"> Name</h6>
                </div>
                <div className="col-lg-8 col-12">
                  <input
                    className="form-control h-100 shadow-sm"
                    type="text"
                    name="Name"
                    onChange={formik.handleChange}
                    value={formik.values.Name}
                  />
                </div>
                {formik.touched.Name && formik.errors.Name ? (
                  <div className="text-danger">{formik.errors.Name}</div>
                ) : null}
              </div>

              {/* Start Date */}
              <div className="col-12 col-lg-6 mt-3 d-flex flex-wrap">
                <div className="col-lg-4 col-12">
                  <h6 className="h6 mt-2">Designation</h6>
                </div>
                <div className="col-lg-8 col-12">
                  <input
                    className="form-control h-100 shadow-sm"
                    type="text"
                    name="Designation"
                    onChange={formik.handleChange}
                    value={formik.values.Designation}
                  />
                </div>
                {formik.touched.Designation && formik.errors.Designation ? (
                  <div className="text-danger">{formik.errors.Designation}</div>
                ) : null}
              </div>

              {/* End Date */}
              <div className="col-12 col-lg-6 mt-3 d-flex flex-wrap">
                <div className="col-lg-4 col-12">
                  <h6 className="h6 mt-2">Contact Number</h6>
                </div>
                <div className="col-lg-8 col-12">
                  <input
                    className="form-control h-100 shadow-sm"
                    type="text"
                    name="Contact"
                    onChange={formik.handleChange}
                    value={formik.values.Contact}
                  />
                </div>
                {formik.touched.Contact && formik.errors.Contact ? (
                  <div className="text-danger">{formik.errors.Contact}</div>
                ) : null}
              </div>

              {/* Amount */}
              <div className="col-12 col-lg-6 mt-3 d-flex flex-wrap">
                <div className="col-lg-4 col-12">
                  <h6 className="h6 mt-2">Email</h6>
                </div>
                <div className="col-lg-8 col-12">
                  <input
                    className="form-control h-100 shadow-sm"
                    type="text"
                    name="Email"
                    onChange={formik.handleChange}
                    value={formik.values.Email}
                  />
                </div>
                {formik.touched.Email && formik.errors.Email ? (
                  <div className="text-danger">{formik.errors.Email}</div>
                ) : null}
              </div>
            </div>
          </div>
          {Mes && <div className="d-flex justify-content-center flex-wrap pt-5">{Mes}</div>}
          <div className="col-12 d-flex justify-content-center mt-5">
            <button className="btn btn-danger p-2 ps-4 pe-4" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
    )
}

export { StaffContactPage };
