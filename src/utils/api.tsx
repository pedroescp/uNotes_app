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

  notesGet: async (data: any) => {
    const request = await axios({
      method: "POST",
      data: data,
      url: "usuario",
    });
    return request;
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
