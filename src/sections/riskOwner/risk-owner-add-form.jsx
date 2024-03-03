/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';
import { Alert, Grid, useMediaQuery, useTheme } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { createRiskOwner, updateRiskOwner } from 'src/services/riskOwnerServices';

export const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
};

const RiskOwnerAdd = ({ open, setOpen, getRiskOwners, setIsSuccess, setMessage, owner, isEditMode }) => {
  const handleClose = () => setOpen(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const roles = ['User', 'Owner'];

  const [riskOwner, setRiskOwner] = useState({
    name: isEditMode ? owner.name : '',
    title: isEditMode ? owner.title : '',
    email: isEditMode ? owner.email : '',
    role: isEditMode ? owner.role : '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => () => {
        setRiskOwner({
          name: '',
          title: '',
          email: '',
          role: '',
        });
      }
  , []);

  const validateForm = () => {
    if (!riskOwner.name || !riskOwner.title || !riskOwner.email || !riskOwner.role) {
      setError('All fields are required');
      return false;
    }

    setError('');
    return true;
  };

  const handleRiskOwnerSubmit = async () => {
    if (validateForm()) {
     setLoading(true);
     const resp = await createRiskOwner(riskOwner);
     setLoading(false);
      if (resp.status === 201) {
        setOpen(false);
        getRiskOwners();
        setIsSuccess(true);
        setMessage('Risk Owner added successfully');
      } else if (resp.status === 400) {
        setError(resp.data.message);
      }
    }
  };

  const handleRiskOwnerUpdate = async () => {
    if (validateForm()) {
      setLoading(true);
      const resp = await updateRiskOwner({ ...riskOwner, id: owner._id });
      setLoading(false);
      if (resp.status === 200) {
        setOpen(false);
        getRiskOwners();
        setIsSuccess(true);
        setMessage('Risk Owner updated successfully');
      } else if (resp.status === 400) {
        setError(resp.data.message);
      }
    }
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: isMobile ? '100%' : 'auto',
            border: error ? '1px solid red' : 'none', 
          }}
          component="form"
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {isEditMode ? 'Edit Risk Owner': 'Add Risk Owner'}
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Grid container spacing={2}>
            <Grid item md={6} sm={12} xs={12}>
              <TextField
                error={!riskOwner.name && error !== ''}
                required
                label="Name"
                fullWidth
                margin="normal"
                value={riskOwner.name}
                onChange={(e) => setRiskOwner({ ...riskOwner, name: e.target.value })}
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <TextField
                error={!riskOwner.title && error !== ''}
                label="Title"
                fullWidth
                margin="normal"
                value={riskOwner.title}
                onChange={(e) => setRiskOwner({ ...riskOwner, title: e.target.value })}
              />
            </Grid>
          </Grid>
          <TextField
            error={!riskOwner.email && error !== ''}
            label="Email"
            fullWidth
            type='email'
            margin="normal"
            required
            value={riskOwner.email}
            onChange={(e) => setRiskOwner({ ...riskOwner, email: e.target.value })}
          />
          <TextField
            error={!riskOwner.role && error !== ''}
            select
            label="Role"
            fullWidth
            required
            margin="normal"
            value={riskOwner.role}
            onChange={(e) => {
              setRiskOwner({ ...riskOwner, role: e.target.value });
            }}
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
          <Box display="flex" justifyContent="end" gap={2} mt={2}>
            <Button variant="contained" color="inherit" onClick={handleClose}>
              Cancel
            </Button>

            <Button variant="contained" onClick={isEditMode ? handleRiskOwnerUpdate : handleRiskOwnerSubmit} disabled={loading}>
              {loading ? <CircularProgress color="inherit" size={20} /> : (!isEditMode ? 'Add Risk Owner' : 'Update Risk Owner') }
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

RiskOwnerAdd.defaultProps = {
  open: false,
  setOpen: () => {},
  getRiskOwners: () => {},
  setIsSuccess: () => {},
  setMessage: () => {},
  isEditMode: false,
  owner: {},
};

RiskOwnerAdd.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  getRiskOwners: PropTypes.func,
  setIsSuccess:PropTypes.func,
  setMessage: PropTypes.func,
  isEditMode: PropTypes.bool,
  owner: PropTypes.any,
};

export default RiskOwnerAdd;
