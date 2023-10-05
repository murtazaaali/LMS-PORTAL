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
    title: 'Create User',
    path: '/dashboard/createuser',
    icon: icon('ic_user'),
  },
  {
    title: 'Manage Team',
    path: '/dashboard/manageteam',
    icon: icon('ic_user'),
  },

  {
    title: 'Invocies',
    path: '/dashboard/invocies',
    icon: icon('ic_user'),
  },

  {
    title: 'Reports',
    path: '/dashboard/reports',
    icon: icon('ic_user'),
  },
  {
    title: 'Conatct',
    path: '/dashboard/conatct',
    icon: icon('ic_user'),
  },
];

export default navConfig;
