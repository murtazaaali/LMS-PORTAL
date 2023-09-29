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
    const searchText = e.target.value;
    setSearchObj(searchText);
    if (searchText === '') {
      setFilterData(QueryData);
    } else {
      SearchEle(searchText);
    }
  };

  const SearchEle = (searchText) => {
    const filteredData = QueryData.filter((ele) => {
      return ele.StudentName.includes(searchText);
    });
    setFilterData(filteredData);
  };

  const AdmissionStudent = (obj) => {
    if (window.confirm('Go to Add Admission Page ..!')) {
      Navigate('/dashboard/admission', { state: obj });
    }
  };

  const StudentSlip = async (e) => {
    const id = e.target.value;
    const obj = { Student_ID: id };
    const url = `${process.env.REACT_APP_URL}/GetAdmissionDataByID`;

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
        const data = result[0];
        if (window.confirm('Go to Add Student Slip ..!')) {
          Navigate('/dashboard/slip', { state: data });
        }
      } else {
        console.error('HTTP error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
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
              <tr className="mb-2">{/* ... Header columns */}</tr>
            </thead>
            {Mes && Mes}
            <tbody className="border-dark" key={'tbody'}>
              {filterData &&
                filterData.map((ele, index) => {
                  return <tr key={index}>{/* ... Table data */}</tr>;
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
