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
//  getProvinces : () :> {
//   return { type: GET_PROVINCES },
// },

//  getProvincesSuccess : (provinces) :> {
//   return { type: GET_PROVINCES_SUCCESS, payload: provinces },
// },

//  getProvincesERROR : (error) :> {
//   return { type: GET_PROVINCES_ERROR, payload: error },
// },

//  getProvinceDetail : (id) :> {
//   return { type: GET_PROVINCE_DETAIL, payload: id },
// },

//  getProvinceDetailSuccess : (province) :> {
//   return { type: GET_PROVINCE_DETAIL_SUCCESS, payload: province },
// },

//  getProvinceDetailERROR : (error) :> {
//   return { type: GET_PROVINCE_DETAIL_ERROR, payload: error },
// },

//  searchProvinces : (searchValue) :> {
//   return { type: SEARCH_PROVINCES, payload: searchValue },
// },

//  searchProvincesSuccess : (provinces) :> {
//   return { type: SEARCH_PROVINCES_SUCCESS, payload: provinces },
// },

//  searchProvincesERROR : (error) :> {
//   return { type: SEARCH_PROVINCES_ERROR, payload: error },
// },

//  CREATEProvince : (province) :> {
//   return { type: CREATE_PROVINCE, payload: province },
// },

//  CREATEProvinceSuccess : (province) :> {
//   return { type: CREATE_PROVINCE_SUCCESS, payload: province },
// },

//  CREATEProvinceERROR : (error) :> {
//   return { type: CREATE_PROVINCE_ERROR, payload: error },
// },

//  deleteProvince : (id) :> {
//   return { type: DELETE_PROVINCE, payload: id },
// },

//  deleteProvinceSuccess : (id) :> {
//   return { type: DELETE_PROVINCE_SUCCESS, payload: id },
// },

//  deleteProvinceERROR : (error) :> {
//   return { type: DELETE_PROVINCE_ERROR, payload: error },
// },

//  updateProvince : (province) :> {
//   return { type: UPDATE_PROVINCE, payload: province },
// },

//  updateProvinceSuccess : (province) :> {
//   return { type: UPDATE_PROVINCE_SUCCESS, payload: province },
// },

//  updateProvinceERROR : (error) :> {
//   return { type: UPDATE_PROVINCE_ERROR, payload: error },
// },
