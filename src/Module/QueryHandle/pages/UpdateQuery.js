import { React, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function UpdateQuery() {
  const location = useLocation();
  const [StudentID, setStudentID] = useState('');
  let [Status, setStatus] = useState({});
  useEffect(() => {
    getStateData();
  }, []);

  let getStateData = () => {
    const data = location.state;
    setStudentID(data.Student_ID);
    setStatus({ Status1: data.Status1, Status2: data.Status2, Status3: data.Status3 });
  };

  let updatebtn = async () => {
    if (!Status.Status1 || !Status.Status2 || !Status.Status3) {
      alert('Kindly Select All Statuses');
    } else {
      let Obj = { ...Status, StudentID };
      const url = `${process.env.REACT_APP_URL}/UpdateRegisterQuery`;
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(Obj),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json((res) => {
          return res;
        });
        console.log(data);
      } else {
        console.error('HTTP error:', response.status);
      }
    }
  };

  return (
    <>
      <div className="container-fluid">
        {Status && (
          <div className="conatainer m-4">
            <div className="card shadow-sm border- m-3 p-4" style={{ backgroundColor: '#F9FAFB' }}>
              <div className="d-flex flex-wrap justify-content-center">
                <div className="row d-flex flex-wrap col-12 m-3">
                  <h4 className="h4">Update Status</h4>
                </div>

                <div className="row d-flex flex-wrap col-lg-8 col-12">
                  <h6 className="h6">Status 1</h6>
                  <select
                    name="Status1"
                    className="form-control shadow-sm"
                    onChange={(e) => setStatus({ ...Status, [e.target.name]: e.target.value })}
                    defaultValue={Status.Status1 ? Status.Status1 : ''}
                    placeholder={Status.Status1 ? Status.Status1 : ''}
                  >
                    <option className="dropdown-item" value="">
                      --Choose an option--
                    </option>
                    <option className="dropdown-item" value="Active">
                      Active
                    </option>
                    <option className="dropdown-item" value="Deactive">
                      Deactive
                    </option>
                  </select>
                </div>

                <div className="row d-flex flex-wrap col-lg-8 col-12">
                  <h6 className="h6">Status 2</h6>
                  <select
                    name="Status2"
                    className="form-control shadow-sm"
                    onChange={(e) => setStatus({ ...Status, [e.target.name]: e.target.value })}
                    defaultValue={Status.Status2 ? Status.Status2 : ''}
                    placeholder={Status.Status2 ? Status.Status2 : ''}
                  >
                    <option className="dropdown-item" value="">
                      --Choose an option--
                    </option>
                    <option className="dropdown-item" value="Active">
                      Active
                    </option>
                    <option className="dropdown-item" value="Deactive">
                      Deactive
                    </option>
                  </select>
                </div>

                <div className="row d-flex flex-wrap col-lg-8 col-12">
                  <h6 className="h6">Status 3</h6>
                  <select
                    name="Status3"
                    className="form-control shadow-sm"
                    onChange={(e) => setStatus({ ...Status, [e.target.name]: e.target.value })}
                    defaultValue={Status.Status3 ? Status.Status3 : ''}
                    placeholder={Status.Status3 ? Status.Status3 : ''}
                  >
                    <option className="dropdown-item" value="">
                      --Choose an option--
                    </option>
                    <option className="dropdown-item" value="Active">
                      Active
                    </option>
                    <option className="dropdown-item" value="Deactive">
                      Deactive
                    </option>
                  </select>
                </div>
              </div>
              {/* {Mes && <div className="d-flex justify-content-center p-3">{Mes}</div>} */}
              <div className="col-12 d-flex justify-content-center mt-5">
                <button className="btn btn-danger p-2 ps-4 pe-4" onClick={updatebtn}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export { UpdateQuery };
