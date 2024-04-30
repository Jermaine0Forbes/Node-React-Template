import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

export default function Test()
{
    
    return (
        <Container>
            <Box>
                <main>
                tests page
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="droppable">
                     {(provided,snapshot) => (
                        <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        >

                        </div>
                     )}
                    </Droppable>
                    </DragDropContext>
                </main>
            </Box>
        </Container>
    );
}