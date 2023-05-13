import axios from './axios';
let token = localStorage.getItem('token');
const headers = {
  authorization: `Bearer ${token?.slice(1, token.length - 1)}`,
};

const usuarioSerivce = {
  getUsuarioLogado: async () => {
    const result = await axios.get('usuario/obter-por-id', { headers });
    return result.data;
  },
};

export default usuarioSerivce;
