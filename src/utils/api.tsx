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
    const result = await axios.post('notes', data, {
      headers,
    });
    return result.data;
  },

  notesUpdate: async (data: any) => {
    const result = await axios.put('notes', data, {
      headers,
    });
    return result.data;
  },

  notesGet: async () => {
    const result = await axios.get('notes/obter-por-usuario', { headers });
    return result.data;
  },

  documentsPost: async (data: any) => {
    const result = await axios.post('notes', data, {
      headers,
    });
    return result.data;
  },

  documentsUpdate: async (data: any) => {
    const result = await axios.put('notes', data, {
      headers,
    });
    return result.data;
  },

  documentsGet: async () => {
    const result = await axios.get('notes/obter-por-usuario', { headers });
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

  trashGet: async () => {
    const result = await axios.get('notes/obter-por-usuario-lixeira', {
      headers,
    });
    return result.data;
  },

  trashPost: async (data: any) => {
    const result = await axios.delete('notes?notaId=' + data, { headers });
    return result.data;
  },

  archivehGet: async () => {
    const result = await axios.get('notes/obter-por-usuario-arquivado', { headers });
    return result.data;
  },

  archivePost: async (data: any) => {
    const result = await axios.delete('notes/arquivar?notaId=' + data, { headers });
    return result.data;
  },

  usuarioGet: async () => {
    const result = await axios.get('usuario/obter-por-id', { headers });
    return result.data;
  },
};

export default api;
