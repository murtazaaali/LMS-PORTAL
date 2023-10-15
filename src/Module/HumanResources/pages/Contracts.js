import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ContractValidation = Yup.object({
  Name: Yup.string().required('Company Name is Required'),
  StartDate: Yup.string().required('Start Date is Required'),
  EndDate: Yup.string().required('End Date is Required'),
  Amount: Yup.number('invalid input').required('Amount is Required').positive('Add Positive value'),
});

function ContractPage() {
  const [Mes, setMes] = useState('');

  let InsertContract = async (obj) => {
    setMes('');
    try {
      // let url = 'http://localhost:8080/RegisterContract';
      const url = `${process.env.REACT_APP_URL}/RegisterContract`;
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

  const RegisterContractValue = {
    Name: '',
    StartDate: '',
    EndDate: '',
    Amount: '',
  };

  const formik = useFormik({
    initialValues: RegisterContractValue,
    validationSchema: ContractValidation,
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
                  <h6 className="h6 mt-2">Company Name</h6>
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
                  <h6 className="h6 mt-2">Start Date</h6>
                </div>
                <div className="col-lg-8 col-12">
                  <input
                    className="form-control h-100 shadow-sm"
                    type="date"
                    name="StartDate"
                    onChange={formik.handleChange}
                    value={formik.values.StartDate}
                  />
                </div>
                {formik.touched.StartDate && formik.errors.StartDate ? (
                  <div className="text-danger">{formik.errors.StartDate}</div>
                ) : null}
              </div>

              {/* End Date */}
              <div className="col-12 col-lg-6 mt-3 d-flex flex-wrap">
                <div className="col-lg-4 col-12">
                  <h6 className="h6 mt-2">End Date</h6>
                </div>
                <div className="col-lg-8 col-12">
                  <input
                    className="form-control h-100 shadow-sm"
                    type="date"
                    name="EndDate"
                    onChange={formik.handleChange}
                    value={formik.values.EndDate}
                  />
                </div>
                {formik.touched.EndDate && formik.errors.EndDate ? (
                  <div className="text-danger">{formik.errors.EndDate}</div>
                ) : null}
              </div>

              {/* Amount */}
              <div className="col-12 col-lg-6 mt-3 d-flex flex-wrap">
                <div className="col-lg-4 col-12">
                  <h6 className="h6 mt-2">Amount</h6>
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
  );
}

export { ContractPage };
