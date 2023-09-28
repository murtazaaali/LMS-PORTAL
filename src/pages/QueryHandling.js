// import { method } from 'lodash';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

function QueryHandling() {
  const [QueryData, setQueryData] = useState([]);
  const [Mes, setMes] = useState(null);

  const [filterData, setFilterData] = useState([]);
  const [SerachObj, setSearchObj] = useState({});

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
    setSearchObj(e.target.value);
    if (e.target.value === '') {
      setFilterData(QueryData);
    } else {
      SearchEle();
    }
  };
  const SearchEle = () => {
    let filterData = QueryData.filter((ele) => {
      return ele.StudentName.includes(SerachObj);
    });

    setFilterData(filterData);
  };

  const AdmissionStudent = (obj) => {
    console.log('working ... )');
    let Data = { ...obj };
    console.log(Data);

    console.log(Data);
    console.log('buton is working');
    if (window.confirm('Go to Add Addmision Page ..!')) {
      Navigate(`/dashboard/admission`, { state: Data });
    }
  };

  const StudentSlip = async (e) => {
    let id = e.target.value;
    let obj = { Student_ID: id };
    console.log(obj);
    let url = `${process.env.REACT_APP_URL}/GetAdmissionDataByID`;
    let result = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());

    let Data = result[0];
    // console.log(Data);
    if (window.confirm('Go to Add Student Slip ..!')) {
      Navigate(`/dashboard/slip`, { state: Data });
    }
  };

  let FetchQuery = async () => {
    try {
      const url = `${process.env.REACT_APP_URL}/QueryRegister`;
      const response = await fetch(url, {
        method: 'GET',
      });
      if (response.ok) {
        const res = await response.json();
        ref.current.complete();
        console.log(res);
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
      setMes(`Some Technical Issue Found ... )`);
    }
  };

  return (
    <>
      <div className="container-fluid m-0 p-0">
        <LoadingBar color="#f11946" ref={ref} />
        {/* conatainer */}
        <div className="container">
          <h1 className="text-center m-3" style={{ color: 'red' }}>
            Query Handling
          </h1>

          {/* Table */}
          <div className="d-flex justify-content-center m-5 ">
            <input
              className="form-control mr-sm-2 w-50"
              type="search"
              placeholder="Search"
              aria-label="Search"
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
                  <h6 className="h6">Number</h6>
                </th>
                <th scope="col" className="m-2">
                  <h6 className="h6">Reference</h6>
                </th>
                <th scope="col" className="m-2">
                  <h6 className="h6">Course</h6>
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
                  <h6 className="h6">Option</h6>
                </th>
              </tr>
            </thead>
            {Mes && Mes}
            <tbody className="border-dark" key={'tbody'}>
              {/* {obj.map((ele) => { */}

              {filterData &&
                filterData.map((ele, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <th className="m-2">{ele.Student_ID}</th>
                        <th className="m-2">{ele.StudentName}</th>
                        <th className="m-2">{ele.QueryDate}</th>
                        <th className="m-2">{ele.Phone}</th>
                        <th className="m-2">{ele.refrence}</th>
                        <th className="m-2">{ele.AppliedCourse}</th>
                        <th className="m-2">{ele.DealBy}</th>
                        <th className="m-2">{ele.DoneBy}</th>
                        <th className="m-2">{ele.Status1}</th>
                        <th className="m-2">{ele.Status2}</th>
                        <th className="m-2">{ele.Status3}</th>
                        <th className="m-2">
                          {ele.Status1 === 'Active' && ele.Status2 === 'Active' && ele.Status3 === 'Active' ? (
                            <div className="d-flex justify-content-center flex-wrap">
                              <button
                                className="btn btn-danger m-2"
                                value={`${ele.Student_ID}`}
                                // onClick={AdmissionStudent}
                                onClick={() => AdmissionStudent({ ...ele })}
                              >
                                Admission
                              </button>
                              <button className="btn btn-warning m-2" value={`${ele.Student_ID}`} onClick={StudentSlip}>
                                Slip
                              </button>
                            </div>
                          ) : (
                            <div className="d-flex justify-content-center flex-wrap">
                              <button className="btn btn-danger m-2" disabled>
                                Admission
                              </button>
                              <button className="btn btn-warning m-2" disabled>
                                Slip
                              </button>
                            </div>
                          )}
                        </th>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
          {/* Button */}
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
