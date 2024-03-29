import React, { FC, useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { NotiType } from '../lib/type';

interface ToastProp {
  data: NotiType;
}

const Toast: FC<ToastProp> = ({ data }) => {
  const { message, isOpen } = data;
  const [open, setOpen] = useState(false);

  const handleClose = (): void => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(isOpen);
  }, [data, isOpen]);

  const test = () => {
    console.log('test');
  };

  return (
    <div>
      <Snackbar
        autoHideDuration={1000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        onClose={handleClose}
        message={message}
      />
    </div>
  );
};

export default Toast;
