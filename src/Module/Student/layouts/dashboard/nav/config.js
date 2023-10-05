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
    path: '/dashboard/attandance',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Time Table',
    path: '/dashboard/timetable',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Course',
    path: '/dashboard/course',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Transcript',
    path: '/dashboard/transcript',
    icon: icon('ic_analytics'),
  },

  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
