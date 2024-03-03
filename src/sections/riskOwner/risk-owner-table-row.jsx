import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

const RiskOwnerTableRow = ({
  selected,
  name,
  title,
  role,
  email,
  handleClick,
  handleDeleteRiskOwnerClick,
  handleUpdateRiskOwnerClick,
  handleRiskOwnerDetails
}) => {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{title}</TableCell>

        <TableCell>{email}</TableCell>

        <TableCell>{role}</TableCell>

        <TableCell >
          <IconButton onClick={handleDeleteRiskOwnerClick} color='error' title='Delete'>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
          <IconButton onClick={handleUpdateRiskOwnerClick} color='primary' title='Edit'>
            <Iconify icon="ph:pen" />
          </IconButton>
          <IconButton onClick={handleRiskOwnerDetails} color='success' title='View'>
            <Iconify icon="ph:eye" />
          </IconButton>
        </TableCell>
      </TableRow>
  );
}

RiskOwnerTableRow.propTypes = {
  title: PropTypes.any,
  handleClick: PropTypes.func,
  name: PropTypes.any,
  role: PropTypes.any,
  selected: PropTypes.any,
  email: PropTypes.string,
  handleDeleteRiskOwnerClick: PropTypes.func,
  handleUpdateRiskOwnerClick: PropTypes.func,
  handleRiskOwnerDetails: PropTypes.func
};

export default RiskOwnerTableRow;