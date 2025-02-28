import AxiosRequest from '../hooks/AxiosRequest';
import { Method } from 'axios';

const RESOURCE = 'pedidos';

interface Pedido {
  id: string;
  fechaPedido: Date;
  direccionPedido: string;
  cliente: string;
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

// Crear un Pedido
export const createPedido = async (payload: Pedido) => {
  return await AxiosRequest(`/${RESOURCE}`, mapMethod('C'), payload);
};

// Obtener todos los Pedidos
export const getPedidos = async () => {
  return await AxiosRequest(`/${RESOURCE}`, mapMethod('R'));
};

// Obtener un Pedido por ID
export const getPedido = async (id: string) => {
  return await AxiosRequest(`/${RESOURCE}/${id}`, mapMethod('R'));
};

// Actualizar un Pedido
export const updatePedido = async (id: string, payload: Pedido) => {
  return await AxiosRequest(`/${RESOURCE}/${id}`, mapMethod('U'), payload);
};

// Eliminar un Pedido
export const deletePedido = async (id: string) => {
  return await AxiosRequest(`/${RESOURCE}/${id}`, mapMethod('D'));
};
