import axios from './axios';
let token = localStorage.getItem('token');
const headers = {
  authorization: `Bearer ${token?.slice(1, token.length - 1)}`,
};

const documentoService = {
  getAllDocumentos: async () => (await axios.get('documentos', { headers })).data,

  addDocumento: async (data: any) => {
    const result = await axios.post('documentos', data, {
      headers,
    });
    return result.data;
  },

  updateDocumento: async (data: any) => {
    const result = await axios.put('documentos', data, {
      headers,
    });
    return result.data;
  },

  obterDocumentoPorID: async (id: string) => {
    const result = await axios.get(`documentos/obter-por-id?id=${id}`, {
      headers,
    });
    return result.data;
  },

  // TODO: Back-end faltando
  // deleteDocumento: async (categoriaId: number) => {
  //   const res = await axios.delete(`documentos?notaId=${categoriaId}`, { headers });
  //   return res.data;
  // },
};

export default documentoService;
