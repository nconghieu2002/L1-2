export const EMPLOYEES = {
  GET_ALL: "GET_EMPLOYEES",
  GET_ALL_SUCCESS: "GET_EMPLOYEES_SUCCESS",
  GET_ALL_ERROR: "GET_EMPLOYEES_ERROR",

  GET_DETAIL: "GET_EMPLOYEE_DETAIL",
  GET_DETAIL_SUCCESS: "GET_EMPLOYEE_DETAIL_SUCCESS",
  GET_DETAIL_ERROR: "GET_EMPLOYEE_DETAIL_ERROR",

  GET_PROVINCES: "GET_PROVINCES",
  GET_PROVINCES_SUCCESS: "GET_PROVINCES_SUCCESS",
  GET_PROVINCES_ERROR: "GET_PROVINCES_ERROR",

  GET_DISTRICTS: "GET_DISTRICTS",
  GET_DISTRICTS_SUCCESS: "GET_DISTRICTS_SUCCESS",
  GET_DISTRICTS_ERROR: "GET_DISTRICTS_ERROR",

  GET_WARDS: "GET_WARDS",
  GET_WARDS_SUCCESS: "GET_WARDS_SUCCESS",
  GET_WARDS_ERROR: "GET_WARDS_ERROR",

  CREATE: "CREATE_EMPLOYEE",
  CREATE_SUCCESS: "CREATE_EMPLOYEE_SUCCESS",
  CREATE_ERROR: "CREATE_EMPLOYEE_ERROR",

  UPDATE: "UPDATE_EMPLOYEE",
  UPDATE_SUCCESS: "UPDATE_EMPLOYEE_SUCCESS",
  UPDATE_ERROR: "UPDATE_EMPLOYEE_ERROR",

  DELETE: "DELETE_EMPLOYEE",
  DELETE_SUCCESS: "DELETE_EMPLOYEE_SUCCESS",
  DELETE_ERROR: "DELETE_EMPLOYEE_ERROR",

  SEARCH: "SEARCH_EMPLOYEES",
  SEARCH_SUCCESS: "SEARCH_EMPLOYEES_SUCCESS",
  SEARCH_ERROR: "SEARCH_EMPLOYEES_ERROR",
};

export const employeeActions = {
  getAll: () => {
    return { type: EMPLOYEES.GET_ALL };
  },
  getDetail: (id) => {
    return { type: EMPLOYEES.GET_DETAIL, payload: id };
  },
  create: (data) => {
    return { type: EMPLOYEES.CREATE, payload: data };
  },
  update: (data) => {
    return { type: EMPLOYEES.UPDATE, payload: data };
  },
  delete: (id) => {
    return { type: EMPLOYEES.DELETE, payload: id };
  },
  search: (data) => {
    return { type: EMPLOYEES.SEARCH, payload: data };
  },
  getProvinces: () => {
    return { type: EMPLOYEES.GET_PROVINCES };
  },
  getDistricts: (id) => {
    return { type: EMPLOYEES.GET_DISTRICTS, payload: id };
  },
  getWards: (id) => {
    return { type: EMPLOYEES.GET_WARDS, payload: id };
  },
};