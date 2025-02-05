import { Todo } from "../interfaces/TodoInterface";
import TodoItem from './TodoItem';
import './TodoList.css' // importera CSS


interface TodoListProps {
    todos: Todo[];
    onDelete: (id: number) => void;
    onStatusChange: (updatedTodo: Todo) => void; 
}

const TodoList = ({ todos, onDelete, onStatusChange }: TodoListProps) => {

    const doneTodos = todos.filter(todo => todo.status === 'avklarad');
    const ongoingTodos = todos.filter(todo => todo.status === 'pågående');
    const pendingTodos = todos.filter(todo => todo.status === 'ej påbörjad');

    return (
        <div id='todoList'>
            <div className="list" id="ongoing">
                {ongoingTodos.length > 0 ? (
                    ongoingTodos.map((todo) => (
                        <TodoItem todo={todo} key={todo.id} onDelete={onDelete} onStatusChange={onStatusChange} />
                    ))
                ) : (
                    <div className="info">
                        <p>Inga pågående uppgifter.</p>
                    </div>
                )}
            </div>
            <div className="list" id="pending">
                {pendingTodos.length > 0 ? (
                    pendingTodos.map((todo) => (
                        <TodoItem todo={todo} key={todo.id} onDelete={onDelete} onStatusChange={onStatusChange}/>
                    ))
                ) : (
                    <div className="info">
                        <p>Inga ej påbörjade uppgifter.</p>
                    </div>
                )}
            </div>
            <div className="list" id="done">
                {doneTodos.length > 0 ? (

                        doneTodos.map((todo) => (
                            <TodoItem todo={todo} key={todo.id} onDelete={onDelete} onStatusChange={onStatusChange}/>
                        ))
                    ) : (
                        <div className="info">
                            <p>Inga avklarade uppgifter.</p>
                        </div>
                    )}
            </div>

            {/* {todos.map((todo) => (
                    <TodoItem todo={todo} key={todo.id} onDelete={onDelete}/>
                ))} */}
        </div>
    )
}

export default TodoList