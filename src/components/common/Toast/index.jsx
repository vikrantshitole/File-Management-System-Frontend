import React, { useMemo } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Toast.scss';

const Toast = React.memo(
  () => {
    const toastConfig = useMemo(
      () => ({
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        newestOnTop: true,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        theme: 'light',
      }),
      []
    );

    return <ToastContainer {...toastConfig} />;
  },
  () => true
);

Toast.displayName = 'Toast';

export default Toast;
