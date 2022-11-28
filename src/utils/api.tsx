import axios from './axios';
let token = localStorage.getItem('token');
const headers = {
  authorization: `Bearer ${token?.slice(1, token.length - 1)}`,
};

const api = {
  //TODO  refator this exemple
  usuarioAuth: async (data: any) => {
    const request = await axios({
      method: 'POST',
      data: data,
      url: 'usuario/autenticar',
    });
    return request;
  },

  usuarioRegs: async (data: any) => {
    const request = await axios({
      method: 'POST',
      data: data,
      url: 'usuario',
    });
    return request;
  },

  notesPost: async (data: any) => {
    console.log(data);
    
    const result = await axios.post('notes', data, {
      headers,
    });
    return result.data;
  },

  notesGet: async () => {
    const result = await axios.get('notes', { headers });
    return result.data;
  },

  cargoPost: async (data: any) => {
    const request = await axios({
      method: 'POST',
      data: data,
      url: 'usuario',
    });
    return request;
  },

  cargoGet: async (data: any) => {
    const request = await axios({
      method: 'POST',
      data: data,
      url: 'usuario',
    });
    return request;
  },
};

export default api;
