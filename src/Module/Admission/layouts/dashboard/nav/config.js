// component
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import SchoolIcon from '@mui/icons-material/School';
import PostAddIcon from '@mui/icons-material/PostAdd';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  // {
  //   title: 'Register Query',
  //   path: '/dashboard/registerquery',
  //   icon: <AddCircleOutlineIcon />,
  // },
  {
    title: 'Query',
    path: '/dashboard/query',
    icon: <PostAddIcon />,
  },
  // {
  //   title: 'Student Admission',
  //   path: '/dashboard/admission',
  //   icon: <SchoolIcon />,
  // },
  // {
  //   title: 'Student Slip',
  //   path: '/dashboard/slip',
  //   icon: <PostAddIcon />,
  // },
];

export default navConfig;
