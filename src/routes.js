import { Navigate, useRoutes } from 'react-router-dom';
import React from 'react';

// layouts
import SimpleLayout from './Module/Finanance/layouts/simple';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';

// Fianance Module routes
import FinanceDashboardLayout from './Module/Finanance/layouts/dashboard';
import FinanceDashboardAppPage from './Module/Finanance/pages/DashboardAppPage';
import RegisterQuery from './Module/Finanance/pages/RegisterQuery';
import QueryHandling from './Module/Finanance/pages/QueryHandling';
import { StudentSlip } from './Module/Finanance/pages/StudentSlip';
import StudentAdmission from './Module/Finanance/pages/StudentAdmission';
import Record from './Module/Finanance/pages/Record';
import { AddRecord } from './Module/Finanance/pages/AddRecord';
import { AddExpense } from './Module/Finanance/pages/AddExpense';

// Admin Module routes
import AdminDashboardLayout from './Module/Admin/layouts/dashboard';
import AdminDashboardAppPage from './Module/Admin/pages/DashboardAppPage';
import { ManageTeam } from './Module/Admin/pages/ManageTeam';
import { ContactFunc } from './Module/Admin/pages/Contact';
import { InvoicesFunc } from './Module/Admin/pages/Invoices';
import { CreateUser } from './Module/Admin/pages/CreateUser';
import { CreateID } from './Module/Admin/pages/CreateID';
import { Courses } from './Module/Admin/pages/Courses';
import { AssignCourses } from './Module/Admin/pages/AssignCourses';
import { EnrollmentPage } from './Module/Admin/pages/Enrollment';
import { AddProgram } from './Module/Admin/pages/AddPrograms';
import { CoursesList } from './Module/Admin/pages/CoursesList';
import { CourseStudentList } from './Module/Admin/pages/CourseStudentList';

// Teacher Module Routes
import TeacherDashboardLayout from './Module/Teacher/layouts/dashboard';
import TeacherDashboardAppPage from './Module/Teacher/pages/DashboardAppPage';
import { AttendancePage } from './Module/Teacher/pages/AttendancePage';
import { MarksPage } from './Module/Teacher/pages/Marks';
import { CoursesPage } from './Module/Teacher/pages/Courses';
import { SchedulePage } from './Module/Teacher/pages/Sechdule';

// Student Module page

import StudentDashboardLayout from './Module/Student/layouts/dashboard';
import StudentDashboardAppPage from './Module/Student/pages/DashboardAppPage';
import { AttandancePage } from './Module/Student/pages/Attandance';
import { TimeTablePage } from './Module/Student/pages/TimeTable';
import { CoursePage } from './Module/Student/pages/Course';
import { TranscriptPage } from './Module/Student/pages/TransCript';

// HR Module page

import HRDashboardLayout from './Module/HumanResources/layouts/dashboard';
import HRDashboardAppPage from './Module/HumanResources/pages/DashboardAppPage';
import { StaffAttandancePage } from './Module/HumanResources/pages/Attandance';
import { StaffContactPage } from './Module/HumanResources/pages/Conatct';
import { ContractPage } from './Module/HumanResources/pages/Contracts';

// Recovery Module Pages
import RecoveryDashboardLayout from './Module/Recovery/layouts/dashboard';
import RecoveryDashboardAppPage from './Module/Recovery/pages/DashboardAppPage';
import { BalancesPage } from './Module/Recovery/pages/Balances';
// import { FeePage } from './Module/Recovery/pages/Fee';

// Query Handler Pages
import QueryHandlerDashboardLayout from './Module/QueryHandle/layouts/dashboard';
import QueryHanlderDashboardAppPage from './Module/QueryHandle/pages/DashboardAppPage';
import AddQuery from './Module/QueryHandle/pages/RegisterQuery';
import QueryList from './Module/QueryHandle/pages/QueryHandling';
import { UpdateQuery } from './Module/QueryHandle/pages/UpdateQuery';
// ----------------------------------------------------------------------

