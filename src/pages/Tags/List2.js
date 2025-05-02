import React, {useContext, useState, useEffect, useRef} from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { useColor } from '../../hooks/users';
import {AuthContext} from '../../providers/AuthProvider';
import { fetchTags } from '../../services/tags';
import WhileLoading from '../../components/Loading/WhileLoading';
import {getKey as key } from "../../utils/index";
import { makeStyles } from '@mui/material';
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
        getNextPageParam: (lastPage) => { 
            console.log('lastPage')
            console.log(lastPage)
            if( lastPage.rows.length === 0 ) return undefined;

            return lastPage.nextOffset;
        },
        initialPageParam: 0,
      })

      
      const allRows = data ? data.pages.flatMap((d) => d.rows) : [];

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

          fetchNextPage({
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

                        <div>
                            {isFetching && !isFetchingNextPage ? 'Background Updating...' : null}
                        </div>
                    </Grid>
                </main>
        </Container>
        
    );
}