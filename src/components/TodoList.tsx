import { Todo } from "../interfaces/TodoInterface";
import TodoItem from './TodoItem';
import './TodoList.css' // importera CSS


interface TodoListProps {
    todos: Todo[];
}

const TodoList = ({ todos }: TodoListProps) => {
    return (
        <div id='todoList'>
            {todos.map((todo) => ( 
                <TodoItem todo={todo} key={todo.id} />
            ))}
        </div>
    )
}

export default TodoList