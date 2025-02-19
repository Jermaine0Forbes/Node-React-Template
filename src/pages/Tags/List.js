import React, {useContext} from 'react';
import { useQuery } from 'react-query';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { useColor } from '../../hooks/users';
import {AuthContext} from '../../providers/AuthProvider';
import WhileLoading from '../../components/Loading/WhileLoading';

export default function TagList()
{
    const {getUser, token} = useContext(AuthContext);
    const user = getUser(token);
    const color = useColor(user?.adminLevel);

    return (
        <Container>
                <Box component={'div'} onSubmit={(e) =>console.log(e)} >
                    <main>
                        <Typography variant="h3">Tag</Typography>

                    </main>
                </Box>
        </Container>
        
    );
}