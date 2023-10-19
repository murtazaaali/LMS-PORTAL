import { useEffect, useState } from 'react';

function Count() {
  useEffect(() => {
    getCount();
  });

  const [ValueType, setValueType] = useState('type');
  const [Ammount, setAmmount] = useState(0);
  const [TotalSales, setTotalSales] = useState(0);
  const [TotaExpense, setTotaExpense] = useState(0);
  const [Issue, setIssue] = useState(null);

  let getCount = async () => {
    let url = `${process.env.REACT_APP_URL}/GETMonthData`;
    let result = await fetch(url)
      .then((res) => res.json())
      .then((res) => {
        return res;
      })
      .catch((err) => setIssue(err));
    // console.log(result);
    setTotaExpense(result.totalExpense);
    setTotalSales(result.totalSales);
    if (result.totalExpense > result.totalSales) {
      setValueType('Loss Are');
    } else {
      setValueType('Profit Are');
    }
    let totalvalue = (result.totalSales / result.totalExpense) * 100;
    setAmmount(`${totalvalue}%`);
  };
  return (
    <>
      Count Page
      <div className="d-flex flex-wrap justify-content-center">
        <div className="col-12 col-lg-6 m-3 d-flex flex-wrap">
          <div className="col-lg-4 col-12">
            <h6 className="h6 mt-2">Sales Ammount</h6>
          </div>
          <div className="col-lg-8 col-12">
            <input className="form-control h-100 shadow-sm" value={TotalSales} type="number" readOnly />
          </div>
        </div>
        <div className="col-12 col-lg-6 m-3 d-flex flex-wrap">
          <div className="col-lg-4 col-12">
            <h6 className="h6 mt-2">Expense Ammount</h6>
          </div>
          <div className="col-lg-8 col-12">
            <input className="form-control h-100 shadow-sm" value={TotaExpense} type="number" readOnly />
          </div>
        </div>
        <div className="col-12 col-lg-6 m-3 d-flex flex-wrap">
          <div className="col-lg-4 col-12">
            <h6 className="h6 mt-2">{ValueType}</h6>
          </div>
          <div className="col-lg-8 col-12">
            <input className="form-control h-100 shadow-sm" value={Ammount} type="text" readOnly />
          </div>
        </div>
      </div>
      {Issue && <div className="d-flex justify-content-cennter flex-wrap">{Issue}</div>}
    </>
  );
}

export { Count };
