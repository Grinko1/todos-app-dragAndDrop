export interface TodosSchema {
    loading: boolean;
    error: string;
    todoList: TodoList[];
}
export interface TodoList {
    title: string;
    todos: Todo[];
}

export interface Todo {
    id: number,
    title: string
}