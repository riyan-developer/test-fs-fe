import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import PropTypes from 'prop-types';

const MessageAlert = ({ isSuccess, message, setIsSuccess }) => {
    const handleClose = () => {
        setIsSuccess(false);
    }
    return <Snackbar open={isSuccess} autoHideDuration={3000} message={message} onClose={handleClose}/>
};

MessageAlert.propTypes = {
  isSuccess: PropTypes.bool,
  message: PropTypes.string,
  setIsSuccess: PropTypes.func,
};

export default MessageAlert;
