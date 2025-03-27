import AxiosRequest from '../hooks/AxiosRequest';
import { Method } from 'axios';

const RESOURCE = 'pedidos';
const RESOURCE_DETALLE = 'detail-pedidos';

export interface Pedido {
  id: string;
  fechaPedido: Date;
  direccionPedido?: string | null;
  cliente: object;
  estadoPedido?: 'Pendiente' | 'Entregado' | 'EnCamino' | 'Cancelado' | null;
}

export interface DetallePedido {
  id: string;
  precioProducto: number;
  cantidadComprada: number;
  pedido: object;
  detalleCamisa: Object;
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

// Crear un Pedido con detalles
export const createPedidoWithDetails = async (pedido: Pedido, detallesPedidos: DetallePedido[]) => {
  const payload = {
    pedido,
    detallesPedidos
  };
  console.log(JSON.stringify(payload));
  return await AxiosRequest(`/${RESOURCE}/with-details`, mapMethod('C'), payload);
};

// Crear un Detalle pedido
export const createDetallePedido = async (payload: DetallePedido) => {
  return await AxiosRequest(`/${RESOURCE_DETALLE}`, mapMethod('C'), payload);
};

// Obtener todos los detalles de Pedidos
export const getDetallePedidos = async () => {
  return await AxiosRequest(`/${RESOURCE_DETALLE}`, mapMethod('R'));
};

// Obtener un detalle pedido por ID
export const getDetallePedido = async (id: string) => {
  return await AxiosRequest(`/${RESOURCE_DETALLE}/${id}`, mapMethod('R'));
};

// Actualizar un detalle pedido
export const updateDetallePedido = async (id: string, payload: DetallePedido) => {
  return await AxiosRequest(`/${RESOURCE_DETALLE}/${id}`, mapMethod('U'), payload);
};

// Eliminar un detalle pedido
export const deleteDetallePedido = async (id: string) => {
  return await AxiosRequest(`/${RESOURCE_DETALLE}/${id}`, mapMethod('D'));
};
