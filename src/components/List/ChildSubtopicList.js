import React, {useContext, useState, useEffect, useRef} from 'react';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import ButtonGroup from '@mui/material/ButtonGroup';
// import BottomNavigation from '@mui/material/BottomNavigation';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
// import ImageIcon from '@mui/icons-material/Image';
import LinkIcon from '@mui/icons-material/Link';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useColor } from '../../hooks/users';
import {AuthContext} from '../../providers/AuthProvider';
// import { useNavigate, useParams} from "react-router-dom";
// import { useMutation } from '@tanstack/react-query';
// import { useQuery } from '@tanstack/react-query';
// import { fetchSubtopics } from '../../services/topic';
import { makeStyles } from '@mui/material';
import WhileLoading from '../Loading/WhileLoading';
// import Collapse from '@mui/material/Collapse';

const useStyles = makeStyles(() => ({

    subtopicItem: {
        color:"white"
    }

}));

export default function ChildSubtopicList({isLoading, childTopics, childEntries, setGoto})
{
        const {getUser, token} = useContext(AuthContext);
        const user = getUser(token);
        const color = useColor(user?.adminLevel);
        // const [subtopicList, setSubtopicList] = useState([]);
        // const [subTopics, setSubTopics] = useState([]);
        // const [subEntries, setSubEntries] = useState([]);
        // const [openSubList, setOpenSubList] = useState(false);
        // const [subId, setSubId] = useState(null);
        // const [goto, setGoto] = useState(false);
        // const {id} = useParams()
        // const redirect = useNavigate();
        const classes = useStyles();
        // const {isLoading: subEntriesLoading,  data:subData} = useQuery('get-subtopics-entries', () => fetchSubtopics(subId),{ enabled: !!subId});

        // useEffect(() => {
        //     // let data; 

        //     if(goto){
        //         redirect(goto, {replace: true});
        //         redirect(0);
        //     }
        //     if(subData){
        //          const {subtopics, entries} = subData;
        //         //  console.log('subData')
        //         //  console.log(subData)
        //         setSubEntries(entries);
        //         setSubTopics(subtopics);
        //     }
        // },[ goto, subData]);
    
    return (
            <WhileLoading isLoading={isLoading}>
                    {
                        ( childTopics?.length > 0) && (
                            <List >
                                {
                                    childTopics?.map((e,i) => {

                                        return (
                                            <ListItem 
                                                key={i} 
                                                className={classes.subtopicItem} 
                                                style={{backgroundColor:color}}
                                                secondaryAction={
                                                    <IconButton 
                                                        onClick={() => setGoto("/topic/"+e?.id)} 
                                                        edge="end" 
                                                        aria-label="link"
                                                    >
                                                        <LinkIcon />
                                                    </IconButton>
                                                }
                                            >

                                        <ListItemText primary={e?.title} />
                                    </ListItem>
                                        )
                                    })
                                }


                            </List>
                        )
                    }
                    {
                        
                    ( childEntries?.length > 0) && (
                        <List >
                            {
                                childEntries?.map((e,i) => {

                                    return (
                                        <ListItem 
                                        key={i} 
                                        >

                                    <ListItemText secondary={e?.title} />
                                </ListItem>
                                    )
                                })
                            }


                        </List>
                    )
                    }
            </WhileLoading>
        );
}