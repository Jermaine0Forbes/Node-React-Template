import React, {useState, useEffect} from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import {List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, BottomNavigation, BottomNavigationAction, Button} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {randomizeArr, getNames, uniqueKey} from '../services/publicApi';
import {parse, compare} from "../services/util";
import { useNavigate } from "react-router-dom";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

export default function Test()
{
    const [pokemon, setPokemon] = useState([]);
    const [value, setValue] = useState([]);
    const [pokeOrder, setPokeOrder] = useState([]);
    const redirect = useNavigate();
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
            console.log('original order of pokemon names')
            console.log(originNames);
            // console.log(randomizeArr(names))
            const randPokemon = randomizeArr(test?.pokemon);
            const randNames = getNames(randPokemon);
            console.log('randomized order of pokemon')
            console.log(randNames);
            setPokemon(randPokemon);
            setPokeOrder(originNames);

        }
        // getPokemon(10, setPokemon);
        console.log(pokeOrder);
        // console.log(randomizeArr(arr))
    // }else{
       
    //    console.log('current names');
    //    console.log(currentNames)
    //    console.log("the current order is "+ compare( pokeOrder, currentNames))
    }

    }, [pokemon]);

    const handleClick = () => {
        console.log('saved')
        const guessOrder = getNames(pokemon);
        sessionStorage.setItem('results', toJson({
            original: pokeOrder,
            guesses: guessOrder
        }));
        redirect('/results');
    }
    
    return (
        <Container>
            <Box>
                <main>
                    <Typography variant="h3" >Test</Typography>

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
                                                <Typography variant="h5" >{index+1}.</Typography>
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
                            {/* <Button color='secondary' variant={'contained'} onClick={() => console.log('saved')}> Submit</Button> */}
                           
                            {/* <BottomNavigationAction label="Timer" icon={<AccessTime/>}/> */}
                            <BottomNavigationAction label="Done" icon={<ArrowCircleRightIcon/>} onClick={handleClick}/>
                        </BottomNavigation>
                    </Box>
                </main>
            </Box>
        </Container>
    );
}