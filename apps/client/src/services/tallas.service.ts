import AxiosRequest from '../hooks/AxiosRequest';
import { Method } from 'axios';

const RESOURCE = 'tallas';

interface Talla {
  id: string;
  nombre: String;
}

// Función para mapear CRUD a métodos HTTP
const mapMethod = (method: 'C' | 'R' | 'U' | 'D' | 'P'): Method => {
  switch (method) {
    case 'C':
      return 'POST';
    case 'R':
      return 'GET';
    case 'U':
      return 'PUT';
    case 'D':
      return 'DELETE';
    case 'P':
      return 'PATCH';
    default:
      throw new Error('Método no válido');
  }
};

// Crear un Talla
export const createTalla = async (payload: Talla) => {
  return await AxiosRequest(`/${RESOURCE}`, mapMethod('C'), payload);
};

// Obtener todos los Tallas
export const getTallas = async () => {
  return await AxiosRequest(`/${RESOURCE}`, mapMethod('R'));
};

// Obtener un Talla por ID
export const getTalla = async (id: string) => {
  return await AxiosRequest(`/${RESOURCE}/${id}`, mapMethod('R'));
};

// Actualizar un Talla
export const updateTalla = async (id: string, payload: Talla) => {
  return await AxiosRequest(`/${RESOURCE}/${id}`, mapMethod('U'), payload);
};

// Eliminar un Talla
export const deleteTalla = async (id: string) => {
  return await AxiosRequest(`/${RESOURCE}/${id}`, mapMethod('D'));
};
