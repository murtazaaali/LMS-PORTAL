import { useNavigate } from 'react-router-dom';
// @mui
import PropTypes from 'prop-types';
import { Card, Typography, Button } from '@mui/material';
// // utils
// import { fShortenNumber } from '../../../utils/formatNumber';
// components

// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function AppWidgetSummary({ url, title, total,  color = 'primary', sx, ...other }) {
  const Navigate = useNavigate();
  const handleClick = (url) => {
    Navigate(url);
  };
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: 'center',
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
    

      <Typography variant="h3">{title}</Typography>

      <Button
        variant="outlined"
        onClick={() => handleClick(url)}
        sx={{ borderColor: (theme) => theme.palette[color].darker, color: (theme) => theme.palette[color].darker }}
      >
        Open
      </Button>
    </Card>
  );
}
