import DashboardIcon from '@mui/icons-material/Dashboard';
import PostAddIcon from '@mui/icons-material/PostAdd';
import SchoolIcon from '@mui/icons-material/School';
import DescriptionIcon from '@mui/icons-material/Description';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import SvgColor from '../../../components/svg-color';

// const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: <DashboardIcon />,
  },
  {
    title: 'Register Query',
    path: '/dashboard/registerquery',
    icon: <AddCircleOutlineIcon />,
  },
  {
    title: 'Query',
    path: '/dashboard/query',
    icon: <PostAddIcon />,
  },
  {
    title: 'Student Admission',
    path: '/dashboard/admission',
    icon: <SchoolIcon />,
  },
  {
    title: 'Student Slip',
    path: '/dashboard/slip',
    icon: <PostAddIcon />,
  },
  {
    title: 'Add Record',
    path: '/dashboard/addrecord',
    icon: <PostAddIcon />,
  },
  {
    title: 'Record',
    path: '/dashboard/record/expenses',
    icon: <DescriptionIcon />,
  },

  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
