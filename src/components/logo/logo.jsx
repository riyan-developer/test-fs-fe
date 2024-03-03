import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { RouterLink } from 'src/routes/components';

const Logo = () => {
  const logo = (
    <Box
      component="div"
      sx={{
        pr: 10,
      }}
    >
      <img src="/assets/logo.png" alt="" height={100} width={200}  />
    </Box>
  );

  return (
    <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
};

Logo.propTypes = {};

export default Logo;
