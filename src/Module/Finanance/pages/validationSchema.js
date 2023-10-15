import * as Yup from 'yup';

export const AddmsionSchema = Yup.object({
  // AppliedCourse: Yup.string().required('Course for Applied is required'),
  // StudentName: Yup.string().required('Student Name is required'),
  GuardianName: Yup.string().required('Guardian Name is required'),
  // DOB: Yup.date().required('Date of Birth is required'),
  Gender: Yup.string().required('Gender is required'),
  CNIC: Yup.number().positive().required('CNIC is required'),
  GuardianContact: Yup.number()
    .required('Guardian Contact is required')
    .test('len', 'Must be exactly 11 characters', (val) => val.toString().length === 10),
  Email: Yup.string().email('Invalid email format').required('Email is required'),
  PostalAddress: Yup.string().required('Postal Address is required'),
  firstInstallment: Yup.number().positive().required('Feld is required'),
  firstInstallmentDate: Yup.string().required('Feld is required'),
  secondInstallment: Yup.number().positive().required('Feld is required'),
  secondInstallmentDate: Yup.string().required('Feld is required'),
  thirdInstallment: Yup.number().positive().required('Feld is required'),
  thirdInstallmentDate: Yup.string().required('Feld is required'),
  Addmissiondate: Yup.string().required('Addmission date is required'),
  AdmissionCoordinator: Yup.string().required('Admission Coordinator is required'),
  // RegNo: Yup.string().required('Registration No is required'),
  Remarks: Yup.string().required('Remarks is required'),
  // RollNo: Yup.string().required('Roll No is required'),
  // img: Yup.string().required('Image is required'),
  CampusManager: Yup.string().required('Campus Manager is required'),
  Installment: Yup.number().positive().required('Installment is required'),
  FeePackege: Yup.number().positive().required('Fee Packege is required'),
  FullFee: Yup.number().positive().required('Full Fee is required'),
  DegreeCerifcate: Yup.string().required('Degree/Cerifcate is required'),
  Institute: Yup.string().required('Institute Name is required'),
  DegreeYear: Yup.string().required('Degree Year is required'),
  DegreeMarks: Yup.number().positive().required('Degree Marks is required'),
  // Add more fields and validation as needed
});

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

export const RegisterStudentSlip = Yup.object({
  FeeType: Yup.string().required('Fee Type is Required'),
  Date: Yup.string().required('Date is Required'),
  RecievedBy: Yup.string().required('RecievedBy is Required'),
  RecievedAmmount: Yup.number().positive().required('RecievedAmmount is Required'),
  RecieptNO: Yup.string().required('RecieptNO is Required'),
  ExamFee: Yup.string().required('Exam Fee is Required'),
  AmmountType: Yup.string().required('Ammount Type is Required'),
  Dated: Yup.string().required('Dated is Required'),
  LateFee: Yup.string().required('Late Fee is Required'),
});

export const AddRecordSchema = Yup.object({
  Date: Yup.string().required('Date is Required'),
  Type: Yup.string().required('Type is Required'),
  SubmitedBy: Yup.string().required('SubmitedBy is Required'),
  StudentID: Yup.string().required('StudentID is Required'),
  Amount: Yup.number('add valid amount').positive('add valid amount').required('Amount is Required'),
});

export const AddExpenseSchema = Yup.object({
  Date: Yup.string().required('Date is Required'),
  ExpensedType: Yup.string().required('ExpenseType is Required'),
  Name: Yup.string().required('SubmitedBy is Required'),
  Amount: Yup.number('add valid amount').positive('add valid amount').required('Amount is Required'),
});
