import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';

function CreateUser() {
  const [Mes, setMes] = useState();
  const [Result, setResult] = useState([]);
  const [FilterData, setFilterData] = useState([]);
  const Navigate = useNavigate();
  const [UserType, setUserType] = useState('Student');
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    GetValue();
  }, [UserType]);

  const GetValue = async () => {
    setMes('')
    // console.log(UserType);
    let obj = { UserType };
    // let url = `http://localhost:8080/GetAdmissionUserList`;
    let url = `${process.env.REACT_APP_URL}/GetAdmissionUserList`;
    try {
      let response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        setLoading(false);
        setMes('Netwrok Error');
      }

      const data = await response.json();
      setLoading(false);
      setResult(data);
      setFilterData(data);
      // console.log(data);
    } catch (err) {
      setMes(err.message);
    }
  };

  const SearchUser = (e) => {
    let searchText = e.target.value;
    let Name = `${UserType}Name`;
    const filteredData = FilterData.filter((ele) => {
      return ele[Name].toLowerCase().includes(searchText.toLowerCase());
    });
    setFilterData(filteredData);
    if (searchText === '') {
      setFilterData(Result);
    }
  };
  const setUser = (e) => {
    setUserType(e.target.value);
  };

  let CreateID = (obj) => {
    let Data = { obj, UserType };
    Navigate('/dashboard/createid', { state: Data });
  };

  return (
    <>
      <div className="d-flex justify-content-center flex-wrap">
        <input
          className="form-control mr-sm-2 w-50"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={SearchUser}
        />
        <div className="d-flex justify-content-center flex-wrap ms-3">
          <select className="form-select" onChange={setUser}>
            <option selected>Select User</option>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
          </select>
        </div>
      </div>
      <Box alignItems="center" justifyContent="center" display={'flex'} sx={{ m: 3 }}>
        <table className="table shadow-sm  table-bordered border-white">
          <thead className="table-dark" key={'thead'}>
            <tr className="mb-2">
              <th scope="col" className="m-2">
                <h6 className="h6">ID</h6>
              </th>
              <th scope="col" className="m-2">
                <h6 className="h6">Name</h6>
              </th>
              <th scope="col" className="m-2">
                <h6 className="h6">AppliedCourse</h6>
              </th>
              <th scope="col" className="m-2">
                <h6 className="h6">Create</h6>
              </th>
            </tr>
          </thead>
          {Mes && Mes}
          <tbody className="border-dark" key={'tbody'}>
            {!Loading ? (
              FilterData.map((ele) => {
                return (
                  <React.Fragment key={ele.Student_ID}>
                    <tr>
                      {/* <td>{ele.Student_ID}</td>
                      <td>{ele.StudentName}</td>
                      <td>{ele.AppliedCourse}</td> */}
                      <td>{ele.Student_ID ? ele.Student_ID : ele.Teacher_ID}</td>
                      <td>{ele.StudentName ? ele.StudentName : ele.TeacherName}</td>
                      <td>{ele.AppliedCourse ? ele.StudentName : ele.TeachCourse}</td>
                      <td>
                        <div className="d-flex justify-content-center">
                          <Button variant="contained" color="error" onClick={() => CreateID({ ...ele })}>
                            Create
                          </Button>
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })
            ) : (
              <Box>Data is Loading</Box>
            )}
          </tbody>
        </table>
      </Box>
    </>
  );
}

export { CreateUser };
