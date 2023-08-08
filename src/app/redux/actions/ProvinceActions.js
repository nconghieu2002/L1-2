export const PROVINCES = {
  GET_ALL: "GET_PROVINCES",
  GET_ALL_SUCCESS: "GET_PROVINCES_SUCCESS",
  GET_ALL_ERROR: "GET_PROVINCES_ERROR",

  GET_DETAIL: "GET_PROVINCE_DETAIL",
  GET_DETAIL_SUCCESS: "GET_PROVINCE_DETAIL_SUCCESS",
  GET_DETAIL_ERROR: "GET_PROVINCE_DETAIL_ERROR",

  CREATE: "CREATE_PROVINCE",
  CREATE_SUCCESS: "CREATE_PROVINCE_SUCCESS",
  CREATE_ERROR: "CREATE_PROVINCE_ERROR",

  UPDATE: "UPDATE_PROVINCE",
  UPDATE_SUCCESS: "UPDATE_PROVINCE_SUCCESS",
  UPDATE_ERROR: "UPDATE_PROVINCE_ERROR",

  DELETE: "DELETE_PROVINCE",
  DELETE_SUCCESS: "DELETE_PROVINCE_SUCCESS",
  DELETE_ERROR: "DELETE_PROVINCE_ERROR",

  SEARCH: "SEARCH_PROVINCES",
  SEARCH_SUCCESS: "SEARCH_PROVINCES_SUCCESS",
  SEARCH_ERROR: "SEARCH_PROVINCES_ERROR",
};

export const provinceActions = {
  getAll: () => {
    return { type: PROVINCES.GET_ALL };
  },
  getDetail: (id) => {
    return { type: PROVINCES.GET_DETAIL, payload: id };
  },
  create: (data) => {
    return { type: PROVINCES.CREATE, payload: data };
  },
  update: (data) => {
    return { type: PROVINCES.UPDATE, payload: data };
  },
  delete: (id) => {
    return { type: PROVINCES.DELETE, payload: id };
  },
  search: (data) => {
    return { type: PROVINCES.SEARCH, payload: data };
  },
};
