import { useEffect, useState } from 'react';

function AssignCourses() {
  useEffect(() => {
    FetchCourses();
    GetTeacher();
  }, []);
  let [Mes, setMes] = useState('');
  let [CoursesList, setCoursesList] = useState(null);
  let [TeacherList, setTeacherList] = useState(null);
  let [SelectedTeacher, setSelectedTeacher] = useState('');
  let [SelectedCourse, setSelectedCourse] = useState('');

  const GetTeacher = async () => {
    setMes('');
    // console.log(UserType);
    let obj = { UserType: 'Teacher' };
    // let url = `http://localhost:8080/GetCreatedUsersList`;
    let url = `${process.env.REACT_APP_URL}/GetCreatedUsersList`;
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
      setTeacherList(data);
      // console.log(data);
    } catch (err) {
      setMes(err.message);
    }
  };
  const FetchCourses = async () => {
    setMes('');
    try {
      // let url = 'http://localhost:8080/GetCourses';
      let url = `${process.env.REACT_APP_URL}/GetCourses`;
      let response = await fetch(url, {
        method: 'GET',
      });
      if (!response.ok) {
        setMes('Some Issue occour');
      }
      let data = await response.json();
      //   console.log(data);
      setCoursesList(data);
    } catch (error) {
      setMes('HTTP Error :', error);
    }
  };
  let handleAssignData = async () => {
    setMes('');
    if ((!SelectedTeacher && !SelectedCourse) || SelectedCourse === '' || SelectedTeacher === '') {
      alert('Fill Both Fields');
    } else {
      //   console.log(`Selected Teacher is ${SelectedTeacher} && course is ${SelectedCourse}`);

      let obj = { SelectedTeacher, SelectedCourse };

      try {
        // let url = 'http://localhost:8080/AssignTeacher';
        let url = `${process.env.REACT_APP_URL}/AssignTeacher`;
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
            <h4 className="h4">Assign Teacher</h4>
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
                  <h6 className="h6 mt-2">Teacher Name</h6>
                </div>

                <div className="col-lg-8 col-12">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="TeacherName"
                    onChange={(e) => setSelectedTeacher(e.target.value)}
                  >
                    <option selected>{''}</option>
                    {TeacherList &&
                      TeacherList.map((ele) => {
                        return (
                          <>
                            <option value={ele.username.split('@')[0]}>{ele.username.split('@')[0]}</option>
                          </>
                        );
                      })}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {Mes && <div className="d-flex justify-content-center p-3">{Mes}</div>}
          <div className="col-12 d-flex justify-content-center mt-5">
            <button className="btn btn-danger p-2 ps-4 pe-4" type="submit" onClick={handleAssignData}>
              Assign
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export { AssignCourses };
