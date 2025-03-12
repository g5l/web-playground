import './App.css';
import KanbanBoard from "./components/KanbanBoard/KanbanBoard.tsx";

function App() {
  const initialData = {
    columns: {
      "column-1": {
        id: "column-1",
        title: "To Do",
        cardIds: ["card-1", "card-2"],
      },
      "column-2": {
        id: "column-2",
        title: "In Progress",
        cardIds: [],
      },
      "column-3": {
        id: "column-3",
        title: "Done",
        cardIds: [],
      },
    },
    cards: {
      "card-1": {id: "card-1", content: "Learn React"},
      "card-2": {id: "card-2", content: "Build Kanban Board"},
    },
    columnOrder: ["column-1", "column-2", "column-3"],
  };
  
  return (
    <>
      <KanbanBoard initialData={initialData}/>
    </>
  );
}

export default App;
