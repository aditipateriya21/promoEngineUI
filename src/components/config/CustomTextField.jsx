import React from 'react';
import { TextField } from '@mui/material';

function CustomTextField({ label, name, value, onChange, type = 'text', ...props }) {
    return (
        <TextField
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            type={type}
            fullWidth
            {...props}
        />
    );
}

export default CustomTextField;
