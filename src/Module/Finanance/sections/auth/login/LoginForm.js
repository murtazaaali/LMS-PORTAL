import { useState, useRef } from 'react';
import * as Yup from 'yup';

import { useNavigate } from 'react-router-dom';
// LoadingBar
import LoadingBar from 'react-top-loading-bar';
// @mui
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { useFormik } from 'formik';

import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [Mes, setMes] = useState(null);
  const ref = useRef(null);

  const FetchData = async (obj) => {
    ref.current.continuousStart();
    ref.current.staticStart();
    const result = await fetch(`${process.env.REACT_APP_URL}/Login`, {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
        setMes(err);
      });

    if (result.length === 0) {
      ref.current.complete();
      alert('Unvalid User ');
    } else {
      ref.current.complete();
      navigate('/dashboard/app');
    }
  };

  const SignUpSchema = Yup.object({
    username: Yup.string().min(2, 'Too Short ..').max(50, 'Too Long').required('username is Required'),
    password: Yup.string().min(2, 'Too Short ..').max(15, 'Too Long').required('password is Required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: SignUpSchema,
    onSubmit: (values) => {
      // console.log(JSON.stringify(values, null, 2));
      FetchData({ ...values });
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <LoadingBar color="#f11946" ref={ref} />
        <Stack spacing={3}>
          <TextField
            name="username"
            label="Enter Username"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="text-danger">{formik.errors.username}</div>
          ) : null}

          <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-danger">{formik.errors.password}</div>
          ) : null}
          {Mes && <div className="d-flex justify-content center">{Mes}</div>}
          <LoadingButton fullWidth size="large" sx={{ mt: '2' }} type="submit" variant="contained">
            Login
          </LoadingButton>
        </Stack>
      </form>
    </>
  );
}
