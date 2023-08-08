import { PROVINCES } from "../actions/ProvinceActions";

const initialState = {
  provinces: [],
  province: null,
  loading: false,
  error: null,
};

function provinceReducer(state = initialState, action) {
  switch (action.type) {
    // Get provinces
    case PROVINCES.GET_ALL:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case PROVINCES.GET_ALL_SUCCESS:
      return {
        ...state,
        provinces: action.payload.data,
        loading: false,
      };
    case PROVINCES.GET_ALL_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Create province
    case PROVINCES.CREATE:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case PROVINCES.CREATE_SUCCESS:
      return {
        ...state,
        provinces: [...state.provinces, action.payload.data],
        loading: false,
      };
    case PROVINCES.CREATE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    //Delete province
    case PROVINCES.DELETE:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case PROVINCES.DELETE_SUCCESS:
      return {
        ...state,
        provinces: state.provinces.filter((item) => item.id !== action.payload),
        loading: false,
      };
    case PROVINCES.DELETE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    //Update province
    case PROVINCES.UPDATE:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case PROVINCES.UPDATE_SUCCESS:
      return {
        ...state,
        provinces: state.provinces.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        loading: false,
      };
    case PROVINCES.UPDATE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export default provinceReducer;
