import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
const a = ["a", "b", "c", "d"];
const b = ["1", "2", "3", "4"];
const c = ["x", "y", "z"];

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 100px;
  height: 100px;
  background-color: yellow;
`;
const Box2 = styled.div`
  display: flex;
  width: 100px;
  height: 100px;
  background-color: yellow;
`;
const Box3 = styled.div`
  display: flex;
  width: 100px;
  height: 100px;
  background-color: #939393;
`;
function App2() {
  return (
    <div style={{ display: "flex", width: "auto" }}>
      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId="A" direction="vertical">
          {(provided) => (
            <>
              <div
                style={{ backgroundColor: "wheat" }}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <Box2 />
                {a.map((elem, index) => {
                  return (
                    <Draggable key={elem} draggableId={elem} index={index}>
                      {(provided) => (
                        <Box2
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                        >
                          {elem}
                        </Box2>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            </>
          )}
        </Droppable>
      </DragDropContext>
      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId="B" direction="horizontal">
          {(provided) => (
            <div
              style={{
                backgroundColor: "blue",
                display: "flex",
                height: "100%",
              }}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {b.map((elem, index) => {
                return (
                  <Draggable key={elem} draggableId={elem} index={index}>
                    {(provided) => (
                      <Box2
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                      >
                        {elem}
                        <div>asd</div>
                      </Box2>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
// {c.map((elem, index) => {
//     return <Box key={index}>{elem}</Box>;
//   })}
export default App2;
