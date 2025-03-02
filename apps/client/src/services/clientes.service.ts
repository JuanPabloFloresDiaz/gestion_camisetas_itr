import AxiosRequest from '../hooks/AxiosRequest';
import { Method } from 'axios';

const RESOURCE = 'clientes';

export interface Clientes {
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  dui: string;
  direccion: string;
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

// Crear un cliente
export const createCliente = async (payload: Clientes) => {
  return await AxiosRequest(`/${RESOURCE}`, mapMethod('C'), payload);
};

// Obtener todos los clientes
export const getClientees = async () => {
  return await AxiosRequest(`/${RESOURCE}`, mapMethod('R'));
};

// Obtener un cliente por ID
export const getCliente = async (id: string) => {
  return await AxiosRequest(`/${RESOURCE}/${id}`, mapMethod('R'));
};

// Actualizar un cliente
export const updateCliente = async (id: string, payload: Clientes) => {
  return await AxiosRequest(`/${RESOURCE}/${id}`, mapMethod('U'), payload);
};

// Eliminar un cliente
export const deleteCliente = async (id: string) => {
  return await AxiosRequest(`/${RESOURCE}/${id}`, mapMethod('D'));
};

// Buscar un cliente por correo
export const findClienteByCorreo = async (correo: string) => {
  return await AxiosRequest(`/${RESOURCE}/correo/${correo}`, mapMethod('R'));
};
