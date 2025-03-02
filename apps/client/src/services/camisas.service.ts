import AxiosRequest from '../hooks/AxiosRequest';
import { Method } from 'axios';

const RESOURCE = 'camisas';

export interface Camisa {
  id: string;
  nombre: string;
  descripcion: string;
  precion: number;
  estadoVenta: boolean;
  fotoPrincipal: string;
  administrador: string;
  tipoCamisa: string;
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

// Crear un camisa
export const createCamisa = async (payload: Camisa) => {
  return await AxiosRequest(`/${RESOURCE}`, mapMethod('C'), payload);
};

// Obtener todos los camisas
export const getCamisas = async () => {
  return await AxiosRequest(`/${RESOURCE}`, mapMethod('R'));
};

// Obtener un camisa por ID
export const getCamisa = async (id: string) => {
  return await AxiosRequest(`/${RESOURCE}/${id}`, mapMethod('R'));
};

// Actualizar un camisa
export const updateCamisa = async (id: string, payload: Camisa) => {
  return await AxiosRequest(`/${RESOURCE}/${id}`, mapMethod('U'), payload);
};

// Eliminar un camisa
export const deleteCamisa = async (id: string) => {
  return await AxiosRequest(`/${RESOURCE}/${id}`, mapMethod('D'));
};
