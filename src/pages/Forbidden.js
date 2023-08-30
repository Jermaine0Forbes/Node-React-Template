import React from 'react';
import { 
    Container, Grid, Box,
    Typography 
} from '@material-ui/core';

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