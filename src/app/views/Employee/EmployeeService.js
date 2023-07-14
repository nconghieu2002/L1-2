import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/employees";

export const getAll = () => {
  return axios.get(API_PATH + "/all");
};

export const getById = (id) => {
  return axios.get(API_PATH + "/" + id);
};

export const saveEmployee = (item) => {
  if (item.id) {
    return axios.put(API_PATH + "/" + item.id, item);
  }
  return axios.post(API_PATH, item);
};

export const deleteEmployee = (id) => {
  return axios.delete(API_PATH + "/" + id);
};

export const searchByPage = (search) => {
  let url = API_PATH + "/page";
  console.log(url);
  return axios.post(url, search);
};

//post - searchByPage
//post - addByExcel
//grt - exportData
// import axios from "axios";
// import ConstantList from "../../appConfig";
// const API_GENERAL = ConstantList.API_ENPOINT + "/api/";
// const API_PATH = API_GENERAL + "/employees/";

// export const searchEmployees = (searchTerm) => {
//   const url = API_PATH + "page";
//   return axios.post(url, searchTerm);
// };

// export const getProvinces = () => {
//   const url = API_GENERAL + "provinces/all";
//   return axios.get(url);
// };

// export const getDistrictsByProvinces = (id) => {
//   const url = API_GENERAL + "/provinces/" + id + "/districts";
//   return axios.get(url);
// };

// export const getWardsByDistricts = (id) => {
//   const url = API_GENERAL + "/districts/" + id + "/wards";
//   return axios.get(url);
// };
// export const addEmployee = (data) => {
//   var url = API_GENERAL + "employees";
//   return axios.post(url, data);
// };

// export const deleteEmployee = (id) => {
//   var url = API_GENERAL + "employees/" + id;
//   return axios.delete(url);
// };

// export const updateEmployee = (data) => {
//   var url = API_PATH + data.id;
//   return axios.put(url, data);
// };

// export const exportEmployee = () => {
//   const url = API_PATH + "export-data";
//   return axios.get(url, { responseType: "blob" });
// };
