import { useState, useRef } from 'react';
import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { AddmsionSchema } from './validationSchema';

// useNavigate
function StudentAdmission() {
  // const [formData, setFormData] = useState();
  const [img, setImg] = useState();
  const [Mes, setMes] = useState(null);
  const ref = useRef(null);
  const location = useLocation();
  const Data = location.state;
  const Navigate = useNavigate();

  const selectImg = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImg(URL.createObjectURL(e.target.files[0]));
    }
  };

  const InsertData = async (obj) => {
    console.log('Data Recievd .. )');
    let addData = {
      Student_ID: Data.Student_ID,
      DOB: Data.DOB,
      StudentName: Data.StudentName,
      AppliedCourse: Data.AppliedCourse,
      DoneBy: Data.DoneBy,
      DealBy: Data.DealBy,
      ...obj,
    };
    console.log(addData);
    // console.log(obj);
    const url = `${process.env.REACT_APP_URL}/AdmissionStudent`;
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(addData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        ref.current.complete();
        setMes('Record Successfuly inserted');
      })
      .catch((err) => {
        console.error(err);
        setMes('Some technical Issue occour');
        ref.current.complete();
      });
    if (window.confirm('Go to Add Query Page For Fill Student Page ..!')) {
      Navigate(`/dashboard/query`);
    }
  };

  const StudentAdmissionValues = {
    // AppliedCourse: '',
    // StudentName: '',
    GuardianName: '',
    // DOB: '',
    Gender: '',
    CNIC: '',
    GuardianContact: '',
    Email: '',
    PostalAddress: '',
    firstInstallment: '',
    firstInstallmentDate: '',
    secondInstallment: '',
    secondInstallmentDate: '',
    thirdInstallment: '',
    thirdInstallmentDate: '',
    Addmissiondate: '',
    AdmissionCoordinator: '',
    // RegNo: '',
    Remarks: '',
    // RollNo: '',
    // img: '',
    CampusManager: '',
    Installment: '',
    FeePackege: '',
    FullFee: '',
    DegreeCerifcate: '',
    Institute: '',
    DegreeYear: '',
    DegreeMarks: '',
  };
  const formik = useFormik({
    initialValues: StudentAdmissionValues,
    validationSchema: AddmsionSchema,
    onSubmit: (values) => {
      // console.log(JSON.stringify(values, null, 2));
      InsertData({ ...values });
      // console.log(values);
    },
  });
  return (
    <>
      {Data ? (
        <form onSubmit={formik.handleSubmit}>
          <LoadingBar color="#f11946" ref={ref} />
          <div className="conatiner-fluid p-0 m-0">
            <div className="container">
              <h1 className="h1 text-center m-3" style={{ color: 'red' }}>
                Addmission Form
              </h1>
              <div className="flex justify-content-center m-5">
                <div className="col-12">
                  <div className="row m-1 p-0">
                    <h6 className="h6 col-sm-2 col-form-label text-center">Course For Applied</h6>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control shadow-sm"
                        name="AppliedCourse"
                        // onChange={formik.handleChange}
                        // value={formik.values.AppliedCourse}
                        defaultValue={Data.AppliedCourse}
                        readOnly
                      />
                      {/* {formik.touched.AppliedCourse && formik.errors.AppliedCourse ? (
                        <div className="text-danger">{formik.errors.AppliedCourse}</div>
                      ) : null} */}
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <h6 className="h6">Personal Information</h6>
                  <hr />
                </div>

                <div className="row card shadow-lg p-3">
                  <div className="col-12 d-flex flex-wrap justify-content-center">
                    {/* Right Section */}
                    <div className="col-lg-8 col-sm-12">
                      <div className="d-flex flex-wrap justify-content-center m-2">
                        <div className="col-md-3 col-12">
                          <h6 className="h6">Name of Student :</h6>
                        </div>
                        <div className="col-md-8 col-12">
                          <input
                            className="form-control h-100 shadow-sm"
                            type="text"
                            name="StudentName"
                            defaultValue={Data.StudentName}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-wrap justify-content-center m-2">
                        <div className="col-md-3 col-12">
                          <h6 className="h6">Guardian Name :</h6>
                        </div>
                        <div className="col-md-8 col-12">
                          <input
                            className="form-control h-100 shadow-sm"
                            type="text"
                            name="GuardianName"
                            onChange={formik.handleChange}
                            value={formik.values.GuardianName}
                          />
                        </div>
                        {formik.touched.GuardianName && formik.errors.GuardianName ? (
                          <div className="text-danger">{formik.errors.GuardianName}</div>
                        ) : null}
                      </div>
                      <div className="d-flex flex-wrap justify-content-center m-2">
                        <div className="col-md-3 col-12">
                          <h6 className="h6">Date Of Birth:</h6>
                        </div>
                        <div className="col-md-8 col-12">
                          <input
                            className="form-control h-100 shadow-sm"
                            type="DOB"
                            name="DOB"
                            defaultValue={Data.DOB}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-wrap justify-content-center m-2">
                        <div className="col-md-3 col-12">
                          <h6 className="h6">Gender:</h6>
                        </div>
                        <div className="col-md-8 col-12">
                          <select
                            name="Gender"
                            className="form-control shadow-sm"
                            id=""
                            onChange={formik.handleChange}
                            value={formik.values.Gender}
                          >
                            <option className="dropdown-item" value="">
                              --Choose an option--
                            </option>
                            <option className="dropdown-item" value="male">
                              Male
                            </option>
                            <option className="dropdown-item" value="female">
                              Female
                            </option>
                          </select>
                        </div>
                        {formik.touched.Gender && formik.errors.Gender ? (
                          <div className="text-danger">{formik.errors.Gender}</div>
                        ) : null}
                      </div>
                      <div className="d-flex flex-wrap justify-content-center m-2">
                        <div className="col-md-3 col-12">
                          <h6 className="h6">CNIC :</h6>
                        </div>
                        <div className="col-md-8 col-12">
                          <input
                            className="form-control shadow-sm h-100"
                            type="number"
                            name="CNIC"
                            onChange={formik.handleChange}
                            value={formik.values.CNIC}
                          />
                        </div>
                        {formik.touched.CNIC && formik.errors.CNIC ? (
                          <div className="text-danger">{formik.errors.CNIC}</div>
                        ) : null}
                      </div>
                    </div>
                    {/* Left Section */}
                    <div className="card shadow-sm col-md-4 col-12 p-5 d-flex justify-content-center">
                      <img src={img} className="img-fluid rounded-start" alt="..." />
                      <input type="file" name="img" onChange={selectImg} />
                    </div>
                  </div>
                  <div className="d-flex flex-wrap justify-content-center m-2">
                    <div className="col-md-2 col-12">
                      <h6 className="h6">Guardian Contact:</h6>
                    </div>
                    <div className="col-10">
                      <input
                        className="form-control shadow-sm h-100"
                        type="number"
                        name="GuardianContact"
                        onChange={formik.handleChange}
                        value={formik.values.GuardianContact}
                      />
                    </div>
                    {formik.touched.GuardianContact && formik.errors.GuardianContact ? (
                      <div className="text-danger">{formik.errors.GuardianContact}</div>
                    ) : null}
                  </div>
                  <div className="d-flex flex-wrap justify-content-center m-2">
                    <div className="col-md-2 col-12">
                      <h6 className="h6">Email :</h6>
                    </div>
                    <div className="col-10">
                      <input
                        className="form-control shadow-sm h-100"
                        type="email"
                        name="Email"
                        onChange={formik.handleChange}
                        value={formik.values.Email}
                      />
                    </div>
                    {formik.touched.Email && formik.errors.Email ? (
                      <div className="text-danger">{formik.errors.Email}</div>
                    ) : null}
                  </div>
                  <div className="d-flex flex-wrap justify-content-center m-2">
                    <div className="col-md-2 col-12">
                      <h6 className="h6">Postal Address :</h6>
                    </div>
                    <div className="col-10">
                      <input
                        className="form-control shadow-sm h-100"
                        type="text"
                        name="PostalAddress"
                        onChange={formik.handleChange}
                        value={formik.values.PostalAddress}
                      />
                    </div>
                    {formik.touched.PostalAddress && formik.errors.PostalAddress ? (
                      <div className="text-danger">{formik.errors.PostalAddress}</div>
                    ) : null}
                  </div>
                </div>

                {/* Academic Record */}

                <div className="col-12">
                  <div className="col-12 mt-5 mb-5">
                    <h6 className="">ACADEMIC RECORD</h6>
                    <hr />
                  </div>

                  {/* table */}

                  <table className="table  table-bordered border-white">
                    <thead className="table-dark">
                      <tr className="mb-2">
                        <th scope="col">
                          <select
                            name="DegreeCerifcate"
                            className="form-control"
                            id=""
                            onChange={formik.handleChange}
                            value={formik.values.DegreeCerifcate}
                          >
                            <option className="dropdown-item" value="">
                              --Certificate/Degree--
                            </option>
                            <option className="dropdown-item" value="BSCS">
                              BSCS
                            </option>
                            <option className="dropdown-item" value="BSIT">
                              BSIT
                            </option>
                          </select>
                          {formik.touched.DegreeCerifcate && formik.errors.DegreeCerifcate ? (
                            <div className="text-danger">{formik.errors.DegreeCerifcate}</div>
                          ) : null}
                        </th>
                        <th scope="col">
                          <select
                            name="Institute"
                            className="form-control"
                            id=""
                            onChange={formik.handleChange}
                            value={formik.values.Institute}
                          >
                            <option className="dropdown-item" value="">
                              --Collage/University--
                            </option>
                            <option className="dropdown-item" value="MAO">
                              MAO
                            </option>
                            <option className="dropdown-item" value="PU">
                              PU
                            </option>
                          </select>
                          {formik.touched.Institute && formik.errors.Institute ? (
                            <div className="text-danger">{formik.errors.Institute}</div>
                          ) : null}
                        </th>
                        <th scope="col">
                          <input
                            className=" form-control"
                            type="number"
                            name="DegreeYear"
                            placeholder="Year"
                            onChange={formik.handleChange}
                            value={formik.values.DegreeYear}
                          />
                          {formik.touched.DegreeYear && formik.errors.DegreeYear ? (
                            <div className="text-danger">{formik.errors.DegreeYear}</div>
                          ) : null}
                        </th>
                        <th scope="col">
                          <input
                            className=" form-control"
                            type="number"
                            name="DegreeMarks"
                            placeholder="Marks %"
                            onChange={formik.handleChange}
                            value={formik.values.DegreeMarks}
                          />
                          {formik.touched.DegreeMarks && formik.errors.DegreeMarks ? (
                            <div className="text-danger">{formik.errors.DegreeMarks}</div>
                          ) : null}
                        </th>
                      </tr>
                    </thead>
                    {/* <tbody className="border-dark">
                      <tr>
                        <th>BSCS</th>
                        <td>PU</td>
                        <td>2023</td>
                        <td>80%</td>
                      </tr>
                    </tbody> */}
                  </table>
                </div>

                <div className="col-12">
                  <div className="col-12 mt-3 mb-3">
                    <h6 className="">DECLERATION</h6>
                    <hr />
                  </div>
                </div>

                <div className="col-12">
                  <div className="card mb-3 shadow-lg rouded-0 ">
                    <div className="row g-0 p-3 justify-content-center text-start">
                      <div className="col-md-8">
                        <div className="card-body">
                          <ul>
                            <li>
                              I hearby confirm that the information provided by me is true to best of my knowledge
                            </li>
                            <li>I shall adibe by the Rules and Regulations of the institute</li>
                            <li>Fee once paid is not refundable</li>
                            <li>
                              In case of any dispute arise between institute and student in any respect, the decsion of
                              College management shall stant final and student shall not be liable to apply before any
                              court
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-md-5 p-5 col-lg-3 border border-3 border-dark">
                        <h6 className="h6 text-center">Signature</h6>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="col-12">
                    <h6 className="mt-5 mb-3">For Office Use Only</h6>
                    <hr />
                  </div>

                  <div className="d-flex flex-wrap col-12 justify-content-center">
                    <div className="col-12 col-md-5 card shadow-lg m-1 p-3 m-2">
                      <div className="d-flex flex-wrap m-1">
                        <div className="col-lg-3 col-12">
                          <h6 className="h6">Reg No</h6>
                        </div>
                        <div className="col-12 col-md-8">
                          <input
                            type="text"
                            className="form-control shadow-sm"
                            name="RegNo"
                            // onChange={formik.handleChange}
                            // value={formik.values.RegNo}
                            defaultValue={Data.Student_ID}
                            readOnly
                          />
                        </div>
                        {/* {formik.touched.RegNo && formik.errors.RegNo ? (
                          <div className="text-danger">{formik.errors.RegNo}</div>
                        ) : null} */}
                      </div>
                      <div className="d-flex flex-wrap m-1">
                        <div className="col-lg-3 col-12">
                          <h6 className="h6">Roll No</h6>
                        </div>
                        <div className="col-12 col-md-8">
                          <input
                            type="text"
                            className="form-control shadow-sm"
                            name="RollNo"
                            // onChange={formik.handleChange}
                            // value={formik.values.RollNo}
                            defaultValue={Data.Student_ID}
                            readOnly
                          />
                        </div>
                        {/* {formik.touched.RollNo && formik.errors.RollNo ? (
                          <div className="text-danger">{formik.errors.RollNo}</div>
                        ) : null} */}
                      </div>
                      <div className="d-flex flex-wrap m-1">
                        <div className="col-lg-3 col-12">
                          <h6 className="h6">Admission Date</h6>
                        </div>
                        <div className="col-12 col-md-8">
                          <input
                            type="date"
                            className="form-control shadow-sm"
                            name="Addmissiondate"
                            onChange={formik.handleChange}
                            value={formik.values.Addmissiondate}
                          />
                        </div>
                        {formik.touched.Addmissiondate && formik.errors.Addmissiondate ? (
                          <div className="text-danger">{formik.errors.Addmissiondate}</div>
                        ) : null}
                      </div>
                      <div className="d-flex flex-wrap m-1">
                        <div className="col-lg-3 col-12">
                          <h6 className="h6">Admission Coordinator</h6>
                        </div>
                        <div className="col-12 col-md-8">
                          <input
                            type="text"
                            className="form-control shadow-sm"
                            name="AdmissionCoordinator"
                            onChange={formik.handleChange}
                            value={formik.values.AdmissionCoordinator}
                          />
                        </div>
                        {formik.touched.AdmissionCoordinator && formik.errors.AdmissionCoordinator ? (
                          <div className="text-danger">{formik.errors.AdmissionCoordinator}</div>
                        ) : null}
                      </div>
                      <div className="d-flex flex-wrap m-1">
                        <div className="col-lg-3 col-12">
                          <h6 className="h6">Campus Manager</h6>
                        </div>
                        <div className="col-12 col-md-8">
                          <input
                            type="text"
                            className="form-control shadow-sm"
                            name="CampusManager"
                            onChange={formik.handleChange}
                            value={formik.values.CampusManager}
                          />
                        </div>
                        {formik.touched.CampusManager && formik.errors.CampusManager ? (
                          <div className="text-danger">{formik.errors.CampusManager}</div>
                        ) : null}
                      </div>
                    </div>

                    <div className="col-12 col-md-5 card shadow-lg m-1 p-3 m-2">
                      <div className="d-flex flex-wrap m-1">
                        <div className="col-lg-3 col-12">
                          <h6 className="h6">Fee Packege</h6>
                        </div>
                        <div className="col-12 col-md-8">
                          <input
                            type="number"
                            className="form-control shadow-sm"
                            name="FeePackege"
                            onChange={formik.handleChange}
                            value={formik.values.FeePackege}
                          />
                        </div>
                        {formik.touched.FeePackege && formik.errors.FeePackege ? (
                          <div className="text-danger">{formik.errors.FeePackege}</div>
                        ) : null}
                      </div>

                      <div className="d-flex flex-wrap m-1">
                        <div className="col-lg-3 col-12">
                          <h6 className="h6">Full fee</h6>
                        </div>
                        <div className="col-12 col-md-8">
                          <input
                            type="text"
                            className="form-control shadow-sm"
                            name="FullFee"
                            onChange={formik.handleChange}
                            value={formik.values.FullFee}
                          />
                        </div>
                        {formik.touched.FullFee && formik.errors.FullFee ? (
                          <div className="text-danger">{formik.errors.FullFee}</div>
                        ) : null}
                      </div>
                      <div className="d-flex flex-wrap m-1">
                        <div className="col-lg-3 col-12">
                          <h6 className="h6">Installment</h6>
                        </div>
                        <div className="col-12 col-md-8">
                          <input
                            type="text"
                            className="form-control shadow-sm"
                            name="Installment"
                            onChange={formik.handleChange}
                            value={formik.values.Installment}
                          />
                        </div>
                        {formik.touched.Installment && formik.errors.Installment ? (
                          <div className="text-danger">{formik.errors.Installment}</div>
                        ) : null}
                      </div>

                      <div className="card shadow-sm m-1 p-2">
                        <div className="d-flex flex-wrap">
                          <div className="m-1">
                            <h6 className="h6">1st</h6>
                          </div>
                          <div className="col-md-4 col-12">
                            <input
                              type="text"
                              className="form-control"
                              name="firstInstallment"
                              onChange={formik.handleChange}
                              value={formik.values.firstInstallment}
                            />
                          </div>
                          {formik.touched.firstInstallment && formik.errors.firstInstallment ? (
                            <div className="text-danger">{formik.errors.firstInstallment}</div>
                          ) : null}
                          <div className="m-1">
                            <h6 className="h6">Date</h6>
                          </div>
                          <div className="col-md-5 col-12">
                            <input
                              type="date"
                              className="form-control"
                              name="firstInstallmentDate"
                              onChange={formik.handleChange}
                              value={formik.values.firstInstallmentDate}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="card shadow-sm m-1 p-2">
                        <div className="d-flex flex-wrap">
                          <div className="m-1">
                            <h6 className="h6">2nd</h6>
                          </div>
                          <div className="col-md-4 col-12">
                            <input
                              type="text"
                              className="form-control"
                              name="secondInstallment"
                              onChange={formik.handleChange}
                              value={formik.values.secondInstallment}
                            />
                          </div>
                          {formik.touched.secondInstallment && formik.errors.secondInstallment ? (
                            <div className="text-danger">{formik.errors.secondInstallment}</div>
                          ) : null}
                          <div className="m-1">
                            <h6 className="h6">Date</h6>
                          </div>
                          <div className="col-md-5 col-12">
                            <input
                              type="date"
                              className="form-control"
                              name="secondInstallmentDate"
                              onChange={formik.handleChange}
                              value={formik.values.secondInstallmentDate}
                            />
                          </div>
                          {formik.touched.secondInstallmentDate && formik.errors.secondInstallmentDate ? (
                            <div className="text-danger">{formik.errors.secondInstallmentDate}</div>
                          ) : null}
                        </div>
                      </div>

                      <div className="card shadow-sm m-1 p-2">
                        <div className="d-flex flex-wrap">
                          <div className="m-1">
                            <h6 className="h6">3rd</h6>
                          </div>
                          <div className="col-md-4 col-12">
                            <input
                              type="text"
                              className="form-control"
                              name="thirdInstallment"
                              onChange={formik.handleChange}
                              value={formik.values.thirdInstallment}
                            />
                          </div>
                          {formik.touched.thirdInstallment && formik.errors.thirdInstallment ? (
                            <div className="text-danger">{formik.errors.thirdInstallment}</div>
                          ) : null}
                          <div className="m-1">
                            <h6 className="h6">Date</h6>
                          </div>
                          <div className="col-md-5 col-12">
                            <input
                              type="date"
                              className="form-control"
                              name="thirdInstallmentDate"
                              onChange={formik.handleChange}
                              value={formik.values.thirdInstallmentDate}
                            />
                          </div>
                          {formik.touched.thirdInstallmentDate && formik.errors.thirdInstallmentDate ? (
                            <div className="text-danger">{formik.errors.thirdInstallmentDate}</div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="row m-2 p-0">
                    <h2 className="col-sm-2 h2 col-form-label">Remarks :</h2>
                    <div className="col-sm-10">
                      <hr />
                    </div>
                  </div>
                  <input
                    className="form-control shadow-sm h-100"
                    type="textarea"
                    name="Remarks"
                    onChange={formik.handleChange}
                    value={formik.values.Remarks}
                  />
                  {formik.touched.Remarks && formik.errors.Remarks ? (
                    <div className="text-danger">{formik.errors.Remarks}</div>
                  ) : null}
                </div>

                <div className="col-12 m-5 d-flex justify-content-center">
                  {Mes && <div className="d-flex justify-content-center p-3">{Mes}</div>}
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>

                {/* </form> */}
              </div>
              {/* } */}
            </div>
          </div>
        </form>
      ) : (
        <div className="d-flex justify-content-center">Kindly Select Active Student for Admission Student</div>
      )}
    </>
  );
}

export default StudentAdmission;
