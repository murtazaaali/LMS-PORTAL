import { useEffect, useState, useRef } from 'react';
import LoadingBar from 'react-top-loading-bar';
import { Typography, Stack, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

function ExpensesRecord() {
  const [FilterData, setFilterData] = useState([]);
  const [Issue, setIssue] = useState(null);
  const ref = useRef(null);

  const GetExpensesRecord = async () => {
    ref.current.continuousStart();
    let obj = { Type: 'Expenses' };
    let url = `${process.env.REACT_APP_URL}/GETExpensesData`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      ref.current.complete();
      if (data.length < 1) {
        setIssue('Expenses Record is Empty');
      }
      // console.log(data);
      setFilterData(data);
    } catch (error) {
      ref.current.complete();
      console.error(error);
      setIssue('Some technical issue occurred');
    }
  };

  useEffect(() => {
    GetExpensesRecord();
  }, []);

  return (
    <>
      <LoadingBar color="#f11946" ref={ref} />
      <Typography variant="h6" align="left">
        Expenses Record
      </Typography>
      <Stack direction="row">
        {FilterData && (
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Sr#.</TableCell>
                  <TableCell align="right">Type</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="right">Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {FilterData.map((ele, index) => (
                  <TableRow key={ele.id}>
                    {' '}
                    {/* Use a unique identifier for the key */}
                    <TableCell>{index + 1}</TableCell>
                    <TableCell align="right">{ele.Type}</TableCell>
                    <TableCell align="right">{ele.Amount}</TableCell>
                    <TableCell align="right">{ele.Date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {Issue && <div className="d-flex justify-content-center flex-wrap">{Issue}</div>}
          </TableContainer>
        )}
      </Stack>
    </>
  );
}

export { ExpensesRecord };
