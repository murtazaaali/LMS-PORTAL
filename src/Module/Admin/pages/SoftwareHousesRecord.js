import { useEffect, useState, useRef } from 'react';
import LoadingBar from 'react-top-loading-bar';
import { Stack, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

function SoftwareHousesRecord() {
  useEffect(() => {
    GETSalesData();
  }, []);

  const [Issue, setIssue] = useState(null);
  const [FilterData, setFilterData] = useState([]);
  const ref = useRef(null);

  const GETSalesData = async () => {
    ref.current.continuousStart();
    // let url = `http://localhost:8080/GETSoftwareHouseRecord`;
    let url = `${process.env.REACT_APP_URL}/GETSoftwareHouseRecord`;
    try {
      const response = await fetch(url, {
        method: 'GET',
      });

      if (response.ok) {
        const res = await response.json();
        ref.current.complete();

        if (res.length < 1) {
          setIssue('Sales Record is Empty');
        }
        setFilterData(res);
      } else {
        ref.current.complete();
        console.error('HTTP error:', response.status);
        setIssue('Some technical Issue occurred');
      }
    } catch (err) {
      ref.current.complete();
      console.error(err);
      setIssue('Some technical Issue occurred');
    }
  };

  return (
    <>
      <LoadingBar color="#f11946" ref={ref} />
      <Typography variant="h6" align="start">
        Software House Record
      </Typography>

      {/* Option Table */}
      <Stack direction="row">
        {FilterData && (
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Sr#.</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Start Date</TableCell>
                  <TableCell align="right">End Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {FilterData.map((ele, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell align="right">{ele.Name}</TableCell>
                      <TableCell align="right">{ele.StartDate}</TableCell>
                      <TableCell align="right">{ele.EndDate}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {Issue && <div className="d-flex justify-content-center flex-wrap">{Issue}</div>}
          </TableContainer>
        )}
      </Stack>
    </>
  );
}

export { SoftwareHousesRecord };
