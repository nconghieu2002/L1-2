export const WARDS = {
  GET_ALL: "GET_WARDS",
  GET_ALL_SUCCESS: "GET_WARDS_SUCCESS",
  GET_ALL_ERROR: "GET_WARDS_ERROR",

  GET_DETAIL: "GET_WARD_DETAIL",
  GET_DETAIL_SUCCESS: "GET_WARD_DETAIL_SUCCESS",
  GET_DETAIL_ERROR: "GET_WARD_DETAIL_ERROR",

  CREATE: "CREATE_WARD",
  CREATE_SUCCESS: "CREATE_WARD_SUCCESS",
  CREATE_ERROR: "CREATE_WARD_ERROR",

  UPDATE: "UPDATE_WARD",
  UPDATE_SUCCESS: "UPDATE_WARD_SUCCESS",
  UPDATE_ERROR: "UPDATE_WARD_ERROR",

  DELETE: "DELETE_WARD",
  DELETE_SUCCESS: "DELETE_WARD_SUCCESS",
  DELETE_ERROR: "DELETE_WARD_ERROR",

  SEARCH: "SEARCH_WARDS",
  SEARCH_SUCCESS: "SEARCH_WARDS_SUCCESS",
  SEARCH_ERROR: "SEARCH_WARDS_ERROR",
};

export const wardActions = {
  getAll: () => {
    return { type: WARDS.GET_ALL };
  },
  getDetail: (id) => {
    return { type: WARDS.GET_DETAIL, payload: id };
  },
  create: (data) => {
    return { type: WARDS.CREATE, payload: data };
  },
  update: (data) => {
    return { type: WARDS.UPDATE, payload: data };
  },
  delete: (id) => {
    return { type: WARDS.DELETE, payload: id };
  },
  search: (data) => {
    return { type: WARDS.SEARCH, payload: data };
  },
};
