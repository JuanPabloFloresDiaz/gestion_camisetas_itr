import AxiosRequest from '../hooks/AxiosRequest';
import { Method } from 'axios';

const RESOURCE = 'auth';

export interface Auth {
  clave: string;
  correo: string;
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


// Función para realizar la petición de autenticación
export const authentication = async (payload: Auth) => {
    return await AxiosRequest(`/${RESOURCE}/login`, mapMethod('C'), payload);
  };