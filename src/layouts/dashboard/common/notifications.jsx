import { useState, useCallback } from 'react';

import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';


const Notification = () => {
  const [notifications, setNotifications] = useState(1);

  const handleNotificationChange = useCallback(() => {
    setNotifications((prevNotifications) => prevNotifications + 1);
  }, []);

  return (
      <IconButton color='primary' onClick={handleNotificationChange}>
        <Badge badgeContent={notifications} color="error">
          <Iconify width={24} icon="solar:bell-bing-bold-duotone" />
        </Badge>
      </IconButton>
  );
}

export default Notification;