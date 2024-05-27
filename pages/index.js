import { useEffect, useState } from 'react';
import { TodoService } from '../service/TodoService';

function HomePage() {

  const [todos, setTodos] = useState([]);

  const listarTodos = async () => {
    const retornoTodos = await TodoService.listarTodos();
    setTodos(retornoTodos);
  };

  useEffect(() => {
    if (todos.length === 0) {
      listarTodos();
    }
  }, [todos]);

  return (
    <div>
      <div>
        {todos.map(todo => {
          return (

            <div>
              {todo.titulo} {todo.descricao !== "" ? " - " + todo.descricao : ""}
            </div>

          )
        })}

      </div>
    </div>
  )
}

export default HomePage;
