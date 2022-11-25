import { string } from "yup";
import axios from "./axios";

const api = {
  //TODO  refator this exemple
  usuarioAuth: async (data: any) => {
    const request = await axios({
      method: "POST",
      data: data,
      url: "usuario/autenticar",
    });
    return request;
  },

  usuarioRegs: async (data: any) => {
    const request = await axios({
      method: "POST",
      data: data,
      url: "usuario",
    });
    return request;
  },

  notesPost: async (data: any) => {
    const request = await axios({
      method: "POST",
      data: data,
      url: "usuario",
    });
    return request;
  },

  notesGet: async () => {
    let token = localStorage.getItem('token');
    const result = await axios.get("notes", {
        headers: {
            'authorization': `Bearer ${token?.slice(1, token.length - 1)}`
        }
    });
    return result.data;
  },

  cargoPost: async (data: any) => {
    const request = await axios({
      method: "POST",
      data: data,
      url: "usuario",
    });
    return request;
  },

  cargoGet: async (data: any) => {
    const request = await axios({
      method: "POST",
      data: data,
      url: "usuario",
    });
    return request;
  },

};

export default api;
