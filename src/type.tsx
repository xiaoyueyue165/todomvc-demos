export interface Todo {
  id: string;
  name: string;
  isCompleted: boolean;
  mode: "onShow" | "onEdit";
}
export type TodoListType = Todo[];

export type filterType = "all" | "active" | "completed";
