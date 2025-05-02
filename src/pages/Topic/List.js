import React, {useContext} from 'react';
import { useQuery } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { useColor } from '../../hooks/users';
import {AuthContext} from '../../providers/AuthProvider';
import { fetchTopics } from '../../services/topic';
import WhileLoading from '../../components/Loading/WhileLoading';

export default function TopicList()
{
    const {getUser, token} = useContext(AuthContext);
    const user = getUser(token);
    const color = useColor(user?.adminLevel);
    const {isLoading,  data} = useQuery('topics', () => fetchTopics(user?.id));

    return (
        <Container>
                <Box component={'div'} onSubmit={(e) =>console.log(e)} >
                <main>
                    <Typography variant="h3">Topics</Typography>
                    <WhileLoading isLoading={isLoading}>
                        {
                             data && data.length ? (
                                data.map((e, i) => {
                                   return <Typography variant="h4" key={i}>
                                    <Link href={'/topic/'+e?.id}  style={{color}} >
                                        {e?.title}
                                    </Link>
                                    </Typography>;

                                })
                            ) :
                            <Link href='/topic/create' variant="subtitle1" style={{color}} >no topics? create one here</Link>
                        }
                    </WhileLoading>
                   
                </main>
                </Box>

                <Link href='/topic/create'>
                    <SpeedDial
                        ariaLabel="SpeedDial basic example"
                        sx={{ position: 'absolute', bottom: 16, right: 16,  color}}
                        icon={<SpeedDialIcon />}
                    >
                    </SpeedDial>
                </Link>
        </Container>
        
    );
}