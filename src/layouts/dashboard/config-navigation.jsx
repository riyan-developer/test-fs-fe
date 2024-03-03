import Iconify from 'src/components/iconify';

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: <Iconify icon="zondicons:chart-pie" />,
  },
  {
    title: 'risk register',
    path: '#',
    icon: <Iconify icon="heroicons:document-chart-bar-20-solid" />,
  },
  {
    title: 'My Risks',
    path: '#',
    icon: <Iconify icon="lucide:clipboard-copy" />,
  },
  {
    title: 'Controls',
    path: '#',
    icon: <Iconify icon="iconoir:filter-solid" />,
  },
  {
    title: 'Assessments',
    path: '#',
    icon: <Iconify icon="teenyicons:clipboard-tick-outline" />,
  },
  {
    title: 'Reports',
    path: '#',
    icon: <Iconify icon="ep:files" />,
  },
  {
    title: 'Messages',
    path: '#',
    icon: <Iconify icon="mdi:envelope-open-outline" />,
  },
  {
    title: 'Audit Trail',
    path: '#',
    icon: <Iconify icon="pepicons-pencil:file-loop" />,
  },
  {
    title: 'Settings',
    path: '#',
    icon: <Iconify icon="gravity-ui:gear" />,
  },
  {
    title: 'Help and Resources',
    path: '#',
    icon: <Iconify icon="material-symbols:help" />,
  },
];

export default navConfig;
