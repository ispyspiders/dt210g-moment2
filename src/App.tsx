import Header from "./components/Header"
import Footer from "./components/Footer"
import TodoForm from "./components/TodoForm"
import TodoList from "./components/TodoList"
import { Todo } from './interfaces/TodoInterface'

import { useState, useEffect } from "react"


function App() {
  // States
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Hämta todos från API vid initiell rendering
  useEffect(() => {
    getTodos();
  }, [])

  const getTodos = async () => {
    try {
      setLoading(true);

      const resp = await fetch("https://dt210g-todo.azurewebsites.net/api/todos");
      if (!resp.ok) {
        throw Error;
      } else {
        const data = await resp.json();
        setTodos(data);
        setError(null);
      }
    } catch (error) {
      console.log("Något gick fel vid inläsning av att göra-poster.", error);
    } finally {
      setLoading(false);
    }
  }

  const addTodo = (newTodo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }

  const handleDeleteTodo = (id:number) => {
    setTodos(todos.filter(todo=>todo.id !== id));
  };

  const updateTodoStatus = (updatedTodo: Todo) => {
    setTodos((prevTodos)=> prevTodos.map(todo => todo.id === updatedTodo.id ? updatedTodo: todo));
  };

  return (
    <>
      <Header pagetitle="Att göra" />
      <div>
        <main>
          {
            error && <p>{error}</p>
          }

          {
            loading && <p>Laddar in att göra lista...</p>
          }
          {/* Lista med todos, Skickar todos till TodoList */}
          <TodoList todos={todos} onDelete={handleDeleteTodo} onStatusChange={updateTodoStatus}/>
          {/* Formulär för att lägga till Todo, Skickar addTodo som prop till TodoForm */}
          <TodoForm addTodo={addTodo} />
        </main>

        <Footer />

      </div>
    </>
  )
}

export default App
