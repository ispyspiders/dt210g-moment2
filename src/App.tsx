import Header from "./components/Header"
import Footer from "./components/Footer"
import Todo from "./components/TodoForm"
import TodoForm from "./components/TodoForm"

function App() {

  return (
    <>
      <Header pagetitle="Att göra" />
      <div>
        {/* Formulär för att lägga till Todo */}
        <TodoForm />
        <Footer />

      </div>
    </>
  )
}

export default App
