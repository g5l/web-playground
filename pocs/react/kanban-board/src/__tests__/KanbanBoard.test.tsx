import { render, screen } from "@testing-library/react";
import KanbanBoard from "../components/KanbanBoard/KanbanBoard";

describe("KanbanBoard", () => {
  test("renders the board with initial columns", () => {
    render(<KanbanBoard />);
    expect(screen.getByText("To Do")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
  });

  test("renders cards inside the columns", () => {
    render(<KanbanBoard />);
    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Build Kanban Board")).toBeInTheDocument();
  });
});
