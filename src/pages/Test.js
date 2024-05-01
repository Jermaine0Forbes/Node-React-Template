import React, {useState} from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

export default function Test()
{

const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
  }));

  const [items, setItems] = useState(getItems(10));
    
    return (
        <Container>
            <Box>
                <main>
                    tests page
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId="droppable">
                        {(provided,snapshot) => (
                            <ul
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            >{
                                items.map((item,index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided) => (
                                            <li
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            >
                                                {item.content}
                                            </li>
                                        )}
                                    </Draggable>
                                ) )
                            }
                            {provided.placeholder}
                            </ul>
                        )}
                        </Droppable>
                    </DragDropContext>
                </main>
            </Box>
        </Container>
    );
}