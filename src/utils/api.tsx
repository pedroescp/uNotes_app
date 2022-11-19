import axios from "./axios";

const api = {
  //TODO  refator this exemple
  login: async (data: any) => {
    const request = await axios({
      method: "POST",
      data: data,
      url: "user/login",
    });
    return request;
  },
};

export default api;
