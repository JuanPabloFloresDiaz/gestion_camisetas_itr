import AxiosRequest from '../hooks/AxiosRequest';
import { Method } from 'axios';

const RESOURCE = 'administradores';

export interface Administrador {
  id: string;
  nombre: string;
  apellido: string;
  clave: string;
  correo: string;
  telefono: string;
  dui?: string | null;
  alias?: string | null;
  estado: boolean;
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

// Crear un administrador
export const createAdministrador = async (payload: Omit<Administrador, "id">) => {
  return await AxiosRequest(`/${RESOURCE}`, mapMethod('C'), payload);
};

// Obtener todos los administradores sin paginación
export const getAllAdministradores = async () => {
  return await AxiosRequest(`/${RESOURCE}/all`, mapMethod('R'));
}

// Obtener todos los administradores con paginación
export const getAdministradores = async (page: number, limit: number, searchTerm?: string) => {
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

// Obtener un administrador por ID
export const getAdministrador = async (id: string) => {
  return await AxiosRequest(`/${RESOURCE}/${id}`, mapMethod('R'));
};

// Actualizar un administrador
export const updateAdministrador = async (id: string, payload: Omit<Administrador, "clave">) => {
  return await AxiosRequest(`/${RESOURCE}/${id}`, mapMethod('U'), payload);
};

// Eliminar un administrador
export const deleteAdministrador = async (id: string) => {
  return await AxiosRequest(`/${RESOURCE}/${id}`, mapMethod('D'));
};

// Buscar un administrador por correo
export const findAdministradorByCorreo = async (correo: string) => {
  return await AxiosRequest(`/${RESOURCE}/correo/${correo}`, mapMethod('R'));
};
