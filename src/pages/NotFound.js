import React from 'react';
import { 
    Container, Grid, Box,
    Typography 
} from '@material-ui/core';

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