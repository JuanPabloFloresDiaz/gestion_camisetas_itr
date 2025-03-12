import AxiosRequest from '../hooks/AxiosRequest';
import { Method } from 'axios';

const RESOURCE = 'tallas';

export interface Talla {
  id: string;
  nombre: string;
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

// Obtener todas las tallas con paginación
export const getTallas = async (page: number, limit: number, searchTerm?: string) => {
  return await AxiosRequest(
    `/${RESOURCE}`,
    mapMethod('R'),
    {},
    {
      page,
      limit,
      search: searchTerm || undefined,
    }
  );
};

// Obtener una talla por ID
export const getTalla = async (id: string) => {
  return await AxiosRequest(`/${RESOURCE}/${id}`, mapMethod('R'));
};

// Crear una talla
export const createTalla = async (payload: Omit<Talla, "id">) => {
  return await AxiosRequest(`/${RESOURCE}`, mapMethod('C'), payload);
};

// Actualizar una talla
export const updateTalla = async (id: string, payload: Talla) => {
  return await AxiosRequest(`/${RESOURCE}/${id}`, mapMethod('U'), payload);
};

// Eliminar una talla
export const deleteTalla = async (id: string) => {
  return await AxiosRequest(`/${RESOURCE}/${id}`, mapMethod('D'));
};