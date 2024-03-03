import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useMediaQuery, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { style } from './risk-owner-add-form';

const RiskOwnerDetails = ({ open, setOpen, riskOwnerDetails }) => {
  const theme = useTheme();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: isMobile ? '100%' : '30rem' }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Risk Owner Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Name:</strong> {riskOwnerDetails?.name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Email:</strong> {riskOwnerDetails?.email}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Title:</strong> {riskOwnerDetails?.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Role:</strong> {riskOwnerDetails?.role}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

RiskOwnerDetails.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    riskOwnerDetails: PropTypes.object,
};

export default RiskOwnerDetails;
