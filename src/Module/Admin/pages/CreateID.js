import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function CreateID() {
  const location = useLocation();
  const userData = location.state;
  const userValues = userData.obj;
  //   const UserType = userData[UserType];
  const [Mes, setMes] = useState([]);

  const GenerateID = () => {
    let ID;
    let year;
    let userID;
    let Name;
    if (userData.UserType === 'Student') {
      year = new Date().getFullYear().toString().slice(-2);
      ID = userValues.Student_ID.split('_');
      userID = `F${year}-${ID[2]}@student.bvlacademy.com`;
    } else {
      ID = userData.obj.Teacher_ID.split('-');
      Name = userValues.TeacherName.toLowerCase().replace(/\s+/g, '');
      userID = `${Name}${ID[1]}@teacher.bvlacademy.com`;
    }
    return userID;
  };
  const UserID = GenerateID();

  const handleSubmit = async () => {
    setMes('');
    let obj = {
      username: UserID,
      password: `${userData.UserType.toLowerCase()}12345`,
      Status: 'Active',
      Name: userValues.StudentName ? userValues.StudentName : userValues.TeacherName,
      Designation: userData.UserType.toLowerCase(),
    };
    let Data = { obj };
    // let url = `http://localhost:8080/createUser`;
    let url = `${process.env.REACT_APP_URL}/createUser`;
    let resp = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(Data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!resp.ok) {
      setMes('Network Issue');
    } else {
      let mes = await resp.json();
      setMes(mes.message);
    }
  };

  return (
    <>
      {userData ? (
        <div className="conatainer m-4">
          <div className="card shadow-sm border- m-3 p-4" style={{ backgroundColor: '#F9FAFB' }}>
            <div className="row d-flex flex-wrap col-12 m-3">
              <h4 className="h4">Create User ID</h4>
            </div>
            <div className="d-flex flex-wrap justify-content-center">
              <div className="row d-flex flex-wrap col-12 mt-2">
                <div className="col-12 col-lg-6 mt-3 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">User ID</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="text"
                      name="STD_ID"
                      value={userValues.Student_ID ? userValues.Student_ID : userValues.Teacher_ID}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-12 col-lg-6 mt-3 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">User Name</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="text"
                      name="StudentName"
                      value={userValues.StudentName ? userValues.StudentName : userValues.TeacherName}
                      readOnly
                    />
                  </div>
                </div>

                <div className="col-12 col-lg-6 mt-3 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Course</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="text"
                      name="AppliedCourse"
                      value={userValues.AppliedCourse ? userValues.AppliedCourse : userValues.TeachCourse}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-12 col-lg-6 mt-3 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Created ID</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="text"
                      name="AppliedCourse"
                      value={UserID}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
            {Mes && (
              <div className="d-flex justify-content-center p-3">
                <b>{Mes}</b>
              </div>
            )}
            <div className="col-12 d-flex justify-content-center mt-5">
              <button className="btn btn-danger p-2 ps-4 pe-4" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center p-3">
          <b>Kindly Select User</b>
        </div>
      )}
    </>
  );
}

export { CreateID };
