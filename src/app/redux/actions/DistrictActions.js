export const DISTRICTS = {
  GET_ALL: "GET_DISTRICTS",
  GET_ALL_SUCCESS: "GET_DISTRICTS_SUCCESS",
  GET_ALL_ERROR: "GET_DISTRICTS_ERROR",

  GET_DETAIL: "GET_DISTRICT_DETAIL",
  GET_DETAIL_SUCCESS: "GET_DISTRICT_DETAIL_SUCCESS",
  GET_DETAIL_ERROR: "GET_DISTRICT_DETAIL_ERROR",

  CREATE: "CREATE_DISTRICT",
  CREATE_SUCCESS: "CREATE_DISTRICT_SUCCESS",
  CREATE_ERROR: "CREATE_DISTRICT_ERROR",

  UPDATE: "UPDATE_DISTRICT",
  UPDATE_SUCCESS: "UPDATE_DISTRICT_SUCCESS",
  UPDATE_ERROR: "UPDATE_DISTRICT_ERROR",

  DELETE: "DELETE_DISTRICT",
  DELETE_SUCCESS: "DELETE_DISTRICT_SUCCESS",
  DELETE_ERROR: "DELETE_DISTRICT_ERROR",

  SEARCH: "SEARCH_DISTRICTS",
  SEARCH_SUCCESS: "SEARCH_DISTRICTS_SUCCESS",
  SEARCH_ERROR: "SEARCH_DISTRICTS_ERROR",
};

export const districtActions = {
  getAll: () => {
    return { type: DISTRICTS.GET_ALL };
  },
  getDetail: (id) => {
    return { type: DISTRICTS.GET_DETAIL, payload: id };
  },
  create: (data) => {
    return { type: DISTRICTS.CREATE, payload: data };
  },
  update: (data) => {
    return { type: DISTRICTS.UPDATE, payload: data };
  },
  delete: (id) => {
    return { type: DISTRICTS.DELETE, payload: id };
  },
  search: (data) => {
    return { type: DISTRICTS.SEARCH, payload: data };
  },
};
