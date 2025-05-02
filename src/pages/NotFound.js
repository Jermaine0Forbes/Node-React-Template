import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function NotFound()
{
    
    return (
        <Container>
            <Box>
                <Typography variant="h3">404</Typography>
                <Typography variant="h6">page not found</Typography>
            </Box>
        </Container>
    );
}