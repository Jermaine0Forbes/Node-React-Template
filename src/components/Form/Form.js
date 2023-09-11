import React from 'react';
import { 
 Box 
} from '@material-ui/core';

export const Form = ({children, attr, onSubmit }) => <Box component={'form'} {...attr} onSubmit={(e) => onSubmit(e)}>{children}</Box>