import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Forbidden()
{
    
    return (
        <Container>
            <Box>
                <Typography variant="h3">403</Typography>
                <Typography variant="h6">You're not authorized to access the previous page</Typography>
            </Box>
        </Container>
    );
}