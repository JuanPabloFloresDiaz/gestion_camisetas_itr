import axios, { AxiosRequestConfig, Method } from 'axios';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const AxiosRequest = async (endpoint: string, method: Method, form: { [key: string]: any } = {}, params?: Record<string, any>) => {
  // Verificar si alguno de los valores en `form` es un archivo (instancia de File)
  const hasFile = Object.values(form).some((value) => value instanceof File);

  let data: FormData | object | null = null;
  let headers: Record<string, string> = {
    Authorization: localStorage.getItem('jwtToken') ? `Bearer ${localStorage.getItem('jwtToken')}` : '',
  };

  if (method === 'POST' || method === 'PUT' || method === 'PATCH' || method === 'DELETE') {
    if (hasFile) {
      // Si hay un archivo, usar FormData
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      data = formData;
    } else {
      // Si no hay archivo, enviar como JSON
      JSON.stringify(form);
      console.log('form', form);
      data = form; // Enviar el objeto directamente
      headers['Content-Type'] = 'application/json'; // Forzar el Content-Type sin charset=UTF-8
    }
  }

  // Configurar opciones para Axios
  const OPTIONS: AxiosRequestConfig = {
    method: method,
    url: SERVER_URL + endpoint,
    headers: headers,
    data: data,
    params: params,
  };

  // Depuración: Imprimir los datos y headers que se enviarán
  console.log('Request Data:', data);
  console.log('Request Headers:', headers);
  console.log('Request URL:', OPTIONS.url);

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
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data;

      // Si el error tiene un arreglo "error" (de validaciones o mensajes específicos)
      if (Array.isArray(errorData?.error)) {
        // Concatenar todos los mensajes de error
        const errorMessages = errorData.error.map((err: { msg: string }) => err.msg).join(', ');

        // Lanzar el error concatenado
        throw new Error(`Errores: ${errorMessages}`);
      }

      // Si no es un arreglo, mostrar el mensaje de error general
      throw new Error(
        `${errorData?.error || 'Error desconocido'}`
      );
    }

    throw error;
  }
};

export default AxiosRequest;