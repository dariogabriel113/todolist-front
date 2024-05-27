const BASE_URL = 'http://localhost:8080/todos';

export class TodoService {
  static listarTodos = async () => {
    try {
      const retorno = await fetch(BASE_URL, { method: 'GET' });
      const data = await retorno.json()
      return data
    } catch (err) {
      console.log(err)
    }

    return [];
  }

  static criarTodo = async (titulo, descricao) => {
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ titulo, descricao }),
      })
      const json = await response.json()
      return json
    } catch (err) {
      console.log(err)
    }

    return []
  }

  static apagarTodo = async (id) => {
    try {
      const response = await fetch(BASE_URL + "/" + id, {
        method: 'DELETE',
      })
      const json = await response.json()
      return json
    } catch (err) {
      console.log(err)
    }

    return []
  }

  static editarTodo = async (id, titulo, descricao, finalizado) => {
    try {
      const response = await fetch(BASE_URL, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ id, titulo, descricao, finalizado }),
      })
      const json = await response.json()
      return json
    } catch (err) {
      console.log(err)
    }

    return []
  }
}
