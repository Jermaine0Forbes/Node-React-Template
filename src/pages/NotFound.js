import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

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