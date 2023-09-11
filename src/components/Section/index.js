import React from 'react';
import Box from '@material-ui/core/Box';



export default function Section({ testId, children}) 
{
    return (
        <Box component={'section'} data-test-id={testId}>
            {children}
        </Box>
    )
}