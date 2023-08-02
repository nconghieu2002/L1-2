import axios from "axios";
import ConstantList from "../../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/provinces/";

export const provinceApi = {
  getAll: () => {
    const url = API_PATH + "all";
    return axios.get(url);
  },
  getById: (id) => {
    const url = API_PATH + id;
    return axios.get(url);
  },
  create: (data) => {
    const url = API_PATH;
    return axios.post(url, data);
  },
  update: (data) => {
    const url = API_PATH + data.id;
    return axios.put(url, data);
  },
  deleteById: (id) => {
    const url = API_PATH + id;
    return axios.delete(url);
  },
  search: (data) => {
    const url = API_PATH + "page";
    return axios.post(url, data);
  },
};
