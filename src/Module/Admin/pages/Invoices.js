import { useState } from 'react';
import { Grid } from '@mui/material';
import { SalesRecord } from './Sales';
import { ExpensesRecord } from './Expenses';
import { SoftwareHousesRecord } from './SoftwareHousesRecord';

function InvoicesFunc() {
  const [RecordType, setRecordType] = useState('sales');
  let handleRecord = (e) => {
    setRecordType(e.target.value);
  };
  return (
    <>
      <div className="d-flex justify-content-center flex-wrap ms-3">
        <div className="col-7">
          <select className="form-select" onChange={handleRecord}>
            <option selected>Select User</option>
            <option value="sales">Sales</option>
            <option value="expenses">Expenses</option>
            <option value="Software">Software House</option>
            {/* <option value="Spaces">Co-Working Spaces</option> */}
          </select>
        </div>
      </div>
      <Grid container>
        <Grid item sm={12}>
          {RecordType === 'sales' && <SalesRecord />}
          {RecordType === 'expenses' && <ExpensesRecord />}
          {RecordType === 'Software' && <SoftwareHousesRecord />}
        </Grid>
      </Grid>
    </>
  );
}

export { InvoicesFunc };
