import { useState } from 'react';
import { useFormik } from 'formik';
import { useLocation } from 'react-router-dom';
import { RegisterStudentSlip } from './validationSchema';

// import { useState } from 'react';

function StudentSlip() {
  const [Mes, setMes] = useState();
  const location = useLocation();
  const Data = location.state;

  const RegisterQueryValues = {
    FeeType: '',
    Date: '',
    RecievedBy: '',
    RecievedAmmount: '',
    RecieptNO: '',
    ExamFee: '',
    LateFee: '',
    AmmountType: '',
    Dated: '',
  };

  const AddStudentSlip = async (values) => {
    try {
      const studentSlip = {
        Student_ID: Data.Student_ID,
        AppliedCourse: Data.AppliedCourse,
        FeePackege: Data.FeePackege,
        firstInstallment: Data.firstInstallment,
        secondInstallment: Data.secondInstallment,
        thirdInstallment: Data.thirdInstallment,
        DealBy: Data.DealBy,
        DoneBy: Data.DoneBy,
        ...values,
      };

      let url = `${process.env.REACT_APP_URL}/AddStudentSlip`;
      // const url = 'http://localhost:8080/AddStudentSlip';
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(studentSlip),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // const data = await response.json();
        // console.log(data);
        setMes('Data Successfully Inserted');
      } else {
        console.error('HTTP error:', response.status);
        setMes('HTTP Error');
      }
    } catch (error) {
      console.error('Error:', error);
      setMes(`Some Technical Issue Found ... )`);
    }
  };

  const formik = useFormik({
    initialValues: RegisterQueryValues,
    validationSchema: RegisterStudentSlip,
    onSubmit: (values) => {
      AddStudentSlip(values);
    },
  });
  return (
    <>
      {Data ? (
        <div className="container-fluid m-0 p-0">
          <div className="d-flex justify-content-center p-3">
            <h2 className="h2" style={{ color: 'red' }}>
              Student Slip
            </h2>
          </div>

          {/* Main Content */}
          <div className="container">
            <form onSubmit={formik.handleSubmit}>
              <div className="card d-flex shadow-sm m-2">
                <div className="col-12 d-flex flex-wrap p-2">
                  <div className="col-7">
                    <div className="col-12 d-flex m-2">
                      <div className="col-4">
                        <h6>Receipt No :</h6>
                      </div>
                      <div className="col-6">
                        <input
                          type="text"
                          className="form-control shadow-sm"
                          name="RecieptNO"
                          onChange={formik.handleChange}
                          value={formik.values.RecieptNO}
                        />
                      </div>
                    </div>

                    <div className="col-12 d-flex m-2">
                      <div className="col-4">
                        <h6>Date :</h6>
                      </div>

                      <div className="col-6">
                        <input
                          type="date"
                          className="form-control shadow-sm"
                          name="Date"
                          onChange={formik.handleChange}
                          value={formik.values.Date}
                        />
                      </div>
                    </div>

                    <div className="col-12 d-flex m-2">
                      <div className="col-4">
                        <h6>Course Title :</h6>
                      </div>
                      <div className="col-6">
                        <input
                          type="text"
                          className="form-control shadow-sm"
                          name="CourseTittle"
                          defaultValue={Data.AppliedCourse}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-4 mt-4">
                    <div className="col-12 d-flex flex-wrap">
                      <select
                        name="FeeType"
                        className="form-control shadow-sm"
                        onChange={formik.handleChange}
                        value={formik.values.FeeType}
                      >
                        <option className="dropdown-item" value="">
                          --Choose an option--
                        </option>
                        <option className="dropdown-item" value="Course">
                          Course
                        </option>
                        <option className="dropdown-item" value="Acadimecs">
                          Acadimecs Fee
                        </option>
                        <option className="dropdown-item" value="Admission">
                          Admission Fee
                        </option>
                        <option className="dropdown-item" value="Fee">
                          Fees
                        </option>
                        <option className="dropdown-item" value="Installment">
                          Installment fee
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section-2 */}

              <div className="row m-2 p-0">
                <h3 className="col-sm-2 col-form-label text-center">Recieved a sum of Rs.</h3>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control shadow-sm"
                    name="RecievedAmmount"
                    onChange={formik.handleChange}
                    value={formik.values.RecievedAmmount}
                  />
                </div>
              </div>

              <div className="row m-2 p-0">
                <h3 className="col-sm-2 col-form-label text-center">Recieved from Mr./Mrs./Ms</h3>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control shadow-sm"
                    name="RecievedBy"
                    onChange={formik.handleChange}
                    value={formik.values.RecievedBy}
                  />
                </div>
              </div>

              {/* Top Section */}
              <div className="card d-flex m-2 shadow-sm p-2">
                <div className="col-12 d-flex flex-wrap p-2">
                  <div className="col-6">
                    <div className="col-12 d-flex m-2">
                      <div className="col-4">
                        <h6>Course Fees :</h6>
                      </div>
                      <div className="col-6">
                        <input
                          type="number"
                          className="form-control shadow-sm"
                          name="CourseFee"
                          defaultValue={Data.FeePackege}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="col-12 d-flex m-2">
                      <div className="col-4">
                        <h6>Exam Fees :</h6>
                      </div>
                      <div className="col-6">
                        <input
                          type="number"
                          className="form-control shadow-sm"
                          name="ExamFee"
                          onChange={formik.handleChange}
                          value={formik.values.ExamFee}
                        />
                      </div>
                    </div>

                    <div className="col-12 d-flex m-2">
                      <div className="col-4">
                        <h6>Late Fees :</h6>
                      </div>
                      <div className="col-6">
                        <input
                          type="number"
                          className="form-control shadow-sm"
                          name="LateFee"
                          onChange={formik.handleChange}
                          value={formik.values.LateFee}
                        />
                      </div>
                    </div>

                    <div className="col-12 d-flex m-2">
                      <div className="col-4">
                        <h6>Installment 01 :</h6>
                      </div>
                      <div className="col-6">
                        <input
                          type="number"
                          className="form-control shadow-sm"
                          name="Intallment-1"
                          defaultValue={Data.firstInstallment}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="col-12 d-flex m-2">
                      <div className="col-4">
                        <h6>Installment 02 :</h6>
                      </div>
                      <div className="col-6">
                        <input
                          type="number"
                          className="form-control shadow-sm"
                          name="Intallment-2"
                          defaultValue={Data.secondInstallment}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="col-12 d-flex m-2">
                      <div className="col-4">
                        <h6>Installment 03 :</h6>
                      </div>
                      <div className="col-6">
                        <input
                          type="number"
                          className="form-control shadow-sm"
                          name="Intallment-3"
                          defaultValue={Data.thirdInstallment}
                          readOnly
                        />
                      </div>
                    </div>

                    {/* <div className="col-12 d-flex m-2">
                      <div className="col-4 m-1">
                        <h6>Total Ammount :</h6>
                      </div>
                      <div className="col-4 m-1">
                        <h6 className="h5">00</h6>
                      </div>
                      <div className="col-3 m-1">
                        <button className="btn btn-light shadow-sm">total</button>
                      </div>
                    </div> */}
                  </div>

                  <div className="col-6">
                    <div className="col-12 d-flex flex-wrap">
                      <div className="col-12 d-flex m-2">
                        <div className="col-4">
                          <h6>By Cash/Cheque # :</h6>
                        </div>
                        <div className="col-6">
                          <select
                            name="AmmountType"
                            className="form-control shadow-sm"
                            onChange={formik.handleChange}
                            value={formik.values.AmmountType}
                          >
                            <option className="dropdown-item" value="">
                              --Choose an option--
                            </option>
                            <option className="dropdown-item" value="cash">
                              Cash
                            </option>
                            <option className="dropdown-item" value="Cheque">
                              Cheque
                            </option>
                          </select>
                        </div>
                      </div>

                      <div className="col-12 d-flex m-2">
                        <div className="col-4">
                          <h6>Dated :</h6>
                        </div>
                        <div className="col-6">
                          <input
                            type="date"
                            name="Dated"
                            className="form-control shadow-sm"
                            onChange={formik.handleChange}
                            value={formik.values.Dated}
                          />
                        </div>
                      </div>

                      <div className="col-12 d-flex m-2">
                        <div className="col-4">
                          <h6>Drawn on :</h6>
                        </div>
                        <div className="col-6">
                          <input
                            type="text"
                            className="form-control shadow-sm"
                            name="DrawnON"
                            onChange={formik.handleChange}
                            value={formik.values.DrawnON}
                          />
                        </div>
                      </div>

                      <div className="col-12 d-flex m-2">
                        <div className="col-4">
                          <h6>Cheque / Cash Amount :</h6>
                        </div>
                        <div className="col-6">
                          <input
                            type="number"
                            name="paidamount"
                            className="form-control shadow-sm"
                            onChange={formik.handleChange}
                            value={formik.values.paidamount}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  {Mes && Mes}
                  <button className="btn btn-danger p-2 m-3" type="submit">
                    {' '}
                    Submit Slip{' '}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div>Kindly Activate Status of Student For Student Fee Slip</div>
      )}
    </>
  );
}

export { StudentSlip };
