// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Attandance',
    path: '/dashboard/attendance',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Marks',
    path: '/dashboard/marks',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Courses',
    path: '/dashboard/courses',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Sechdule',
    path: '/dashboard/sechdule',
    icon: icon('ic_analytics'),
  },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
];

export default navConfig;
