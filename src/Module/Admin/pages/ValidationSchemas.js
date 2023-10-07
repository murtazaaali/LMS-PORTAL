import * as Yup from 'yup';

export const RegisterCourse = Yup.object({
  CourseName: Yup.string().required('Course Name is Required'),
  Class: Yup.string().required('Class Name is Required'),
});
