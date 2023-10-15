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
    title: 'Register Query',
    path: '/dashboard/registerquery',
    icon: icon('ic_analytics'),
  },

  {
    title: 'Query Handling',
    path: '/dashboard/querylist',
    icon: icon('ic_analytics'),
  },
];

export default navConfig;
