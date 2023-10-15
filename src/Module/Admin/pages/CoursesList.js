import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import {
  Stack,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@mui/material';

function CoursesList() {
  const [Mes, setMes] = useState('');
  const [FilterData, setFilterData] = useState([]);
  const [QueryData, setQueryData] = useState([]);
  const [SearchObj, setSearchObj] = useState('');
  const Navigate = useNavigate();
  const ref = useRef(null);

  useEffect(() => {
    GetCourse();
  }, []);

  let GetCourse = async () => {
    setMes('');
    ref.current.continuousStart();
    let url = `${process.env.REACT_APP_URL}/GetCourses`;
    let result = await fetch(url, {
      method: 'GET',
    });
    try {
      if (!result) {
        ref.current.complete();
        setMes(' Some technical issue occour');
      } else {
        let jsonresult = await result.json((res) => {
          return res;
        });
        ref.current.complete();
        setQueryData(jsonresult);
        setFilterData(jsonresult);
      }
    } catch (err) {
      setMes('Some technical issue occour');
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

  const GetCourseStudent = (CourseID) => {
    // console.log(`Working ${id}`);
    Navigate(`/dashboard/studentlist/${CourseID}`);
  };

  const SearchEle = (searchText) => {
    const filteredData = QueryData.filter((ele) => {
      return ele.CourseName.toLowerCase().includes(searchText);
    });
    setFilterData(filteredData);
  };

  return (
    <>
      <LoadingBar color="#f11946" ref={ref} />
      <Typography variant="h6" align="left">
        Courses List
      </Typography>

      {/* Option Table */}
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
      <Stack direction="row">
        {FilterData && (
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Sr#.</TableCell>
                  <TableCell align="right">Course ID</TableCell>
                  <TableCell align="right">Course Name</TableCell>
                  <TableCell align="right">Assigned Teacher</TableCell>
                  <TableCell align="right">Student List</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {FilterData.map((ele, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{index}</TableCell>
                      <TableCell align="right">{ele.CourseID}</TableCell>
                      <TableCell align="right">{ele.CourseName}</TableCell>
                      <TableCell align="right">{ele.Teacher}</TableCell>
                      <TableCell align="right">
                        <Button variant="contained" onClick={() => GetCourseStudent(ele.CourseID)}>
                          Show
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {Mes && <div className="d-flex justify-content-center flex-wrap">{Mes}</div>}
          </TableContainer>
        )}
      </Stack>
    </>
  );
}

export { CoursesList };
