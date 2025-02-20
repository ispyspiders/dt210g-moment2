import React from 'react'
import { Todo, Status } from "../interfaces/TodoInterface";
import { CaretDown, XCircle, PlayCircle, CheckCircle, Trash } from '@phosphor-icons/react'
import { useState } from 'react'
import './TodoItem.css' // importera CSS


interface TodoItemProps {
    todo: Todo;
    onDelete: (id: number) => void;
    onStatusChange: (updatedTodo: Todo) => void;
}

const statusOptions: Status[] = ['ej påbörjad', 'pågående', 'avklarad'];


const TodoItem = ({ todo, onDelete, onStatusChange }: TodoItemProps) => {

    //States
    const [currentStatus, setCurrentStatus] = useState<Status>(todo.status);
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [deleteing, setDeleting] = useState(false);

    const getStatusIcon = () => {
        switch (currentStatus) {
            case 'ej påbörjad':
                return <XCircle size={20} />;
            case 'pågående':
                return <PlayCircle size={20} />;
            case 'avklarad':
                return <CheckCircle size={20} />;
            default: return null;
        }
    }

    const getStatusClass = () => {
        switch (currentStatus) {
            case 'ej påbörjad':
                return 'todo-pending';
            case 'pågående':
                return 'todo-in-progress';
            case 'avklarad':
                return 'todo-completed';
            default:
                return '';
        }
    };

    const handleStatusChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        // Ny status från select som Status
        const newStatus = event.target.value as Status;

        // Uppdaterad Todo
        const updatedTodo: Todo = {
            ...todo,
            status: newStatus,
        };

        // Om beskrivning inte har innehåll / är null, sätt till undefined
        if (todo.description == null || todo.description.length <= 0) {
            updatedTodo.description = undefined;
        }

        try {
            setSaving(true);

            const response = await fetch(`https://dt210g-todo.azurewebsites.net/api/todos/${todo.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTodo),
            });
            if (!response.ok) {
                setError("Fel vid uppdatering av status. Vänligen försök igen senare.")
                throw new Error('Kunde inte uppdatera status');
            }
            else {
                console.log("Status uppdaterad på servern");
                setCurrentStatus(newStatus); 
                onStatusChange(updatedTodo);
                setError(null);
            }
        } catch (error) {
            console.log("Fel vid API anrop: ", error);
            throw error;
        } finally {
            setSaving(false);
        }
    }

    const handleDelete = async () => {

        if(window.confirm("Är du säker på att du vill radera denna uppgift?")) {
            try {
                setDeleting(true);
                const response = await fetch(`https://dt210g-todo.azurewebsites.net/api/todos/${todo.id}`, {
                    method: "DELETE",
                });
                if(!response.ok){
                    setError("Fel vid radering av att göra. Vänligen försök igen senare.");
                    throw new Error('Kunde inte radera todo');
                } else{
                    onDelete(todo.id!);
                    setError(null);
                }
            } catch (error){
                console.error("Fel vid radering: ", error);
                setError("Ett fel inträffade vid radering. Försök igen senare.")
            } finally{
                setDeleting(false);
            }
        }
    }

    return (
        <section className={`todo ${getStatusClass()}`}>
            <div className='todo-head'>
                <div className='iconTitle-container'>
                    {getStatusIcon()}
                    <h2>{todo.title}</h2>
                </div>

                <CaretDown />
            </div>
            <div className='more'>
                <select name="status" id="status" value={currentStatus} onChange={handleStatusChange} className={`todo ${getStatusClass()}`}>
                    {
                        statusOptions.map((status) => (
                            <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                        ))
                    }
                </select>
                {saving && <span className='msg'>Sparar...</span>}
                {error && <span className='error'>{error}</span>}
                <p>{todo.description}</p>
                <button onClick={handleDelete}><span>Radera</span> <Trash size={20}/></button>
                {deleteing && <span className='msg'>Raderar...</span>}
            </div>
        </section>
    )
}

export default TodoItem