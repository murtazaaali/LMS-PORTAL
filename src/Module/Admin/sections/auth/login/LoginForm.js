import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [Login, setLogin] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setLogin({ ...LoginSchema });
  }, []);

  const LoginSchema = {
    username: '',
    password: '',
  };

  // const handleClick = () => {
  //   navigate('/dashboard', { replace: true });
  // };

  const handleLoginInfo = (e) => {
    if (e.target.value.match(/^\s*$/) === null || e.target.value.match(/^\s*$/) !== '') {
      setLogin({
        ...Login,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async () => {
    console.log(Login);
    const result = await fetch('http://localhost:8080/Login', {
      method: 'POST',
      body: JSON.stringify(Login),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());

    if (result.length === 0) {
      alert('Unvalid User ');
    } else {
      navigate('/dashboard/app');
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="username" label="Username" onChange={handleLoginInfo} />

        <TextField
          name="password"
          label="Password"
          onChange={handleLoginInfo}
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
        />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          // sx={{ marginTop : '8px' }}
          onClick={handleSubmit}
        >
          Login
        </LoadingButton>
      </Stack>
    </>
  );
}
