import React, {useContext, useState, useEffect, useRef} from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
// import TextField from '@material-ui/core/TextField';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import ButtonGroup from '@mui/material/ButtonGroup';
// import BottomNavigation from '@mui/material/BottomNavigation';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ImageIcon from '@mui/icons-material/Image';
import LinkIcon from '@mui/icons-material/Link';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useColor } from '../../hooks/users';
import {AuthContext} from '../../providers/AuthProvider';
import { useNavigate, useParams} from "react-router-dom";
import { useMutation } from 'react-query';
import { useQuery } from 'react-query';
import { fetchSubtopics } from '../../services/topic';
import { makeStyles } from '@material-ui/core';
import Collapse from '@mui/material/Collapse';
import ChildSubtopicList from './ChildSubtopicList';
import { getKey as key } from '../../utils';

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
    subtopicItem: {
        color:"white"
    }

}));

export default function SubtopicList({subtopicList})
{
        const {getUser, token} = useContext(AuthContext);
        const user = getUser(token);
        const color = useColor(user?.adminLevel);
        const [subTopics, setSubTopics] = useState([]);
        const [subEntries, setSubEntries] = useState([]);
        const [openSubList, setOpenSubList] = useState(false);
        const [subId, setSubId] = useState(null);
        const [goto, setGoto] = useState(false);
        const prevSubId  = useRef(0);
        const redirect = useNavigate();
        const classes = useStyles();
        const {isLoading: subEntriesLoading,  data:subData, refetch} = useQuery('get-subtopics-entries', () => fetchSubtopics(subId),{ enabled: !!subId});

        useEffect(() => {
            // let data; 

            if(goto){
                redirect(goto, {replace: true});
                redirect(0);
            }
            if(subData){
                 const {subtopics, entries} = subData;
                //  console.log('subData')
                //  console.log(subData)
                setSubEntries(entries);
                setSubTopics(subtopics);
            }
            if(prevSubId !== subId){
                refetch();
            }

        },[ goto, subData, subId]);


        // const handleSubtopic =  (evt) => {
        //     const id = evt.target.dataset.subtopicId ??  null;
        //     // console.log(evt.target)
        //     // console.log(evt.target.dataset)
        //     // console.log(id)
        //     setSubId(id);
        //     setOpenSubList(!openSubList);
        // }

        const handleDropdown = (id) => {
            let shouldOpen ;
            const diffId = subId !== id;
            if(diffId){
                shouldOpen = true;
                prevSubId.current = subId;
                setSubId(id);
            }else{
                shouldOpen = !openSubList;
            }
    
           setOpenSubList(shouldOpen)
        }

        // console.log('openSubList')
        // console.log(openSubList)
        // console.log('subTopics')
        // console.log(subTopics)
        // console.log('subEntries')
        // console.log(subEntries)
    
    return (
            
        <Box component="section">
            {
                (subtopicList?.length > 0) && (
                    <List >
                        {
                            subtopicList.map((e,i) => {
                                const openUp = !!(openSubList && (subId === e.id));
                                return (
                                    <section key={key(i)}>
                                        <ListItem 
                                            key={i} 
                                            className={classes.subtopicItem} 
                                            style={{backgroundColor:color}}
                                            secondaryAction={
                                                <>
                                                <IconButton 
                                                    onClick={() => setGoto("/topic/"+e?.id)} 
                                                    edge="end" 
                                                    aria-label="link"
                                                >
                                                    <LinkIcon />
                                                </IconButton>
                                                <IconButton 
                                                    edge="end" 
                                                    aria-label="show more"
                                                    onClick={ () => handleDropdown(e.id)}
                                                >
                                                    {
                                                        openUp ? (
                                                            <KeyboardArrowUpIcon  />
                                                        ) : (
                                                            <KeyboardArrowDownIcon />
                                                        )
                                                    }
                                                    
                                                </IconButton>
                                                </>
                                            }
                                        >
                                        <ListItemAvatar>
                                            <Avatar>
                                                <ImageIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={e?.title} />
                                    </ListItem>
                                    
                                    <Collapse in={openUp}>
                                        <ChildSubtopicList
                                        isLoading={subEntriesLoading}
                                        childTopics={subTopics}
                                        childEntries={subEntries}
                                        setGoto={setGoto}
                                        />
                                    </Collapse>
                                 </section>
                                );
                            })
                        }
                    </List>
                )
            }
        </Box>
             
    );
}