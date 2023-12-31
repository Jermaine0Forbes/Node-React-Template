import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

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