import React, {useState, useEffect} from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import {List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, BottomNavigation, BottomNavigationAction} from '@material-ui/core';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {randomizeArr, getNames, uniqueKey} from '../services/publicApi';
import {parse} from "../services/util";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

export default function Test()
{
    const [pokemon, setPokemon] = useState([]);
    const [value, setValue] = useState([]);
    const [pokeOrder, setPokeOrder] = useState({});

  // a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  }

//   const [items, setItems] = useState(getItems(10));
  
  
  
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      pokemon,
      result.source.index,
      result.destination.index
    );

    setPokemon(reorderedItems);
  }

//   const arr = [ 1, 2,3,4,5,6,7];

  useEffect(() => {

    if(pokemon.length === 0){
        if(sessionStorage?.gotPokemon){
            // console.log('session storage data')
            // console.log(parse(sessionStorage.getItem('test')))
            const test = parse(sessionStorage.getItem('test'));
            // setPokemon(test?.pokemon);
            const originNames = getNames(test?.pokemon)
            console.log(originNames);
            // console.log(randomizeArr(names))
            const randPokemon = randomizeArr(test?.pokemon);
            const randNames = getNames(randPokemon);
            setPokemon(randPokemon);
            setPokeOrder({originNames, randNames});

        }
        // getPokemon(10, setPokemon);
        console.log(pokeOrder);
        // console.log(randomizeArr(arr))
    }
    }, [pokemon]);
    
    return (
        <Container>
            <Box>
                <main>
                    tests page

                    {
                        pokemon.length > 0 && (
                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="droppable">
                                {(provided,snapshot) => (
                                    <List
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    >{
                                        pokemon.map((e,index) => (
                                            <Draggable key={uniqueKey()} draggableId={'drag-'+index} index={index}>
                                                {(provided) => (
                                                <ListItem   
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    alignItems='flex-start'
                                                >
                                                <ListItemAvatar>
                                                    <Avatar  src={e?.sprites?.front_default} />
                                                </ListItemAvatar>
                                                <ListItemText 
                                                    primary={e.name}
                                                />
                                                </ListItem>
                                                )}
                                            </Draggable>
                                        ) )
                                    }
                                    {provided.placeholder}
                                    </List>
                                )}
                                </Droppable>
                            </DragDropContext>

                        )
                    }
                    <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                        <BottomNavigation 
                            showLabels
                            value={value}
                            onChange={(event, newValue) => {
                            setValue(newValue);
                            }}
                        >
                            {/* <BottomNavigationAction label="Timer" icon={<AccessTime/>}/> */}
                            <BottomNavigationAction label="Done" icon={<ArrowCircleRightIcon/>} onClick={() => console.log('saved')}/>
                        </BottomNavigation>
                    </Box>
                </main>
            </Box>
        </Container>
    );
}