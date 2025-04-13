import React, {useContext, useState, useEffect, useRef} from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import BottomNavigation from '@mui/material/BottomNavigation';
import { useColor } from '../../hooks/users';
import {AuthContext} from '../../providers/AuthProvider';
import {useParams} from "react-router-dom";
import { useQuery, useMutation } from 'react-query';
import { fetchTopic, updateTopic } from '../../services/topic';
import { createEntry, fetchEntries } from '../../services/entry';
import Entry from '../../components/Entry/Entry';
import { makeStyles } from '@material-ui/core';
import SubtopicList from "../../components/List/SubtopicList";
import { json, getKey } from '../../utils';
import { v4 as uuidv4 } from 'uuid';
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
    subtopicItem: {
        color:"white"
    }

}));

export default function TopicEdit()
{
        const {getUser, token} = useContext(AuthContext);
        const user = getUser(token);
        const color = useColor(user?.adminLevel);
        const [subtopicList, setSubtopicList] = useState([]);
        const [posY, setPosY] = useState(0)
        const [title, setTitle] = useState('');
        const [entries, setEntries] = useState([]);
        const [tagValues, setTagValues] = useState([]);
        const {id} = useParams()
        const entryRef = useRef();
        const titleRef = useRef();
        const classes = useStyles();
      
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

        const { mutate: mutateEntry, isSuccess: createEntrySuccess} = useMutation({
            mutationFn: (data) => createEntry(data),
            onSuccess: async (data) => {
                console.log(data)
            },
            onError: async (err) => {
                console.log(err)
            }
        });

        const {isLoading,  data: topicData} = useQuery({
            queryKey:['get-topics', createEntrySuccess], 
            queryFn:() => fetchTopic(id),
            refetchOnWindowFocus: false,
        });

        const {isLoading: entriesDataLoading,  data:entriesData} = useQuery({
            queryKey:['get-entries', createEntrySuccess], 
            queryFn:() => fetchEntries(id),
            refetchOnWindowFocus: false,
        });
       
        const addEntry = (e) => {
            e.preventDefault();
            const orderId =  uuidv4();
            const newEntry = {order: orderId };
            const infos = entryRef.current.querySelectorAll('.entry-section input[name="info"]');
            console.log('infos')
            console.log(infos)
            const oldEntries = Array.from(infos).map((e) => json(e.value));
            setEntries([...oldEntries, newEntry]);
        }

        useEffect(() => {
            let data; 
            if(topicData){
                const {topic, subtopics: st} = topicData;

                setTitle(topic?.title);
                setSubtopicList(st)
            }
            if(entriesData) {
                const {entries : entryList, tags} = entriesData; 
               data = Array.isArray(entryList) && entryList?.length === 0 
               ? [{}] : entryList;

            console.log('data')
            console.log(data)

               const entryOrder = data.map((e, i) => {
                   e.order = uuidv4();
                   return e;
                })

               setEntries(entryOrder)
               setTagValues(tags);
            }

        },[topicData, entriesData]);

        const handleSubmit = (e) => {
            
            e.preventDefault();
            const infos = entryRef.current.querySelectorAll('.entry-section input[name="info"]');
            const currentEntries = Array.from(infos).map((e) => json(e.value));
            const data = {
                userId: user.id,
                topicId: id,
                entries:currentEntries
            };
   
            console.log('handle submit entries')
            console.log(data)

            mutateTopic({title, userId: user?.id, id });
            mutateEntry(data);
            setEntries([...currentEntries]);

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
                     <SubtopicList subtopicList={subtopicList}/>
                </Grid>
                <Grid 
                    ref={entryRef} 
                    className={classes.entryContainer}
                    component={'form'}
                >
                    <WhileLoading isLoading={entriesDataLoading}>
                        {
                            entries?.length && entries.map((e, i) => {
                                    return <Entry key={getKey(i)} num={i+1} data={e} id={id} options={tagValues} />
                                })
                        }
                    </WhileLoading>
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
                            // aria-label="button-group"
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