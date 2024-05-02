import React, {useState} from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import {List, ListItem, Divider, ListItemText, ListItemAvatar} from '@material-ui/core';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {getInch, getPound, convStat, getPokemon, uniqueKey} from '../services/publicApi';

export default function Test()
{
    const [pokemon, setPokemon] = useState([]);

// fake data generator    
const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
  }));

  // a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  }

  const [items, setItems] = useState(getItems(10));
  
  
  
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(reorderedItems);
  }

  useEffect(() => {

    if(pokemon.length === 0){
        getPokemon(100, setPokemon);
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
                                        pokemon.map((item,index) => (
                                            <Draggable key={uniqueKey()} draggableId={uniqueKey()} index={index}>
                                                {(provided) => (
                                                    // <li
                                                    // ref={provided.innerRef}
                                                    // {...provided.draggableProps}
                                                    // {...provided.dragHandleProps}
                                                    // >
                                                    //     {item.content}
                                                    // </li>
                                                <ListItem   alignItems='flex-start'>
                                                <ListItemAvatar>
                                                    <Avatar  src={e?.sprites?.front_default} />
                                                </ListItemAvatar>
                                                <ListItemText 
                                                    primary={e.name}
                                                    secondary={
                                                        <>
                                                        <Typography  component="span" sx={{display: 'block'}}>id: {e.id}</Typography>
                                                        <br/>
                                                        <Typography component="span">
                                                            height: {convStat(e.height)} meters | {getInch(e.height)} inches
                                                        </Typography>
                                                        <br/>
                                                        <Typography  component="span">
                                                            weight: {convStat(e.weight)} kilograms | {getPound(e.weight)} pounds
                                                        </Typography>
                                                        </>
                                                    }
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