// import { useState } from 'react';
import { useFormik } from 'formik';
import { ContractValidation } from './ValidationSchemas';

function ContractPage() {
  // const userData = location.state;
  // const userValues = userData.obj;
  //   const UserType = userData[UserType];
  // const [Mes, setMes] = useState([]);

  // const handleSubmit = async (obj) => {
  //   let Data = { obj, user: userData.UserType };
  // let url = `http://localhost:8080/createUser`;
  // let resp = await fetch(url, {
  //   method: 'POST',
  //   body: JSON.stringify(Data),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
  // if (!resp.ok) {
  //   setMes('Network Issue');
  // } else {
  //   let mes = await resp.json();
  //   setMes(mes.message);
  // }
  // };
  const RegisterContractValue = {
    CompanyName: '',
    StartDate: '',
    EndDate: '',
    Amount: '',
  };

  const formik = useFormik({
    initialValues: RegisterContractValue,
    validationSchema: ContractValidation,
    onSubmit: (values) => {
      console.log({ ...values });
      // InsertCourse({ ...values });
    },
  });
  return (
    <>
      <div className="conatainer m-4">
        <form onSubmit={formik.handleSubmit}>
          <div className="card shadow-sm border- m-3 p-4" style={{ backgroundColor: '#F9FAFB' }}>
            <div className="row d-flex flex-wrap col-12 m-3">
              <h4 className="h4">Add Contract</h4>
            </div>

            <div className="d-flex flex-wrap justify-content-center">
              <div className="row d-flex flex-wrap col-12 mt-2">
                <div className="col-12 col-lg-6 mt-3 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Company Name</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="text"
                      name="CompanyName"
                      onChange={formik.handleChange}
                      value={formik.values.CompanyName}
                    />
                  </div>
                  {formik.touched.CompanyName && formik.errors.CompanyName ? (
                    <div className="text-danger">{formik.errors.CompanyName}</div>
                  ) : null}
                </div>
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
            {/* {Mes && (
              <div className="d-flex justify-content-center p-3">
                <b>{Mes}</b>
              </div>
            )} */}
            <div className="col-12 d-flex justify-content-center mt-5">
              <button className="btn btn-danger p-2 ps-4 pe-4" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export { ContractPage };