export default function Router() {
  let ModuleData = JSON.parse(localStorage.getItem('Academy'));
  let moduleName = ModuleData === null ? 'undefinedRoutes' : ModuleData.ModuleName;

  const teacherRoutes = [
    { element: <Navigate to="/dashboard/app" />, index: true },
    { path: 'app', element: <TeacherDashboardAppPage /> },
    { path: 'attendance', element: <AttendancePage /> },
    { path: 'marks', element: <MarksPage /> },
    { path: 'courses', element: <CoursesPage /> },
    { path: 'sechdule', element: <SchedulePage /> },
  ];

  const financeRoutes = [
    { element: <Navigate to="/dashboard/app" />, index: true },
    { path: 'app', element: <FinanceDashboardAppPage /> },
    { path: 'registerquery', element: <RegisterQuery /> },
    { path: 'query', element: <QueryHandling /> },
    { path: 'admission', element: <StudentAdmission /> },
    { path: 'slip', element: <StudentSlip /> },
    { path: 'record/:recordType', element: <Record /> },
    { path: 'addrecord', element: <AddRecord /> },
    { path: 'addexpense', element: <AddExpense /> },
  ];

  const adminRoutes = [
    { element: <Navigate to="/dashboard/app" />, index: true },
    { path: 'app', element: <AdminDashboardAppPage /> },
    { path: 'conatct', element: <ContactFunc /> },
    { path: 'manageteam', element: <ManageTeam /> },
    { path: 'createuser', element: <CreateUser /> },
    { path: 'invocies', element: <InvoicesFunc /> },
    { path: 'createid', element: <CreateID /> },
    { path: 'courses', element: <Courses /> },
    { path: 'assign', element: <AssignCourses /> },
    { path: 'program', element: <AddProgram /> },
    { path: 'enrollment', element: <EnrollmentPage /> },
    { path: 'courselist', element: <CoursesList /> },
    { path: 'studentlist/:CourseID', element: <CourseStudentList /> },
  ];

  const studentRoutes = [
    { element: <Navigate to="/dashboard/app" />, index: true },
    { path: 'app', element: <StudentDashboardAppPage /> },
    { path: 'Attandance', element: <AttandancePage /> },
    { path: 'timetable', element: <TimeTablePage /> },
    { path: 'course', element: <CoursePage /> },
    { path: 'transcript', element: <TranscriptPage /> },
  ];

  const hrRoutes = [
    { element: <Navigate to="/dashboard/app" />, index: true },
    { path: 'app', element: <HRDashboardAppPage /> },
    { path: 'attandance', element: <StaffAttandancePage /> },
    { path: 'contact', element: <StaffContactPage /> },
    { path: 'contracts', element: <ContractPage /> },
  ];

  const recoveryRoutes = [
    { element: <Navigate to="/dashboard/app" />, index: true },
    { path: 'app', element: <RecoveryDashboardAppPage /> },
    { path: 'balances', element: <BalancesPage /> },
  ];

  const queryhandlerRoutes = [
    { element: <Navigate to="/dashboard/app" />, index: true },
    { path: 'app', element: <QueryHanlderDashboardAppPage /> },
    { path: 'registerquery', element: <AddQuery /> },
    { path: 'querylist', element: <QueryList /> },
    { path: 'updatequery', element: <UpdateQuery /> },
  ];

  const undefinedRoutes = [
    { element: <Navigate to="login" />, index: true },
    { path: '404', element: <Page404 /> },
    { path: '*', element: <Navigate to="/404" /> },
  ];

  const routes = useRoutes([
    {
      path: '/dashboard',
      element:
        moduleName === 'admin' ? (
          <AdminDashboardLayout />
        ) : moduleName === 'teacher' ? (
          <TeacherDashboardLayout />
        ) : moduleName === 'finance' ? (
          <FinanceDashboardLayout />
        ) : moduleName === 'student' ? (
          <StudentDashboardLayout />
        ) : moduleName === 'hr' ? (
          <HRDashboardLayout />
        ) : moduleName === 'recovery' ? (
          <RecoveryDashboardLayout />
        ) : moduleName === 'queryhandler' ? (
          <QueryHandlerDashboardLayout />
        ) : (
          <LoginPage />
        ),
      children:
        moduleName === 'admin'
          ? adminRoutes
          : moduleName === 'teacher'
          ? teacherRoutes
          : moduleName === 'finance'
          ? financeRoutes
          : moduleName === 'student'
          ? studentRoutes
          : moduleName === 'hr'
          ? hrRoutes
          : moduleName === 'recovery'
          ? recoveryRoutes
          : moduleName === 'queryhandler'
          ? queryhandlerRoutes
          : undefinedRoutes,
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
