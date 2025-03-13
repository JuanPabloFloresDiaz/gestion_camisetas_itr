import AxiosRequest from '../hooks/AxiosRequest';
import { Method } from 'axios';

const RESOURCE = 'tipo-camisas';

export interface TipoCamisa {
  id: string;
  nombre: string;
  descripcion: string;
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

// Obtener todos los tipos de camisas sin paginación
export const getAllTipoCamisas = async () => {
  return await AxiosRequest(`/${RESOURCE}/all`, mapMethod('R'));
}

// Obtener todos los tipos de camisas con paginación
export const getTipoCamisas = async (page: number, limit: number, searchTerm?: string) => {
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

// Obtener un tipo de camisa por ID
export const getTipoCamisa = async (id: string) => {
  return await AxiosRequest(`/${RESOURCE}/${id}`, mapMethod('R'));
};

// Crear un tipo de camisa
export const createTipoCamisa = async (payload: Omit<TipoCamisa, "id">) => {
  return await AxiosRequest(`/${RESOURCE}`, mapMethod('C'), payload);
};

// Actualizar un tipo de camisa
export const updateTipoCamisa = async (id: string, payload: TipoCamisa) => {
  return await AxiosRequest(`/${RESOURCE}/${id}`, mapMethod('U'), payload);
};

// Eliminar un tipo de camisa
export const deleteTipoCamisa = async (id: string) => {
  return await AxiosRequest(`/${RESOURCE}/${id}`, mapMethod('D'));
};