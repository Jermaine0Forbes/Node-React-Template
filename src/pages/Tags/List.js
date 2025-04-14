import React, {useContext, useState, useEffect, useRef} from 'react';
import { useInfiniteQuery } from 'react-query';
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
import LinkIcon from '@mui/icons-material/Link';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
// import classNames from 'classnames';
import { FixedSizeList } from 'react-window';
import { useVirtualizer } from '@tanstack/react-virtual'

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

const entryRow = ({index, style, data}) => {
    const classes = useStyles();
    const entry = data[index];
    const {topic} = entry;
    return (
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
    </Grid>

    );
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
    // const {isLoading,  data} = useQuery('get-tags', () => fetchTags(), { refetchOnWindowFocus: false});
    
    // async function fetchServerPage(
    //     limit,
    //     offset = 0,
    //   ) {
    //     const rows = new Array(limit)
    //       .fill(0)
    //       .map((_, i) => `Async loaded row #${i + offset * limit}`)
      
    //     await new Promise((r) => setTimeout(r, 500))
      
    //     return { rows, nextOffset: offset + 1 }
    //   }
    
    
    const {
        status,
        data,
        error,
        isFetching,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
      } = useInfiniteQuery({
        queryKey: ['get-tags'],
        queryFn: ({pageParam = 0}) => fetchTags( pageParam),
        // queryFn: ({pageParam}) => fetchServerPage(10, pageParam),
        getNextPageParam: (lastPage) => { 
            console.log('lastPage')
            console.log(lastPage)
            if( lastPage.rows.length === 0 ) return undefined;

            return lastPage.nextOffset;
            // return lastPage.nextOffset+1;
        },
        initialPageParam: 0,
      })

      
      const allRows = data ? data.pages.flatMap((d) => d.rows) : [];
    //   const allParams = data ? data.pages.flatMap((d) => d.nextOffset): [];
    //   const currentPage = allParams.reverse()[0] ??  0;
      console.log('data')
      console.log(data)
      
      const rowVirtualizer = useVirtualizer({
        count: hasNextPage ? allRows.length + 1 : allRows.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 20,
        overscan: 5,
      });

      useEffect(() => {
        const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse()

        // console.log('virtual items')
        // console.log(rowVirtualizer.getVirtualItems())

        console.log('lastItem')
        console.log(lastItem)
    
        if (!lastItem) {
          return
        }
    
        if (
          lastItem.index >= allRows.length - 1 &&
          hasNextPage &&
          !isFetchingNextPage
        ) {
        
        //  console.log('currentPage')
        //   console.log(currentPage)
        //   const nextPage =  currentPage+1;
        //   console.log('nextPage')
        //   console.log(nextPage)
          fetchNextPage({
            // pageParam: nextPage,
            cancelRefetch: false,
          })
        }
      }, [
        hasNextPage,
        fetchNextPage,
        allRows.length,
        isFetchingNextPage,
        rowVirtualizer.getVirtualItems(),
        // currentPage,
      ]);

    useEffect(() => {
        if(allRows?.length) {
            console.log('allRows')
            console.log(allRows)
            // console.log('rows')
            // console.log(rows)

            // const entries = allRows.map((tag) => ({id:tag.id, entries: tag.entries}));
            // const tags = allRows.map((tag) => {
            //     delete tag.entries;
            //     return tag
            // });
            // const entries = data.map((tag) => ({id:tag.id, entries: tag.entries}));
            // const tags = data.map((tag) => {
            //     delete tag.entries;
            //     return tag
            // });

            // setTagList(tags)
            // setEntriesList(entries)

        }
    },[allRows]);

    const handleDropdown = (tagId) => {
        let shouldOpen ;
        const diffId = dropDownId !== tagId;
        if(diffId){
            const el =  entriesList.filter((entry) => entry.id == tagId)[0]
            const {entries} = el;
            console.log('entries')
            console.log(el)
            setCurrentEntries(entries);
            shouldOpen = true

        }else{
            shouldOpen = !openCollapse;
        }

       setOpenCollapse(shouldOpen)
       setDropDownId(tagId);
    }

    return (
        <Container>
                <main>
                    <Typography variant="h3">Tags</Typography>
                    <Grid component="section" ref={parentRef}>
                    {status === 'pending' ? (
                            <p>Loading...</p>
                        ) : status === 'error' ? (
                            <span>Error: {error.message}</span>
                        ) : (
                            <div
                            ref={parentRef}
                            className="List"
                            style={{
                                height: `500px`,
                                width: `100%`,
                                overflow: 'auto',
                            }}
                            >
                            <div
                                style={{
                                height: `${rowVirtualizer.getTotalSize()}px`,
                                width: '100%',
                                position: 'relative',
                                }}
                            >
                                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                                const isLoaderRow = virtualRow.index > allRows.length - 1
                                const row = allRows[virtualRow.index]
                                // console.log('row')
                                // console.log(row)

                                const post = row?.name ?? '';

                                return (
                                    <div
                                    key={virtualRow.index}
                                    className={
                                        virtualRow.index % 2 ? 'ListItemOdd' : 'ListItemEven'
                                    }
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: `${virtualRow.size}px`,
                                        transform: `translateY(${virtualRow.start}px)`,
                                    }}
                                    >
                                    {isLoaderRow
                                        ? hasNextPage
                                        ? 'Loading more...'
                                        : 'Nothing more to load'
                                        : post}
                                    </div>
                                )
                                })}
                            </div>
                            </div>
                        )}

                        {/* <WhileLoading isLoading={isFetchingNextPage}>

                            {
                               tagList?.length ? (
                                <List 
                                    style={{
                                        height: `${rowVirtualizer.getTotalSize()}px`,
                                        position: 'relative',
                                    }}
                                
                                >
                                {
                           
                                    rowVirtualizer.getVirtualItems().map((e, i) => {
                                         const openUp = !!(openCollapse && (dropDownId === e.id));
                                        return (
                                            <section 
                                            
                                            key={key(i)}
                                             style={{
                                                position:'absolute',
                                                top:0,
                                                left: 0,
                                                widht:'100%',
                                                // height: `${virtualRow.size}.px`,
                                                // transform: `translateY(${virtualRow.start}px)`
                                                height: `${e.size}.px`,
                                                transform: `translateY(${e.start}px)`
                                             }}
                                            
                                            >
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
                                                        <FixedSizeList
                                                                height={150}
                                                                itemCount={currentEntries.length}
                                                                itemSize={35}
                                                                itemData={currentEntries}
                                                        >
                                                            {entryRow}
                                                        </FixedSizeList>
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
                        </WhileLoading> */}
                        <div>
                            {isFetching && !isFetchingNextPage ? 'Background Updating...' : null}
                        </div>
                    </Grid>
                </main>
        </Container>
        
    );
}