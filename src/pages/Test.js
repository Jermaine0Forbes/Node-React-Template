import React, {useState, useEffect} from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import {List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar} from '@material-ui/core';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {randomizeArr, getPokemon, uniqueKey} from '../services/publicApi';
import {parse} from "../services/util";

export default function Test()
{
    const [pokemon, setPokemon] = useState([]);

// fake data generator    
// const getItems = count =>
//   Array.from({ length: count }, (v, k) => k).map(k => ({
//     id: `item-${k}`,
//     content: `item ${k}`
//   }));

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

  useEffect(() => {

    if(pokemon.length === 0){
        if(sessionStorage?.gotPokemon){
            console.log('session storage data')
            // console.log(parse(sessionStorage.getItem('test')))
            const test = parse(sessionStorage.getItem('test'));
            setPokemon(test?.pokemon);
            console.log(test)
            // console.log(randomizeArr(test?.pokemon))
            console.log('foo');

        }
        // getPokemon(10, setPokemon);
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
                </main>
            </Box>
        </Container>
    );
}