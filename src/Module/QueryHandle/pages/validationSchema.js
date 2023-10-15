import * as Yup from 'yup';

export const RegisterQuerySchema = Yup.object({
  StudentName: Yup.string().min(2, 'Too short').max(25, 'Too Long').required('Student Name is Required'),
  DOB: Yup.string().required('Date of Birth is Required'),
  DealBy: Yup.string().required('Deal By is Required'),
  DoneBy: Yup.string().required('Done By is Required'),
  // Phone: Yup.number().positive().length(11, 'Invalid phone number').required('Phone Number By is Required'),
  Phone: Yup.number()
    .positive()
    .required()
    .test('len', 'Must be exactly 11 characters', (val) => val.toString().length === 10),
  QueryDate: Yup.string().required('Query Date is Required'),
  Status1: Yup.string().required('Status 1 is Required'),
  Status2: Yup.string().required('Status 2 is Required'),
  Status3: Yup.string().required('Status 3 is Required'),
  refrence: Yup.string().required('Refrence is Required'),
  remarks: Yup.string().min(8, 'Provide Valid Remarks').required('Remarks is Required'),
  AppliedCourse: Yup.string().min(5, 'Provide Valid Course').required('Remarks is Required'),
});
