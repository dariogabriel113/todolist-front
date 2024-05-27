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

  const onChangeTodo = (evt) => {
    setIdTodo(evt.id);
    setTitulo(evt.titulo);
    setDescricao(evt.descricao);
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

  const editarTodo = async (evt) => {
    evt.preventDefault();
    const retornoTodos = await TodoService.editarTodo(idTodo, titulo, descricao, false);
    setTodos(retornoTodos);
    limparCampos();
  }

  const apagarTodo = async (evt) => {
    const retornoTodos = await TodoService.apagarTodo(evt.id);
    setTodos(retornoTodos);
  }

  const alteraStatusTodo = async (evt) => {
    console.log(evt);
    const retornoTodos = await TodoService.editarTodo(evt.id, evt.titulo, evt.descricao, !evt.finalizado);
    setTodos(retornoTodos);
    limparCampos();
  }

  return (
    <div>
      <div>
        <div style={{ marginBottom: "16px" }}>
          <form onSubmit={idTodo !== "" ? editarTodo : criarTodo}>
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
        </div>

        {todos.map(todo => {
          return (

            <div style={{ marginBottom: "16px" }}>
              <input type='checkbox' name={todo.id} id={todo.id} checked={todo.finalizado} onChange={() => alteraStatusTodo(todo)} />
              {todo.titulo} {todo.descricao !== "" ? " - " + todo.descricao : ""}
              <div>
                <button style={{ margin: "8px" }} onClick={() => onChangeTodo(todo)}>Editar</button>
                <button style={{ margin: "8px" }} onClick={() => apagarTodo(todo)}>Apagar</button>
              </div>
            </div>

          )
        })}

      </div>
    </div>
  )
}

export default HomePage;
