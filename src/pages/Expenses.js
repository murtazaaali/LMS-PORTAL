import { useEffect, useState, useRef } from 'react';
import LoadingBar from 'react-top-loading-bar';
import { Typography, Stack, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

function ExpensesRecord() {
  useEffect(() => {
    GetExpesesRecord();
  }, []);

  const [FilterData, setFilterData] = useState([]);
  const [Issue, setIssue] = useState(null);
  const ref = useRef(null);

  const GetExpesesRecord = async () => {
    ref.current.continuousStart();
    let obj = { Type: 'Expenses' };
    const url = `${process.env.REACT_APP_URL}/GETExpensesData`;
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        ref.current.complete();
        if (res.length < 1) {
          setIssue('Expenses Record is Empty');
        }
        console.log(res);
        setFilterData(res);
      })
      .catch((err) => {
        ref.current.complete();
        console.error(err);
        setIssue('Some technical Issue occour');
      });
  };

  return (
    <>
      <LoadingBar color="#f11946" ref={ref} />
      <Typography variant="h6" align="left">
        Expensis Record
      </Typography>
      <Stack direction="row">
        {FilterData && (
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Sr#.</TableCell>
                  <TableCell align="right">Type</TableCell>
                  <TableCell align="right">Ammount</TableCell>
                  <TableCell align="right">Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {FilterData.map((ele, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{index}</TableCell>
                      <TableCell align="right">{ele.Type}</TableCell>
                      <TableCell align="right">{ele.Amount}</TableCell>
                      <TableCell align="right">{ele.Date}</TableCell>
                    </TableRow>
                  );
                })}
                {/* <TableRow>
                  <TableCell>01</TableCell>
                  <TableCell align="right">Cash</TableCell>
                  <TableCell align="right">10000</TableCell>
                  <TableCell align="right">27-12-1999</TableCell>
                </TableRow> */}
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
