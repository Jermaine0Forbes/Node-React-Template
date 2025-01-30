import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

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
       
        '&> p': {
            textTransform:'uppercase',
            fontSize: "0.8em"
        },

        "& .MuiTextField-root":{
            width:"100%",
            marginLeft: "1em",
        }

    },
    entryHead: {
        fontSize:"1.2em",
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: "10px 10px 0 0",
        padding: "1em", 
        marginBottom:"2px",
        
    },
    entrySection: {
       
        color:'white',

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
    }
}));


export default function Entry({num = 0})
{

    const classes = useStyles();
    
    return (
        <Box component={'section'} className={classes.entrySection}>
            <Grid className={classes.entryHead}>
                #{num}
            </Grid>
            <Grid className={classes.entryBody}>
                <Grid className={classes.entryBlock}>
                    <Typography>Title:</Typography>
                    
                    <TextField
                    variant="filled"
                    size="small"
                    margin="normal"
                    className={classes.title}
                    ></TextField>
                </Grid>
                <Grid className={classes.entryBlock}>
                    <Typography>Entry:</Typography>
                    <TextField
                        label="Enter the answer"
                        multiline
                        variant='filled'
                        className={classes.entry}
                        rows={3}
                    >
                    </TextField>
                </Grid>
                <Grid className={classes.entryBlock}>
                    <Typography>Tags:</Typography>
                    <TextField
                        label="Enter any tags"
                        multiline
                        variant='filled'
                        className={classes.entry}
                        rows={1}
                    >
                    </TextField>
                </Grid>
            </Grid>

        </Box>
    );
}