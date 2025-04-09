import React, {useContext} from 'react';
import { useQuery } from 'react-query';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { useColor } from '../../hooks/users';
import {AuthContext} from '../../providers/AuthProvider';
import { fetchTags } from '../../services/tags';
import WhileLoading from '../../components/Loading/WhileLoading';

const useStyles = makeStyles(() => ({
    topicTitle: {
        marginLeft: "1em",

    },
    bottomNavSection: {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 3,
        marginTop:"1em"
    },
    bottomNav: {
        padding: '1em 0'
    },
    entryContainer: {
        paddingBottom: '5em'
    },
    tagItem: {
        color:"white"
    }

}));

export default function TagList()
{
    const {getUser, token} = useContext(AuthContext);
    const user = getUser(token);
    const color = useColor(user?.adminLevel);
    const {isLoading,  data} = useQuery('get-tags', () => fetchTags(user?.id));

    return (
        <Container>
                <Box component={'div'} onSubmit={(e) =>console.log(e)} >
                <main>
                    <Typography variant="h3">Tags</Typography>
                    <Grid component="section">
                        <WhileLoading isLoading={isLoading}>

                            {
                               data.length ? (
                                <List >
                                {
                           
                                    data.map((e, i) => {
                                        return (

                                            <>
                                                <ListItem 
                                                    key={i} 
                                                    className={classes.tagItem} 
                                                    style={{backgroundColor:color}}
                                                    secondaryAction={
                                                        <IconButton 
                                                            edge="end" 
                                                            aria-label="show more"
                                                            onClick={handleSubtopic}
                                                        >
                                                            {
                                                                openSubList ? (
                                                                    <KeyboardArrowUpIcon  />
                                                                ) : (
                                                                    <KeyboardArrowDownIcon data-subtopic-id={e?.id} />
                                                                )
                                                            }
                                                            
                                                        </IconButton>
                                                    }
                                                >
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <ImageIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={e?.name} />
                                            </ListItem>
                                            
                                            <Collapse in={openSubList}>

                                            </Collapse>
                                            </>
                                            );
                                    })

                                }
                                </List>
                                ) :
                                <Link href='/topic/list' variant="subtitle1" style={{color}} >no tags? create them within an topic entry</Link>
                            }
                        </WhileLoading>
                    </Grid>
                </main>
                </Box>
        </Container>
        
    );
}