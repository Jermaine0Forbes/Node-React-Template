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
import { useNavigate, useParams} from "react-router-dom";
import { useMutation } from 'react-query';
import { useQuery } from 'react-query';
import { fetchTopic, updateTopic } from '../../services/topic';
import { createEntry, fetchEntries } from '../../services/entry';
import Entry from '../../components/Entry/Entry';
import { makeStyles } from '@material-ui/core';
import SubtopicList from "../../components/List/SubtopicList";
import { json, getKey, toJson, parse } from '../../utils';

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
        // const [goto, setGoto] = useState(false);
        const {id} = useParams()
        const entryRef = useRef();
        const titleRef = useRef();
        const redirect = useNavigate();
        const classes = useStyles();
        const {isLoading,  data: topicData} = useQuery('topics', () => fetchTopic(id));
        const {isLoading: entryDataLoading,  data:entriesData} = useQuery('get-entries', () => fetchEntries(id));
        // const {isLoading: subEntriesLoading,  data:subEntriesData} = useQuery('get-sub-entries', () => fetchEntries(subId),{ enabled: !!subId});
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
                setSubtopicList(st)
            }
            if(entriesData) {
               data = Array.isArray(entriesData) && entriesData?.length === 0 
               ? [{}] : entriesData;
               console.log(data)
               setEntries(data)
            }
            // if(goto){
            //     redirect(goto, {replace: true});
            //     redirect(0);
            // }
            // if(subEntriesData){
            //     setSubEntries(subEntriesData);
            // }
        },[topicData, entriesData]);


        const getOrders = (list = []) => {
            const purgedList = list.filter((val) => (typeof val === "object") && val.hasOwnProperty('order'));
            return purgedList.map(obj => obj?.order);
        }

        const handleEntry = (adding = false) => {
            let data = {};
            const isEntryEmpty = !!(entries.length <= 1 && entries[0]?.order === undefined);
            const oldEntries = isEntryEmpty ? [] : [...entries];
            const newEntries = [];

            // if(adding) {
            //     const newOrder = String(entries.length+1000);
            //     oldEntries.push({order: newOrder });
            //     setEntries(oldEntries);
            //     return true;
            // }

            const form = new FormData(entryRef.current);
            for (const [key, value] of form.entries()){
                // console.log(key)
                if(!key.includes('tags')){
                    data[key] = value;
                } else {
                    console.log('data key')
                    console.log(typeof value)
                    console.log(value)
                    switch(typeof value) {
                        case "string":
                            data[key] = typeof parse(value) === "object"? parse(value) : value ;
                        break;

                        case "object":
                            data[key] = value;
                        break;
                        default:
                            data[key] = [];

                    }
                   
                    

                    // data[key] = typeof value === "string" ? parse(value) : [];
                }
               
                if(key.includes('topicId')){
                    newEntries.push(data);
                    data = {};
                }
            }

            console.log('data')
            console.log(data)

           const orders = oldEntries.length > 0 ? getOrders(oldEntries) : [];
        //    const newOrders = data.length > 0 ? data.map(e => e?.order ) : [];
           console.log('orders')
           console.log(orders)
           // Need to map data orders and compare if the size of orders or data orders are different
           // if so then push, if not then update
            const shouldUpdate =  orders.length > 0  ?  newEntries.every((obj) => orders.includes(obj?.order))  : false;
            // const shouldUpdate = data.some(e => orders.includes(e.order));

            console.log('shouldUpdate')
            console.log(shouldUpdate)

            if (shouldUpdate) {
                // list.push(data)
                const x = newEntries;
                console.log('should update new entries data')
                console.log(x)
                setEntries(x)

            }else{
                setEntries(newEntries)
            }
            // console.log(list)
        }

        const addEntry = (e) => {
            e.preventDefault();
            // handleEntry(true);
            const isEntryEmpty = !!(entries.length <= 1 && entries[0]?.order === undefined);
            const oldEntries = isEntryEmpty ? [] : [...entries];
            const newOrder = String(entries.length+1000);
            oldEntries.push({order: newOrder });
            setEntries(oldEntries);

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
                     <SubtopicList subtopicList={subtopicList}/>
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
                            return <Entry key={getKey(i)} num={i+1} data={e} id={id} handleChange={handleEntry}/>
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
                            aria-label="button-group"
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