import React from 'react';
import { 
    Container, Grid, Box, 
    Typography,TextField, Button, 
    CircularProgress, FormControl,
    Select, MenuItem, InputLabel,
    Snackbar
} from '@material-ui/core';

export const Form = ({children, attr }) => <Box component={'form'} {...attr}>{children}</Box>