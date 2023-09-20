import React from 'react';
import Box from '@material-ui/core/Box';



export default function Section(props) 
{  
    const {children, ...other} = props;
    
    return (
        <Box component={'section'} {...other}>
            {children}
        </Box>
    )
}