import { Todo } from "../types/todo";


export const mapStatus = (index: number, todo: Todo) => {

    if (index !== null || index !== undefined) {
        if (index === 0) {
            todo.status = 'PENDING_STATUS'
            return todo;
        } else if (index === 1) {
            todo.status = 'PROGRESS_STATUS';
            return todo;
        } else if (index === 2) {
            todo.status = 'COMPLETED_STATUS';
            return todo;
        }
        return todo;
    }
}