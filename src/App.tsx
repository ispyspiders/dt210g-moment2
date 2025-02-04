import Header from "./components/Header"
import Footer from "./components/Footer"
import TodoForm from "./components/TodoForm"
import { Todo } from './interfaces/TodoInterface'

import { useState } from "react"


function App() {
  // State för Todos
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (newTodo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }
  return (
    <>
      <Header pagetitle="Att göra" />
      <div>
        <main>

          {/* Formulär för att lägga till Todo, Skickar addTodo som prop till TodoForm */}
          <TodoForm addTodo={addTodo} />
        </main>

        <Footer />

      </div>
    </>
  )
}

export default App
