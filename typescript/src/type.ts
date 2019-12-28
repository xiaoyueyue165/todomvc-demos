interface Todo {
  id: number;
  name: string;
  isCompleted: boolean;
  findIndex?: (v: any) => void;
}

type TodoListType = Todo[];
