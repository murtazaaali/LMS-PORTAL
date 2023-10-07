import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';

function ManageTeam() {
  const [Mes, setMes] = useState();
  const [Result, setResult] = useState([]);
  const [FilterData, setFilterData] = useState([]);
  const [UserType, setUserType] = useState('Student');
  const [Status, setStatus] = useState('Active');
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    GetValue();
  }, [UserType]);

  const GetValue = async () => {
    setMes('');
    // console.log(UserType);
    let obj = { UserType };
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

    const filteredData = FilterData.filter((ele) => {
      return ele.Name.toLowerCase().includes(searchText.toLowerCase());
    });
    setFilterData(filteredData);
    if (searchText === '') {
      setFilterData(Result);
    }
  };
  const setUser = (e) => {
    setUserType(e.target.value);
  };
  const handleStatus = (e) => {
    setStatus(e.target.value);
  };
  const handleUpdate = async (Username) => {
    // console.log(`Usename : ${Username} & Status is ${Status}`);
    let url = `http://localhost:8080/UpdateCreatedUsers`;

    let obj = { UserType, Status, Username };
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setMes(res.message);
      })
      .catch((err) => setMes(err.message));
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
                <h6 className="h6">User Name</h6>
              </th>
              <th scope="col" className="m-2">
                <h6 className="h6">Name</h6>
              </th>
              <th scope="col" className="m-2">
                <h6 className="h6">Status</h6>
              </th>
              <th scope="col" className="m-2">
                <h6 className="h6">Update</h6>
              </th>
            </tr>
          </thead>

          <tbody className="border-dark" key={'tbody'}>
            {!Loading ? (
              FilterData.map((ele) => {
                return (
                  <React.Fragment key={ele.username}>
                    <tr>
                      <td>{ele.username}</td>
                      <td>{ele.Name}</td>
                      <td>
                        <div className="d-flex justify-content-center">
                          <select defaultValue={ele.Status} className="form-select" onChange={handleStatus}>
                            <option selected>Select User</option>
                            <option value="Active">Active</option>
                            <option value="InActive">InActive</option>
                          </select>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex justify-content-center">
                          <Button variant="contained" onClick={() => handleUpdate(ele.username)}>
                            Update
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
      <div className="d-flex justify-content-center">{Mes && Mes}</div>
    </>
  );
}

export { ManageTeam };
