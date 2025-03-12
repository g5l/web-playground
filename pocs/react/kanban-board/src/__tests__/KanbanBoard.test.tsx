import {render, screen} from "@testing-library/react";
import KanbanBoard from "../components/KanbanBoard/KanbanBoard";

const mockData = {
  columns: {
    "column-1": {id: "column-1", title: "To Do", cardIds: ["card-1"]},
    "column-2": {id: "column-2", title: "In Progress", cardIds: ["card-2"]},
    "column-3": {id: "column-3", title: "Done", cardIds: []},
  },
  cards: {
    "card-1": {id: "card-1", content: "Test Card"},
    "card-2": {id: "card-2", content: "Test Card 2"},
  },
  columnOrder: ["column-1", "column-2", "column-3"],
};

describe("KanbanBoard", () => {
  it("Should renders the Kanban Board with correct columns and cards", () => {
    render(<KanbanBoard initialData={mockData}/>);

    expect(screen.getByText("To Do")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
    expect(screen.getByText("Test Card")).toBeInTheDocument();
  });

  it("Should displays all cards within their respective columns", () => {
    render(<KanbanBoard initialData={mockData}/>);
    expect(screen.getByText("Test Card")).toBeInTheDocument();
    expect(screen.getByText("Test Card 2")).toBeInTheDocument();
  });
});
