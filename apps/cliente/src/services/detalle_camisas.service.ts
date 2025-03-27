import AxiosRequest from '../hooks/AxiosRequest';
import { Method } from 'axios';

const RESOURCE = 'detail-camisas';

export interface DetalleCamisa {
  id: string;
  camisa: object;
  talla: object;
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
export const createDetalleCamisa = async (payload: DetalleCamisa) => {
  return await AxiosRequest(`/${RESOURCE}`, mapMethod('C'), payload);
};

// Crear varios camisas
export const createDetalleCamisas = async (payload: DetalleCamisa[]) => {
  return await AxiosRequest(`/${RESOURCE}/all`, mapMethod('C'), payload);
};

// Obtener todos los camisas
export const getDetalleCamisas = async () => {
  return await AxiosRequest(`/${RESOURCE}`, mapMethod('R'));
};

// Obtener un camisa por ID
export const getDetalleCamisa = async (id: string) => {
  return await AxiosRequest(`/${RESOURCE}/${id}`, mapMethod('R'));
};

// Actualizar un camisa
export const updateDetalleCamisa = async (id: string, payload: DetalleCamisa) => {
  return await AxiosRequest(`/${RESOURCE}/${id}`, mapMethod('U'), payload);
};

// Eliminar un camisa
export const deleteDetalleCamisa = async (id: string) => {
  return await AxiosRequest(`/${RESOURCE}/${id}`, mapMethod('D'));
};

// Buscar detalle_camisas por camisa
export const searchDetalleCamisasByCamisa = async (camisaId: string) => {
  return await AxiosRequest(`/${RESOURCE}/camisa/${camisaId}`, mapMethod('R'));
}