import { useEffect, useState } from 'react';

function EnrollmentPage() {
  useEffect(() => {
    FetchCourses();
    GetStudents();
  }, []);
  let [Mes, setMes] = useState('');
  let [CoursesList, setCoursesList] = useState(null);
  let [StudentList, setStudentList] = useState(null);
  let [SelectedStudent, setSelectedStudent] = useState('');
  let [StudentName, setStudentName] = useState('');
  let [SelectedCourse, setSelectedCourse] = useState('');

  const GetStudents = async () => {
    setMes('');
    // console.log(UserType);
    let obj = { UserType: 'Student' };
    let url = `http://localhost:8080/GetCreatedUsersList`;
    try {
      let response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        setMes('Netwrok Error');
      }

      const data = await response.json();
      setStudentList(data);
    } catch (err) {
      setMes(err.message);
    }
  };
  const FetchCourses = async () => {
    setMes('');
    try {
      let url = 'http://localhost:8080/GetCourses';
      let response = await fetch(url, {
        method: 'GET',
      });
      if (!response.ok) {
        setMes('Some Issue occour');
      }
      let data = await response.json();
      //   console.log(data);
      setCoursesList(data);
      // console.log(CoursesList);
    } catch (error) {
      setMes('HTTP Error :', error);
    }
  };
  let handleStudentInfo = (obj) => {
    // console.log({ ...obj });
    let data = JSON.parse(obj);
    // console.log(data);
    setSelectedStudent(data.username.split('@')[0]);
    setStudentName(data.Name);
  };
  let handleAssignData = async () => {
    setMes('');
    if ((!SelectedStudent && !SelectedCourse) || SelectedCourse === '' || SelectedStudent === '') {
      alert('Fill Both Fields');
    } else {
      console.log(`Selected Student is ${SelectedStudent} && course is ${SelectedCourse} && name is ${StudentName}`);

      let obj = { SelectedStudent, SelectedCourse, StudentName };
      console.log(obj);

      try {
        let url = 'http://localhost:8080/EnrolledStudent';
        let response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(obj),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          setMes('Some Issue occour');
        }
        let data = await response.json();
        // console.log(data);
        setMes(data.message);
      } catch (error) {
        setMes('HTTP Error :', error);
      }
    }
  };
  return (
    <>
      <div className="conatainer m-4">
        <div className="card shadow-sm border- m-3 p-4" style={{ backgroundColor: '#F9FAFB' }}>
          <div className="row d-flex flex-wrap col-12 m-3">
            <h4 className="h4">Enrolled Student</h4>
          </div>
          <div className="d-flex flex-wrap justify-content-center">
            <div className="row d-flex flex-wrap col-12 mt-2">
              <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                <div className="col-lg-4 col-12">
                  <h6 className="h6 mt-2">Course Name</h6>
                </div>

                <div className="col-lg-8 col-12">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="Course"
                    onChange={(e) => setSelectedCourse(e.target.value)}
                  >
                    <option selected>{''}</option>
                    {CoursesList &&
                      CoursesList.map((ele) => {
                        return (
                          <>
                            <option value={ele.CourseID}>{ele.CourseName}</option>
                          </>
                        );
                      })}
                  </select>
                </div>
              </div>

              <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                <div className="col-lg-4 col-12">
                  <h6 className="h6 mt-2">Student Name</h6>
                </div>

                <div className="col-lg-8 col-12">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="TeacherName"
                    onChange={(e) => handleStudentInfo(e.target.value)}
                  >
                    <option selected>{''}</option>
                    {StudentList &&
                      StudentList.map((ele) => {
                        return (
                          <option key={ele.username} value={JSON.stringify(ele)}>
                            {ele.username.split('@')[0]}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {Mes && <div className="d-flex justify-content-center p-3">{Mes}</div>}
          <div className="col-12 d-flex justify-content-center mt-5">
            <button className="btn btn-danger p-2 ps-4 pe-4" onClick={handleAssignData}>
              Enrolled
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export { EnrollmentPage };
