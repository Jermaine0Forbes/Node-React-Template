import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/material';
import Typography from '@mui/material/Typography';
import {json, toJson } from "../../utils/index";
import { v4 as uuidv4 } from 'uuid';
import TextEditor from '../RichTextEditor/TextEditor';
import classNames from 'classnames';

const useStyles = makeStyles(() => ({
    title: {
        // display: "flex",
        color: "white",
        // flexGrow: 1,
        "& a": {
            color: "white",
            textDecoration: "none"
        }
    },
    entry: {
        marginRight:'15px',
        flewGrow: 0,
       
        fontSize:'1em',
        textTransform:'capitalize',
    },
    entryBlock: {
        display: 'flex',
        alignItems: 'center',
        padding: "1em",
       

        "& .MuiTextField-root":{
            width:"100%",
            marginLeft: "1em",
        }

    },
    entryHeading: {
        textTransform:'uppercase',
        fontSize: "0.8em",
        color: 'white',
    },

    entryHead: {
        fontSize:"1.2em",
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: "10px 10px 0 0",
        padding: "1em", 
        marginBottom:"2px",
        
    },
    entrySection: {
       
        // color:'white',

        "& .MuiFilledInput-root": {
            backgroundColor:"transparent",
            
        },
        "& .MuiFilledInput-underline:before": {
            borderColor: "white"
        }
    }, 
    entryBody: {
        backgroundColor: '#4d4d4d',
        borderRadius: "0 0 10px 10px", 
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        marginBottom: "1em"
    },
    entryOrder: {
        backgroundColor: 'white',
    },

    entryTag: {
        position:'relative'
    },

    hidden: {
        display: "none"
    },
    tagField: {
        width:'100%'
    }
}));


export default function Entry({num = 0, data = {},  id = null, options = []})
{

    const [title, setTitle] = useState(data?.title ?? '');
    const [entry, setEntry] = useState(data?.entry ?? '');
    const [tags, setTags] = useState([]);
    const orderId = data?.order ?? uuidv4();
    const defaultInfo = {
        id: data?.id ?? null,
        title: title,
        entry: entry,
        tags: tags,
        order: orderId,
        topicId: id,
    };

    const [info, setInfo] = useState(json(defaultInfo));
    const [savedTags, setSavedTags] = useState([]);
    const classes = useStyles();
    const handleTags = (evt, value) => {
        // console.log('saved tags')
        // console.log(savedTags)
        // console.log('value')
        // console.log(value)
        setSavedTags(value)
        setTags(value);
       
    }

    useEffect(() => {

        const newInfo = {
            id: data?.id ?? null,
            title: title,
            entry: entry,
            tags: [...savedTags].reverse(),
            order: orderId,
            topicId: id,
        };


        setInfo(json(newInfo));

    }, [tags,title, entry]);

    const handleField = (e) => {
        const {value, name} = e.target;
        switch(name) {

            case 'title':
            setTitle(value)
            break;

            case 'entry':
             setEntry(value)

        }

    }

    useEffect(() => {
        if(data?.tags && data?.tags.length > 0){
            const tagsSaved = [];
            const tagsField = [];
            let jsonTag;
            let tag;
            for(let i =  data.tags.length -1 ; i >= 0; i--){
                tag = data.tags[i];
                jsonTag = toJson(tag);
                tagsSaved.push(tag);
                tagsField.push(tag);
            }

            setSavedTags(tagsSaved);

            setTags(tagsField);

        }
    },[data?.tags])
    
    return (
        <Box component={'section'} className={classNames(classes.entrySection, "entry-section")}>
            <Grid className={classes.entryHead}>
                <Chip
                    label={num}
                    component="div"
                    href="#basic-chip"
                    variant="outlined"
                    className={classes.entryOrder}
                />
            </Grid>
            <Grid className={classes.entryBody}>
                <Grid className={classes.entryBlock}>
                    <Grid item md={1}>
                        <Typography className={classes.entryHeading}>Title:</Typography>
                    </Grid>
                    <Grid item md={10}>
                        {
                            data?.id && (

                                <TextField
                                name={"id"}
                                type="hidden"
                                className={classes.hidden}
                                hidden
                                value={data?.id}
                                >
                                </TextField>

                            ) 
                        }
                        
                        <TextField
                        variant="filled"
                        size="small"
                        margin="normal"
                        className={classes.title}
                        name={"title"}
                        onChange={handleField}
                        value={title}
                        >
                        </TextField>
                    </Grid>
                </Grid>
                <Grid container className={classes.entryBlock}>
                    <Grid item md={1}>
                        <Typography className={classes.entryHeading}>Entry:</Typography>
                    </Grid>
                    <Grid item md={10}>
                        <TextEditor content={entry} handleEditor={setEntry} />

                    </Grid>
                </Grid>

                <Grid container className={classNames(classes.entryBlock,classes.entryTag)}>
                    <Grid item md={1}>
                        <Typography className={classes.entryHeading}>Tags:</Typography>

                    </Grid>
                    <Grid item md={10}>
                        <Autocomplete
                            multiple
                            id="tags-standard"
                            freeSolo
                            disablePortal={true}
                            options={ options}
                            className={classes.tagField}
                            getOptionLabel={(option) => {
                                // Value selected with enter, right from the input
                                if (typeof option === 'string') {
                                    return  option;
                                }
                                // Add "xxx" option created dynamically
                                if (option.inputValue) {
                                    return { name: option.inputValue, id: null};
                                }
                                // Regular option
                                return option.name;
                            }}
                            // defaultValue={[top100Films[1]]}
                            value={savedTags}
                            
                            onChange={handleTags}
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="filled"
                                label="Multiple values"
                                placeholder="Tags"
                            />
                            )}
                        />

                    </Grid>
                </Grid>
                    <TextField
                        type="hidden" 
                        className={classes.hidden} 
                        name={"info"}
                        value={info}
                    />
            </Grid>

        </Box>
    );
}