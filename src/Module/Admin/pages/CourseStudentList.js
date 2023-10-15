import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Stack, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

function CourseStudentList() {
  const { CourseID } = useParams();
  const [Mes, setMes] = useState('');
  const [QueryData, setQueryData] = useState([]);
  const [SearchObj, setSearchObj] = useState('');
  const [FilterData, setFilterData] = useState([]);

  useEffect(() => {
    FetchStudent();
  }, []);

  let FetchStudent = async () => {
    if (CourseID) {
      setMes('');
      let url = `${process.env.REACT_APP_URL}/GETCourseStudents`;
      let result = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ CourseID }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      try {
        if (!result) {
          setMes(' Some technical issue occour');
          console.log('some issue occour');
        } else {
          let jsonresult = await result.json((res) => {
            return res;
          });
          setQueryData(jsonresult[0].Students);
          setFilterData(jsonresult[0].Students);
        }
      } catch (err) {
        setMes('Some technical issue occour');
      }
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
      return ele.studentName.toLowerCase().includes(searchText);
    });
    setFilterData(filteredData);
  };

  return (
    <>
      <Typography variant="h3" align="left" sx={{ pb: 2, pt: 2 }}>
        Courses Student List
      </Typography>
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
      {CourseID ? (
        <div>
          <div className="p-3">
            Course ID <b>{CourseID}</b>
          </div>
          <Stack direction="row">
            {FilterData && (
              <TableContainer>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Sr#.</TableCell>
                      <TableCell align="right">Student ID</TableCell>
                      <TableCell align="right">Student Name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {FilterData.map((ele, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>{index}</TableCell>
                          <TableCell align="right">{ele.studentID}</TableCell>
                          <TableCell align="right">{ele.studentName}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
                {Mes && <div className="d-flex justify-content-center flex-wrap">{Mes}</div>}
              </TableContainer>
            )}
          </Stack>
        </div>
      ) : (
        <div>Course Id is not found </div>
      )}
    </>
  );
}

export { CourseStudentList };
