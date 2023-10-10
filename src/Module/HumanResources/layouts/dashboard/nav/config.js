// component
// import SvgColor from '../../../components/svg-color';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import ContactMailIcon from '@mui/icons-material/ContactMail';

// ----------------------------------------------------------------------

// const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: <DashboardIcon/>
  },

  {
    title: 'Contract',
    path: '/dashboard/contracts',
    icon: <DescriptionIcon/>
  },

  {
    title: 'Contact',
    path: '/dashboard/contact',
    icon: <ContactMailIcon/>
  },

  
];

export default navConfig;
