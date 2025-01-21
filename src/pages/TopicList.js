import React, {useContext} from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Link from '@material-ui/core/Link';
import { useColor } from '../hooks/users';
import {AuthContext} from '../providers/AuthProvider';

export default function TopicList()
{
    const {getUser, token} = useContext(AuthContext);
    const user = getUser(token);
    const color = useColor(user?.adminLevel);
    return (
        <Container>
                <Box component={'div'} onSubmit={(e) =>console.log(e)} >
                <main>
                    <Typography variant="h3">Topics</Typography>

                    <Link href='/topic/create' variant="subtitle1" style={{color}} >no topics? create one here</Link>
                </main>
                </Box>
        </Container>
    );
}