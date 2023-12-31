// component
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupIcon from '@mui/icons-material/Group';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ContactPageIcon from '@mui/icons-material/ContactPage';
// import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

// const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: <DashboardIcon />,
  },
  {
    title: 'Create User',
    path: '/dashboard/createuser',
    icon: <PersonAddIcon />,
  },
  {
    title: 'Manage Team',
    path: '/dashboard/manageteam',
    icon: <GroupIcon />,
  },

  {
    title: 'Invocies',
    path: '/dashboard/invocies',
    icon: <ReceiptIcon />,
  },
  {
    title: 'Courses',
    path: '/dashboard/Courses',
    icon: <ContactPageIcon />,
  },
  {
    title: 'Enrollment',
    path: '/dashboard/enrollment',
    icon: <ContactPageIcon />,
  },

  {
    title: 'Conatct',
    path: '/dashboard/conatct',
    icon: <ContactPageIcon />,
  },
  {
    title: 'Courses List',
    path: '/dashboard/courselist',
    icon: <ContactPageIcon />,
  },
];

export default navConfig;
