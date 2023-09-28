import React, { useState, useEffect } from 'react';
// import  from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Grid, Stack, Button, Typography } from '@mui/material';
import { ExpensesRecord } from './Expenses';
import { SalesRecord } from './Sales';

function Record() {
  const Navigate = useNavigate();
  const [check, setCheck] = useState(true);
  const { recordType } = useParams();

  // const params = useParams();
  // const recordType = params.recordType;

  useEffect(() => {
    ShowComponent();
  }, []);

  const ShowComponent = () => {
    if (recordType === 'sales') {
      return <SalesRecord key={'sales'} />;
    }
    if (recordType === 'expenses') {
      return <ExpensesRecord key={'expenses'} />;
    }
    return <div key={'notFound'}>Not Found Table</div>;
  };

  const ExpensesBtn = () => {
    setCheck(!check);

    Navigate('/dashboard/record/expenses');
  };
  const SalesBtn = () => {
    setCheck(!check);
    Navigate('/dashboard/record/sales');
  };

  const AddRecord = () => {
    console.log('working ... )');
    Navigate('/dashboard/addrecord');
  };

  return (
    <>
      {recordType && (
        <Container>
          <Grid conatiner>
            <Grid item>
              {/* Option Button */}
              <Typography variant="h4" align="left">
                Record Page
              </Typography>
              <Stack direction="row" display={'flex'} flexWrap={'wrap'} justifyContent={'center'} spacing={3} m={3}>
                <Button variant="contained" color="success" onClick={ExpensesBtn} disabled={check}>
                  Expenses
                </Button>
                <Button variant="contained" onClick={SalesBtn} disabled={!check}>
                  Sales
                </Button>
              </Stack>
              {/* Option Table */}

              <ShowComponent />

              <Stack direction="row" display={'flex'} flexWrap={'wrap'} justifyContent={'center'} spacing={3} m={3}>
                <Button variant="contained" color="error" onClick={AddRecord}>
                  Add New Record
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
}

export default Record;
