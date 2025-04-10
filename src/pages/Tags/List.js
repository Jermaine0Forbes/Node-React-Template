import React, {useContext, useState, useEffect} from 'react';
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
import {getKey as key } from "../../utils/index";
import { makeStyles } from '@material-ui/core';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
// import ImageIcon from '@mui/icons-material/Image';
import LinkIcon from '@mui/icons-material/Link';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import classNames from 'classnames';

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
        color:"white",
        marginBottom:'0.5em',
        borderBottom:"5px solid #0a1f5c",
    },

    tagLink: {
        display: 'flex',
        alignItems: 'center',

        "& .tagName": {
            fontSize:"2em",
            color:'white',
            "&:hover": {
                textDecoration:'underline',
            }
        },
    },
    topicTitle: {
        "& > span": {
            fontWeight:'bold',

        },
    }

}));

export default function TagList()
{
    const {getUser, token} = useContext(AuthContext);
    const user = getUser(token);
    const color = useColor(user?.adminLevel);
    const classes = useStyles();
    const [tagList, setTagList] = useState([]);
    const [entriesList, setEntriesList] = useState([]);
    const [currentEntries, setCurrentEntries] = useState([]);
    const [openCollapse, setOpenCollapse] = useState(false);
    const [dropDownId, setDropDownId] = useState(0);
    const {isLoading,  data} = useQuery('get-tags', () => fetchTags(), { refetchOnWindowFocus: false});

    useEffect(() => {
        if(data?.length) {
            const entries = data.map((tag) => ({id:tag.id, entries: tag.entries}));
            const tags = data.map((tag) => {
                delete tag.entries;
                return tag
            });

            setTagList(tags)
            setEntriesList(entries)

        }
    },[data]);

    const handleDropdown = (tagId) => {
       if(!openCollapse) {
           const el =  entriesList.filter((entry) => entry.id == tagId)[0]
           const {entries} = el;
           console.log('entries')
           console.log(el)
           setCurrentEntries(entries);
           setDropDownId(tagId)
       }
       setOpenCollapse(!openCollapse)
    }

    return (
        <Container>
                <main>
                    <Typography variant="h3">Tags</Typography>
                    <Grid component="section">
                        <WhileLoading isLoading={isLoading}>

                            {
                               data?.length ? (
                                <List >
                                {
                           
                                    tagList.map((e, i) => {
                                         const openUp = !!(openCollapse && (dropDownId === e.id));
                                        return (
                                            <section key={key(i)}>
                                                <ListItem 
                                                    key={key(i)} 
                                                    className={classes.tagItem} 
                                                    style={{backgroundColor:color}}
                                                    secondaryAction={
                                                        <IconButton 
                                                            edge="end" 
                                                            aria-label="show more"
                                                            onClick={() => handleDropdown(e.id)}
                                                        >
                                                            {
                                                                openUp ? (
                                                                    <KeyboardArrowUpIcon  />
                                                                ) : (
                                                                    <KeyboardArrowDownIcon />
                                                                )
                                                            }
                                                            
                                                        </IconButton>
                                                    }
                                                >
                                                    <Link href={'/tag/'+e.id} className={classes.tagLink}>
                                                        <ListItemAvatar>
                                                            <Avatar>
                                                                <LinkIcon />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary={e?.name} className='tagName' />
                                                    </Link>
                                                </ListItem>
                                                <Collapse in={openUp}>
                                                    <List>
                                                        <Grid
                                                            component={'section'}  
                                                            container 
                                                        >
                                                            <Grid item md={6}>
                                                                <Typography variant="h6">Entry</Typography>
                                                            </Grid>
                                                            
                                                            <Grid item md={6}>
                                                                <Typography variant="h6">Topic</Typography>
                                                            </Grid>

                                                        </Grid>
                                                        {
                                                            currentEntries.map((e,i) => {
                                                                return (
                                                                <Grid 
                                                                    component={'section'}  
                                                                    container 
                                                                    key={key(i)}
                                                                >
                                                                    <Grid item md={6}>
                                                                        <ListItem>
                                                                            <ListItemText primary={e.title}/>
                                                                        </ListItem>
                                                                    </Grid>
                                                                    
                                                                    <Grid item md={6}>
                                                                        <ListItem>
                                                                            <Link href={"/topic/"+e.topic.id}>
                                                                                <ListItemText 
                                                                                    primary={e.topic.title}
                                                                                    className={classes.topicTitle}
                                                                                />
                                                                            </Link>
                                                                        </ListItem>
                                                                    </Grid>
                                                                </Grid>
                                                                )
                                                            })
                                                        }
                                                    </List>
                                                </Collapse>
                                            </section>
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
        </Container>
        
    );
}