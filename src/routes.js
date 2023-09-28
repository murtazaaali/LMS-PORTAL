import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';

import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import RegisterQuery from './pages/RegisterQuery';
import QueryHandling from './pages/QueryHandling';
import { StudentSlip } from './pages/StudentSlip';
import StudentAdmission from './pages/StudentAdmission';

import Record from './pages/Record';
import { AddRecord } from './pages/AddRecord';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="login" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'registerquery', element: <RegisterQuery /> },
        { path: 'query', element: <QueryHandling /> },
        { path: 'admission', element: <StudentAdmission /> },
        { path: 'slip', element: <StudentSlip /> },

        { path: 'record/:recordType', element: <Record /> },
        { path: 'addrecord', element: <AddRecord /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="login" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
