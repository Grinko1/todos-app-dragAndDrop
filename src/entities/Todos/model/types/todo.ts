export interface TodosSchema {
    isLoading: boolean;
    error: string | null | undefined;
    todoList: TodoList[];
}
export interface TodoList {
    title: string;
    todos: Todo[];
}

export interface Todo {
    id: number,
    title: string
    status?: string
}