import axios from './axios';
let token = localStorage.getItem('token');
const headers = {
  authorization: `Bearer ${token?.slice(1, token.length - 1)}`,
};

const categoriaService = {
  getAllCategorias: async () => (await axios.get('categoria', { headers })).data,

  addCategoria: async (data: any) => {
    const result = await axios.post('categoria', data, {
      headers,
    });
    return result.data;
  },

  updateCategoria: async (data: any) => {
    const result = await axios.put('categoria', data, {
      headers,
    });
    return result.data;
  },

  deleteCategoria: async (categoriaId: number) => {
    const res = await axios.delete(`categoria?notaId=${categoriaId}`, { headers });
    return res.data;
  },
};

export default categoriaService;
