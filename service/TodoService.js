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
}
