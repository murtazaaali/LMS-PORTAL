import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import {
  Typography,
  Stack,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@mui/material';

function ExpensesRecord() {
  const [FilterData, setFilterData] = useState([]);
  const [Issue, setIssue] = useState(null);
  const Navigate = useNavigate();
  const ref = useRef(null);

  useEffect(() => {
    GetExpensesRecord();
  }, []);

  const GetExpensesRecord = async () => {
    setIssue('');
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

  let AddExpense = () => {
    Navigate('/dashboard/addexpense');
  };

  return (
    <>
      <LoadingBar color="#f11946" ref={ref} />
      <Typography variant="h6" align="left">
        Expenses Record
      </Typography>
      <div className="d-flex justify-content-end flex-wrap m-3">
        <Button variant="contained" color="warning" onClick={AddExpense}>
          Add New Expense
        </Button>
      </div>
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
                  <TableCell align="right">Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {FilterData.map((ele, index) => (
                  <TableRow key={ele.id}>
                    {' '}
                    {/* Use a unique identifier for the key */}
                    <TableCell>{index + 1}</TableCell>
                    <TableCell align="right">{ele.Name}</TableCell>
                    <TableCell align="right">{ele.Amount}</TableCell>
                    <TableCell align="right">{ele.Date}</TableCell>
                    <TableCell align="right">{ele.Type}</TableCell>
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
