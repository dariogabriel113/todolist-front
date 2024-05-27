import { useEffect, useState } from 'react';
import { TodoService } from '../service/TodoService';
import { Button, Input } from '@mui/material';


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
        <div style={{ margin: "16px" }}>
          <form onSubmit={idTodo !== "" ? editarTodo : criarTodo}>
            <div style={{margin: 8}}>To Do List</div>
            <Input style={{margin: 16}} name='titulo' placeholder='Titulo' value={titulo} onChange={onChangeTitulo} />
            <Input style={{margin: 16}}
              type='text'
              placeholder='Descrição'
              name='descricao'
              value={descricao}
              onChange={onChangeDescricao}
            />

            <button >Salvar</button>
          </form>
        </div>

        {todos.map(todo => {
          return (

            <div style={{margin: 16}}>
              <input type='checkbox' name={todo.id} id={todo.id} checked={todo.finalizado} onChange={() => alteraStatusTodo(todo)} />
              {todo.titulo} {todo.descricao !== "" ? " - " + todo.descricao : ""}
              <div style={{margin: 8}}>
                <Button style={{margin: 8}} variant="contained" onClick={() => onChangeTodo(todo)}>Editar</Button>
                <Button style={{margin: 8}} variant="contained" color='error' onClick={() => apagarTodo(todo)}>Apagar</Button>
              </div>
            </div>

          )
        })}
        

      </div>
    </div>
  )
}

export default HomePage;
