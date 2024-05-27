import { useEffect, useState } from 'react';
import { TodoService } from '../service/TodoService';

function HomePage() {
  const [idTodo, setIdTodo] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (todos.length === 0) {
      listarTodos();
    }
  }, [todos]);

  const onChangeTitulo = (evt) => {
    listarTodos();
    setTitulo(evt.target.value);
  }

  const onChangeDescricao = (evt) => {
    setDescricao(evt.target.value);
  }

  const limparCampos = () => {
    setIdTodo("");
    setTitulo("");
    setDescricao("");
  }

  const listarTodos = async () => {
    const retornoTodos = await TodoService.listarTodos();
    setTodos(retornoTodos);
  };

  const criarTodo = async (evt) => {
    evt.preventDefault();
    const retornoTodos = await TodoService.criarTodo(titulo, descricao);

    setTodos(retornoTodos);
    limparCampos();
  }

  const apagarTodo = async (evt) => {
    const retornoTodos = await TodoService.apagarTodo(evt.id);
    setTodos(retornoTodos);
  }

  return (
    <div>
      <div>
        <form onSubmit={criarTodo}>
          <div>To Do List</div>
          <input type='text' name='titulo' placeholder='Titulo' value={titulo} onChange={onChangeTitulo} />
          <input
            type='text'
            placeholder='Descrição'
            name='descricao'
            value={descricao}
            onChange={onChangeDescricao}
          />

          <button>Salvar</button>
        </form>

        {todos.map(todo => {
          return (

            <div>
              {todo.titulo} {todo.descricao !== "" ? " - " + todo.descricao : ""}
              <div>
                <button>Editar</button>
                <button onClick={() => apagarTodo(todo)}>Apagar</button>
              </div>
            </div>

          )
        })}

      </div>
    </div>
  )
}

export default HomePage;
