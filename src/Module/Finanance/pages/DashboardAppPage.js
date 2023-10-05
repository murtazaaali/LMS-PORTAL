import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography } from '@mui/material';

import { AppWidgetSummary } from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  // const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Sales"
              total={714000}
              icon={'ant-design:android-filled'}
              url={'/dashboard/record/sales'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Expenses"
              total={1352831}
              color="info"
              icon={'ant-design:apple-filled'}
              url={'/dashboard/record/expenses'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Query"
              total={1723315}
              color="warning"
              icon={'ant-design:windows-filled'}
              url={'/dashboard/query'}
            />
          </Grid>

          {/* <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
