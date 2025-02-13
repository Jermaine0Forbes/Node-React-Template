import React, {useContext, useState, useEffect, useRef} from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import { useColor } from '../../hooks/users';
import {AuthContext} from '../../providers/AuthProvider';
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from 'react-query';
import { useQuery } from 'react-query';
import { fetchTopic, updateTopic } from '../../services/topic';
import { createEntry, fetchEntries } from '../../services/entry';
import Entry from '../../components/Entry/Entry';
import { makeStyles } from '@material-ui/core';

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
    }

}));

export default function TopicEdit()
{
        const {getUser, token} = useContext(AuthContext);
        const user = getUser(token);
        const color = useColor(user?.adminLevel);
        const [subtopics, setSubtopics] = useState([]);
        const [posY, setPosY] = useState(0)
        const [title, setTitle] = useState('');
        const [entries, setEntries] = useState([{}]);
        const {id} = useParams()
        const entryRef = useRef();
        const titleRef = useRef();
        const redirect = useNavigate();
        const classes = useStyles();
        const {isLoading,  data: topicData} = useQuery('topics', () => fetchTopic(id));
        const {isLoading: entryDataLoading,  data:entriesData} = useQuery('get-entries', () => fetchEntries(id));
        const { mutate: mutateTopic } = useMutation({
            mutationFn: (data) => updateTopic(data),
            onSuccess: async (data) => {
                const topic = await data.json();
                if(data !== 200){
                    console.log("success")
                    console.log(topic)
                }else{
                    console.log("errors")
                }
            }
        });
        const { mutate: mutateEntry} = useMutation({
            mutationFn: (data) => createEntry(data),
            onSuccess: async (data) => {

                console.log(data)
                // if(data.status === 200){
                //    const topic =  await data.json();
                //     console.log(topic)
                //     // redirect('/');
                // } 
            },
            onError: async (err) => {
                console.log(err)
            }
        });
        useEffect(() => {
            let data; 
            if(topicData){
                const {topic, subtopics: st} = topicData;

                setTitle(topic?.title);
                setSubtopics(st)
            }
            if(entriesData) {
               data = Array.isArray(entriesData) && entriesData?.length === 0 
               ? [{}] :entriesData;
               console.log(data)
               setEntries(data)
            }
        },[topicData, entriesData]);




        const handleEntry = (adding = false) => {

            let data = {};
            const list = [];
            const form = new FormData(entryRef.current);
            for (const [key, value] of form.entries()){
                data[key] = value;

                if(key.includes('tags')){
                    data.topicId = id;
                    list.push(data)
                    data = {};
                }
            };
            if(adding) {
                list.push({})
            }
            setEntries(list)
            // console.log(list)
        }

        const addEntry = (e) => {
            e.preventDefault();
            handleEntry(true);
        }

        const handleSubmit = (e) => {
            e.preventDefault();
            mutateTopic({title, userId: user?.id, id });
            // handleEntry();
            console.log('handle submit entries')
            console.log(entries)
            const data = entries.map((e,i) => {
                let include = false;
                for (const [key, value] of Object.entries(e)){
                    let requiredField = key.includes('title') || key.includes('entry');
                    if(requiredField && value.trim()){
                        include = true;
                    }
                };
                if(include) {
                    return e;
                }

            })
            mutateEntry(data);
            // const data = {title, entries};


            console.log(data)
            // mutate(data)
        }
    
    return (
            <Box>
                <Grid component="section">
                    <Typography variant="h3">Topic: 
                    <TextField 
                            name="title" type='text' 
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            variant="standard"
                            size="small"
                            margin="normal"
                            ref={titleRef}
                            className={classes.topicTitle}
                            >
                    </TextField>
                    </Typography>
                </Grid>
                <Grid component="section">
                    {
                        (subtopics?.length > 0) && (
                            <List >
                                {
                                    subtopics.map((e,i) => {
                                        return (<ListItem key={i}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <ImageIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={e?.title} />
                                    </ListItem>);
                                    })
                                }
                            </List>
                        )
                    }
                </Grid>
                <Grid 
                    ref={entryRef} 
                    className={classes.entryContainer}
                    component={'form'}
                >
                    {
                       entries?.length && entries.map((e, i) => {
                            // console.log("e")
                            // console.log(e)
                            return <Entry key={i} num={i+1} data={e} handleChange={handleEntry}/>
                        })
                    }
                </Grid>    
                <Grid 
                    component="section"    
                    elevation={3}
                    className={classes.bottomNavSection}
                >
                    <BottomNavigation
                        className={classes.bottomNav}
                        value={posY}
                        onChange={(event, newValue) => {
                        setPosY(newValue);
                        }}
                    >
                        <ButtonGroup
                            variant="contained"
                        >
                            <Button
                                variant='contained'
                                onClick={addEntry} 
                                style={{ backgroundColor:color, color:"white"}}
                            
                            >
                                Add entry
                            </Button>
                            <Button   
                                type='submit' 
                                variant='contained' 
                                style={{ backgroundColor:color, color:"white"}}
                                onClick={handleSubmit}
                            >
                                Save changes
                            </Button>
                        </ButtonGroup>
                    </BottomNavigation>
                </Grid>
            </Box>
    );
}