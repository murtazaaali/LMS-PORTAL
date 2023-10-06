import { useEffect, useState, useRef } from 'react';
import LoadingBar from 'react-top-loading-bar';
import { Stack, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

function SalesRecord() {
  useEffect(() => {
    GETSalesData();
  }, []);

  const [Issue, setIssue] = useState(null);
  const [FilterData, setFilterData] = useState([]);
  const ref = useRef(null);

  const GETSalesData = async () => {
    ref.current.continuousStart();
    const url = `${process.env.REACT_APP_URL}/GETSalesData`;
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

        // console.log(res);
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
        Sales Record
      </Typography>

      {/* Option Table */}
      <Stack direction="row">
        {FilterData && (
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Sr#.</TableCell>
                  <TableCell align="right">Student_ID</TableCell>
                  <TableCell align="right">Type</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">SalesBy</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {FilterData.map((ele, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell align="right">{ele.Student_ID}</TableCell>
                      <TableCell align="right">{ele.AmmountType}</TableCell>
                      <TableCell align="right">{ele.paidamount}</TableCell>
                      <TableCell align="right">{ele.Date}</TableCell>
                      <TableCell align="right">{ele.DealBy}</TableCell>
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

export { SalesRecord };
