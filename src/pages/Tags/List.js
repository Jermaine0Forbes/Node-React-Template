import React, {useContext, useState, useEffect, useRef} from 'react';
import { useQuery } from 'react-query';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { useColor } from '../../hooks/users';
import {AuthContext} from '../../providers/AuthProvider';
import { fetchTags, fetchEntriesByTag } from '../../services/tags';
import WhileLoading from '../../components/Loading/WhileLoading';
import {getKey as key } from "../../utils/index";
import { makeStyles } from '@material-ui/core';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import LinkIcon from '@mui/icons-material/Link';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
// import classNames from 'classnames';
import { FixedSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
// import { useVirtualizer } from '@tanstack/react-virtual'

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

function InfiniteWrapper({hasNextPage, isNextPageLoading, items, loadNextPage, Item, props = {}, options = {}}) {

      // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const itemCount = hasNextPage ? items.length + 1 : items.length;

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;

  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = index => !hasNextPage || index < items.length;

  return (
    
    <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
  >
    {({ onItemsRendered, ref }) => (
      <FixedSizeList
        className="InfiniteList"
        height={options?.height ?? 150}
        itemCount={itemCount}
        itemSize={options?.itemSize ?? 30}
        onItemsRendered={onItemsRendered}
        itemData={{ row: items, props}}
        ref={ref}
        {...options}
      >
        {Item}
      </FixedSizeList>
    )}
  </InfiniteLoader>
  );

}

const entryRow = ({index, style, data}) => {
    const classes = useStyles();
    const entry = data[index];
    let content;
    console.log('entry')
    if(entry){
        const {topic} = entry;
        content = ( 
    <Grid 
        component={'section'}  
        container 
        key={index}
        style={style}
    >
        <Grid item md={6}>
            <ListItem>
                <ListItemText primary={entry.title}/>
            </ListItem>
        </Grid>
        
        <Grid item md={6}>
            <ListItem>
                <Link href={"/topic/"+topic.id}>
                    <ListItemText 
                        primary={topic.title}
                        className={classes.topicTitle}
                    />
                </Link>
            </ListItem>
        </Grid>
    </Grid>);
    } else{

     content = (

        <Grid
        component={'section'}  
        container 
        style={style}
        key={index}
        >
            <ListItem>
                <WhileLoading isLoading={true}/>
            </ListItem>  

        </Grid>
      )
    }

   
    return content;
}

const tagRow = ({
    index, 
    style, 
    data, 
}) => {
    const {row, props} = data;
    const tag = row[index];
    const {
        openCollapse, 
        dropDownId, 
        classes, 
        entriesLoading, 
        handleDropdown,
        nextEntryPage,
        currentEntries,
        loadEntriesByTag,
        entryRow,
        color,
    } = props;
    let content;
   
    if(tag) {

    const openUp = !!(openCollapse && (dropDownId === tag.id));

     content = (
        <section 
        key={key(index)}
        style={style}
     >
        <ListItem 
            className={classes.tagItem} 
            style={{backgroundColor:color}}
            secondaryAction={
                <IconButton 
                    edge="end" 
                    aria-label="show more"
                    onClick={() => handleDropdown(tag.id)}
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
            <Link href={'/tag/'+tag.id} className={classes.tagLink}>
                <ListItemAvatar>
                    <Avatar>
                        <LinkIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={tag?.name} className='tagName' />
            </Link>
        </ListItem>
        <Collapse in={openUp}>
            <WhileLoading isLoading={entriesLoading}>
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
                    <InfiniteWrapper
                        hasNextPage={nextEntryPage}
                        isNextPageLoading={entriesLoading}
                        items={currentEntries}
                        loadNextPage={loadEntriesByTag}
                        Item={entryRow}
                    />
                </List>
            </WhileLoading>
        </Collapse>
    </section>
     );

    }else {

    content = (
        
        <section style={style} key={index}>
            <WhileLoading isLoading={true}/>
        </section>
    );

    }

    return content;
}

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
    const parentRef = useRef();
    const [nextEntryPage, setNextEntryPage] = useState(0);
    const [nextTagPage, setNextTagPage] = useState(0);
   
    const {isLoading,  data: tagsData, refetch: refetchTags} = useQuery('get-tags', () => fetchTags(nextTagPage), { refetchOnWindowFocus: false});
    const {
        isLoading: entriesLoading,  
        data: entriesData, 
        refetch : refetchEntries
    } 
    = useQuery(['get-tag-entries', dropDownId], () => fetchEntriesByTag(dropDownId, nextEntryPage), { refetchOnWindowFocus: false, enabled: !!dropDownId});
    const loadEntriesByTag = () => {
        if(nextEntryPage)
            refetchEntries()
    };

    const loadTags = () => {
        if(nextTagPage)
            refetchTags()
    }


    useEffect(() => {
        if(tagsData?.rows) {
            console.log('tagsData')
            console.log(tagsData)
            const { rows, nextOffset } = tagsData;
            console.log('rows')
            console.log(rows)

            // const entries = rows.map((tag) => ({id:tag.id, entries: tag.entries}));
            const tags = rows.map((tag) => {
                delete tag.entries;
                return tag
            });
            // const entries = data.map((tag) => ({id:tag.id, entries: tag.entries}));
            // const tags = data.map((tag) => {
            //     delete tag.entries;
            //     return tag
            // });

            if(rows.length){
                setTagList([...tagList,...tags]);
                setNextTagPage(nextOffset);

            } else {
                setNextTagPage(null);
            }

            // setEntriesList(entries)

        }
        if(entriesData?.rows) {
            const { rows, nextOffset} = entriesData;

            console.log('entriesData')
            console.log(entriesData)
            if(rows.length){
                setNextEntryPage(nextOffset);
    
                setCurrentEntries([...currentEntries, ...rows]);

            }else {

                setNextEntryPage(null);
            }




        }
    },[tagsData, entriesData]);

    const handleDropdown = (tagId) => {
        let shouldOpen ;
        const diffId = dropDownId !== tagId;
        if(diffId){
            // const el =  entriesList.filter((entry) => entry.id == tagId)[0]
            // const {entries} = el;
            // console.log('entries')
            // console.log(el)
            // setCurrentEntries(entries);
            shouldOpen = true;
            setDropDownId(tagId);
            // loadEntriesByTag(tagId, nextPage);
            console.log('tagId')
            console.log(tagId)

            // refetchEntries(tagId, nextPage)

        }else{
            shouldOpen = !openCollapse;

            setDropDownId(0);
        }
        
        setCurrentEntries([]);
        setNextEntryPage(0);
       setOpenCollapse(shouldOpen)
      
    }

    const tagProps = {
        classes,
        nextEntryPage,
        entriesLoading,
        currentEntries,
        loadEntriesByTag,
        entryRow,
        handleDropdown,
        color,
    };

    return (
        <Container>
                <main>
                    <Typography variant="h3">Tags</Typography>
                    <Grid component="section" ref={parentRef}>


                        <WhileLoading isLoading={isLoading}>

                            {
                               tagList?.length ? (
                                <List>

                                <InfiniteWrapper
                                    hasNextPage={nextTagPage}
                                    isNextPageLoading={isLoading}
                                    items={tagList}
                                    loadNextPage={loadTags}
                                    Item={tagRow}
                                    props={tagProps}
                                    options ={{height:2000, itemSize: 70}}
                                />
                                {

                                    
                           
                                    // tagList.map((e, i) => {
                                    //     const openUp = !!(openCollapse && (dropDownId === e.id));
                                    //     return (
                                    //         <section 
                                    //             key={key(i)}
                                    //          >
                                    //             <ListItem 
                                    //                 key={key(i)} 
                                    //                 className={classes.tagItem} 
                                    //                 style={{backgroundColor:color}}
                                    //                 secondaryAction={
                                    //                     <IconButton 
                                    //                         edge="end" 
                                    //                         aria-label="show more"
                                    //                         onClick={() => handleDropdown(e.id)}
                                    //                     >
                                    //                         {
                                    //                             openUp ? (
                                    //                                 <KeyboardArrowUpIcon  />
                                    //                             ) : (
                                    //                                 <KeyboardArrowDownIcon />
                                    //                             )
                                    //                         }
                                                            
                                    //                     </IconButton>
                                    //                 }
                                    //             >
                                    //                 <Link href={'/tag/'+e.id} className={classes.tagLink}>
                                    //                     <ListItemAvatar>
                                    //                         <Avatar>
                                    //                             <LinkIcon />
                                    //                         </Avatar>
                                    //                     </ListItemAvatar>
                                    //                     <ListItemText primary={e?.name} className='tagName' />
                                    //                 </Link>
                                    //             </ListItem>
                                    //             <Collapse in={openUp}>
                                    //                 <WhileLoading isLoading={entriesLoading}>
                                    //                     <List>
                                    //                         <Grid
                                    //                             component={'section'}  
                                    //                             container 
                                    //                         >
                                    //                             <Grid item md={6}>
                                    //                                 <Typography variant="h6">Entry</Typography>
                                    //                             </Grid>
                                                                
                                    //                             <Grid item md={6}>
                                    //                                 <Typography variant="h6">Topic</Typography>
                                    //                             </Grid>

                                    //                         </Grid>
                                    //                         <InfiniteWrapper
                                    //                             hasNextPage={nextPage}
                                    //                             isNextPageLoading={entriesLoading}
                                    //                             items={currentEntries}
                                    //                             loadNextPage={loadEntriesByTag}
                                    //                             Item={entryRow}
                                    //                         />
                                    //                     </List>
                                    //                 </WhileLoading>
                                    //             </Collapse>
                                    //         </section>
                                    //     );
                                    // })

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