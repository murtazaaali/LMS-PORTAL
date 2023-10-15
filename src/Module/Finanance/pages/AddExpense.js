import { useState } from 'react';
import { useFormik } from 'formik';
import { Button } from '@mui/material';
import { AddExpenseSchema } from './validationSchema';

function AddExpense() {
  const [Mes, setMes] = useState(null);

  const SubmitExpense = async (obj) => {
    setMes('');
    let Data = { ...obj, Type: 'Expense' };

    let url = `${process.env.REACT_APP_URL}/AddExpense`;
    // const result =
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(Data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json(obj))
      .then(() => {
        // console.log(res);

        setMes('Expense Successfuly inserted');
      })
      .catch((err) => {
        console.error(err);
        setMes('Some technical Issue occour');
      });
  };

  const AddExpenseValues = {
    Date: '',
    ExpensedType: '',
    Name: '',
    Amount: '',
  };

  const formik = useFormik({
    initialValues: AddExpenseValues,
    validationSchema: AddExpenseSchema,
    onSubmit: (values) => {
      //   console.log(values);
      SubmitExpense({ ...values });
    },
  });
  return (
    <>
      <div className="conatainer m-4">
        <form onSubmit={formik.handleSubmit}>
          <div className="card shadow-sm border- m-3 p-4" style={{ backgroundColor: '#F9FAFB' }}>
            <div className="row d-flex flex-wrap col-12 m-3">
              <h4 className="h4">Add Expense</h4>
            </div>
            <div className="d-flex flex-wrap justify-content-center">
              <div className="row d-flex flex-wrap col-12 mt-2">
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Date</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="date"
                      name="Date"
                      onChange={formik.handleChange}
                      value={formik.values.Date}
                    />
                  </div>
                  {formik.touched.Date && formik.errors.Date ? (
                    <div className="text-danger">{formik.errors.Date}</div>
                  ) : null}
                </div>
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Expense Type</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="text"
                      name="ExpensedType"
                      onChange={formik.handleChange}
                      value={formik.values.ExpensedType}
                    />
                  </div>

                  {formik.touched.ExpensedType && formik.errors.ExpensedType ? (
                    <div className="text-danger">{formik.errors.ExpensedType}</div>
                  ) : null}
                </div>
              </div>
              <div className="row d-flex flex-wrap col-12 mt-2">
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Amount</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="text"
                      name="Amount"
                      onChange={formik.handleChange}
                      value={formik.values.Amount}
                    />
                  </div>
                  {formik.touched.Amount && formik.errors.Amount ? (
                    <div className="text-danger">{formik.errors.Amount}</div>
                  ) : null}
                </div>
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Submited By</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="text"
                      name="Name"
                      onChange={formik.handleChange}
                      value={formik.values.Name}
                    />
                  </div>
                  {formik.touched.Name && formik.errors.Name ? (
                    <div className="text-danger">{formik.errors.Name}</div>
                  ) : null}
                </div>
              </div>

              <div className="m-3">
                {Mes && (
                  <div className="d-flex justify-content-center">
                    <h3>{Mes}</h3>
                  </div>
                )}
                <Button variant="contained" color="error" type="submit">
                  Add New Record
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export { AddExpense };
