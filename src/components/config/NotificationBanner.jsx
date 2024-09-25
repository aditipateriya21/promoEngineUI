import React from 'react';
import { Snackbar, Alert } from '@mui/material';

function NotificationBanner({ notification, onDismiss }) {
    return (
        <Snackbar
            open={!!notification}
            autoHideDuration={6000}
            onClose={onDismiss}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 

        >
            <Alert onClose={onDismiss} severity={notification?.type}>
                {notification?.message}
            </Alert>
        </Snackbar>
    );
}

export default NotificationBanner;
