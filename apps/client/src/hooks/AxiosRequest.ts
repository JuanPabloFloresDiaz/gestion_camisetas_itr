// src/hooks/AxiosRequest.ts
import axios, { AxiosRequestConfig, Method } from 'axios';
import ENV from '@/utils/env';

const SERVER_URL = ENV.SERVER_URL;

/**
 * Función asíncrona para realizar peticiones al servidor utilizando Axios y enviando datos como `form-data`.
 * @param {string} endpoint - El endpoint al que se realizará la petición.
 * @param {Method} method - Método HTTP (GET, POST, PUT, DELETE, PATCH).
 * @param {Object} form - Datos a enviar en el cuerpo de la petición.
 * @returns {Promise<Object>} - Respuesta del servidor.
 */
const AxiosRequest = async (endpoint: string, method: Method, form: { [key: string]: any } = {}) => {
  // Configurar `form-data` para el cuerpo de la petición
  const formData = new FormData();
  Object.entries(form).forEach(([key, value]) => {
    formData.append(key, value);
  });

  // Leer el token del localStorage
  const token = localStorage.getItem('jwtToken');

  // Configurar opciones para Axios
  const OPTIONS: AxiosRequestConfig = {
    method: method,
    url: SERVER_URL + endpoint,
    headers: {
      Authorization: token ? `Bearer ${token}` : '', // Agregar token si existe
    },
    data: null,
  };

  // Agregar datos al cuerpo solo si el método lo permite
  if (method === 'POST' || method === 'PUT' || method === 'PATCH' || method === 'DELETE') {
    OPTIONS.data = formData;
  }

  try {
    // Realizar la petición
    const RESPONSE = await axios(OPTIONS);

    // Imprimir información de la respuesta
    console.log('RESPONSE:', {
      URL: OPTIONS.url,
      Status: RESPONSE.status,
      Data: RESPONSE.data,
    });

    // Devolver los datos
    return RESPONSE.data;
  } catch (error) {
    console.error('Error en la petición:', error);

    // Si hay un problema en la respuesta del servidor, manejarlo aquí
    if (axios.isAxiosError(error) && error.response) {
      const errorData = error.response.data;

      // Si el error tiene un arreglo "error" (de validaciones o mensajes específicos)
      if (Array.isArray(errorData.error)) {
        // Concatenar todos los mensajes de error
        const errorMessages = errorData.error.map((err: { msg: string }) => err.msg).join(', ');

        // Lanzar el error concatenado
        throw new Error(`Errores: ${errorMessages}`);
      }

      // Si no es un arreglo, mostrar el mensaje de error general
      throw new Error(
        `${errorData.error || 'Error desconocido'}`
      );
    }

    throw error;
  }
};

export default AxiosRequest;
