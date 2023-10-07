import * as Yup from 'yup';

export const ContractValidation = {
  CompanyName: Yup.string().required('Company Name is Required'),
  StartDate: Yup.string().required('Start  Date is Required'),
  EndDate: Yup.string().required('End  Date is Required'),
  Amount: Yup.string().required('Amount is Required'),
};
