import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

function QueryHandling() {
  const [QueryData, setQueryData] = useState([]);
  const [Mes, setMes] = useState(null);

  const [filterData, setFilterData] = useState([]);
  const [SearchObj, setSearchObj] = useState('');

  const Navigate = useNavigate();
  const ref = useRef(null);

  useEffect(() => {
    ref.current.continuousStart();
    FetchQuery();
  }, []);

  const AddQuery = () => {
    if (window.confirm('Go to Add Query ..!')) {
      Navigate('/dashboard/registerquery');
    }
  };

  const SearchInput = (e) => {
    const searchText = e.target.value.toLowerCase();
    setSearchObj(searchText);
    if (searchText === '') {
      setFilterData(QueryData);
    } else {
      SearchEle(searchText);
    }
  };

  const SearchEle = (searchText) => {
    const filteredData = QueryData.filter((ele) => {
      return ele.StudentName.toLowerCase().includes(searchText);
    });
    setFilterData(filteredData);
  };

  const AdmissionStudent = async (obj) => {
    // console.log(obj.Student_ID);
    let Data = { Student_ID: obj.Student_ID };
    let url = `${process.env.REACT_APP_URL}/AdmissionCheck`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(Data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const result = await response.json();
        // console.log(result);
        if (result.length < 1) {
          if (window.confirm('Go to Add Admission Page ..!')) {
            Navigate('/dashboard/admission', { state: obj });
          }
        } else {
          alert('Admission Form Already Filled');
        }
      } else {
        // console.error('HTTP error:', response.status);
        setMes(`HTTP error`);
      }
    } catch (error) {
      setMes('Technical Issue occour');
      // console.error('Error:', error);
    }
  };

  const StudentSlip = async (obj) => {
    // const id = e.target.value;
    const Data = { Student_ID: obj.Student_ID };
    let result = await fetch(`${process.env.REACT_APP_URL}/StudentSlipCheck`, {
      method: 'POST',
      body: JSON.stringify(Data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        return res;
      })
      .catch((err) => console.error(err));
    if (result.length < 1) {
      let url = `${process.env.REACT_APP_URL}/GetAdmissionDataByID`;
      try {
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(obj),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const result = await response.json();
          let data = result[0];
          if (window.confirm('Go to Add Student Slip ..!')) {
            Navigate('/dashboard/slip', { state: data });
          }
        } else {
          console.error('HTTP error:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      alert('Student Slip is Already Filled');
    }
  };

  const FetchQuery = async () => {
    try {
      const url = `${process.env.REACT_APP_URL}/QueryRegister`;
      const response = await fetch(url, {
        method: 'GET',
      });
      if (response.ok) {
        const res = await response.json();
        ref.current.complete();
        // console.log(res);
        setQueryData(res);
        setFilterData(res);
      } else {
        ref.current.complete();
        console.error('HTTP error:', response.status);
        setMes('HTTP Error');
      }
    } catch (error) {
      ref.current.complete();
      console.error('Error:', error);
      setMes('Some Technical Issue Found...');
    }
  };

  return (
    <>
      <div className="container-fluid m-0 p-0">
        <LoadingBar color="#f11946" ref={ref} />
        <div className="container">
          <h1 className="text-center m-3" style={{ color: 'red' }}>
            Query Handling
          </h1>
          <div className="d-flex justify-content-center m-5 ">
            <input
              className="form-control mr-sm-2 w-50"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={SearchObj}
              onChange={SearchInput}
            />
          </div>
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
                  <h6 className="h6">Date</h6>
                </th>
                <th scope="col" className="m-2">
                  <h6 className="h6">Reference</h6>
                </th>
                <th scope="col" className="m-2">
                  <h6 className="h6">Remarks</h6>
                </th>
                <th scope="col" className="m-2">
                  <h6 className="h6">Deal By</h6>
                </th>
                <th scope="col" className="m-2">
                  <h6 className="h6">Done By</h6>
                </th>
                <th scope="col" className="m-2">
                  <h6 className="h6">Status</h6>
                </th>
                <th scope="col" className="m-2">
                  <h6 className="h6">Status 2</h6>
                </th>
                <th scope="col" className="m-2">
                  <h6 className="h6">Status 3</h6>
                </th>
                <th scope="col" className="m-2">
                  <h6 className="h6">Admission</h6>
                </th>
                <th scope="col" className="m-2">
                  <h6 className="h6">Student Slip</h6>
                </th>
              </tr>
            </thead>
            {Mes && Mes}
            <tbody className="border-dark" key={'tbody'}>
              {filterData &&
                filterData.map((ele) => {
                  return (
                    <>
                      <tr key={ele.id}>
                        <td className="m-2">{ele.Student_ID}</td>
                        <td className="m-2">{ele.StudentName}</td>
                        <td className="m-2">{ele.QueryDate}</td>
                        <td className="m-2">{ele.DealBy}</td>
                        <td className="m-2">{ele.DoneBy}</td>
                        <td className="m-2">{ele.Status1}</td>
                        <td className="m-2">{ele.Status2}</td>
                        <td className="m-2">{ele.Status3}</td>
                        <td className="m-2">{ele.refrence}</td>
                        <td className="m-2">{ele.remarks}</td>
                        <th className="m-2">
                          {ele.Status1 === 'Active' && ele.Status2 === 'Active' && ele.Status3 === 'Active' ? (
                            <button className="btn btn-danger" onClick={() => AdmissionStudent(ele)}>
                              Admission
                            </button>
                          ) : (
                            <button className="btn btn-danger" disabled>
                              Admission
                            </button>
                          )}
                        </th>
                        <th className="m-2">
                          {ele.Status1 === 'Active' && ele.Status2 === 'Active' && ele.Status3 === 'Active' ? (
                            <button className="btn btn-warning" onClick={() => StudentSlip(ele)}>
                              StudentSlip
                            </button>
                          ) : (
                            <button className="btn btn-warning" disabled>
                              StudentSlip
                            </button>
                          )}
                        </th>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
          <div className="d-flex justify-content-center">
            <button className="btn btn-info ps-3 pe-3" onClick={AddQuery}>
              Add New Query
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default QueryHandling;
