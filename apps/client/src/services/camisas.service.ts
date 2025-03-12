import AxiosRequest from '../hooks/AxiosRequest';
import { Method } from 'axios';

const RESOURCE = 'camisas';

export interface Camisa {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  estadoVenta: boolean;
  fotoPrincipal?: string | null;
  administrador: object;
  tipoCamisa: object;
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

// Obtener todas las camisas con paginación
export const getCamisas = async (page: number, limit: number, searchTerm?: string) => {
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

// Obtener una camisa por ID
export const getCamisa = async (id: string) => {
  return await AxiosRequest(`/${RESOURCE}/${id}`, mapMethod('R'));
};

// Crear una camisa
export const createCamisa = async (payload: Omit<Camisa, "id">) => {
  return await AxiosRequest(`/${RESOURCE}`, mapMethod('C'), payload);
};

// Actualizar una camisa
export const updateCamisa = async (id: string, payload: Omit<Camisa, "administrador">) => {
  return await AxiosRequest(`/${RESOURCE}/${id}`, mapMethod('U'), payload);
};

// Eliminar una camisa
export const deleteCamisa = async (id: string) => {
  return await AxiosRequest(`/${RESOURCE}/${id}`, mapMethod('D'));
};