import { PROVINCES } from "../actions/ProvinceActions";

const initialState = {
  provinces: [],
  loading: false,
  error: null,
};

function provinceReducer(state = initialState, action) {
  switch (action.type) {
    //request
    case PROVINCES.GET_ALL:
    case PROVINCES.CREATE:
    case PROVINCES.DELETE:
    case PROVINCES.UPDATE:
    case PROVINCES.SEARCH:
      return {
        ...state,
        loading: true,
        error: null,
      };

    //error
    case PROVINCES.GET_ALL_ERROR:
    case PROVINCES.CREATE_ERROR:
    case PROVINCES.DELETE_ERROR:
    case PROVINCES.UPDATE_ERROR:
    case PROVINCES.SEARCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    //success
    case PROVINCES.GET_ALL_SUCCESS:
      return {
        ...state,
        provinces: action.payload.data,
        loading: false,
      };
    case PROVINCES.CREATE_SUCCESS:
      return {
        ...state,
        provinces: [...state.provinces, action.payload.data],
        loading: false,
      };
    case PROVINCES.DELETE_SUCCESS:
      return {
        ...state,
        provinces: state.provinces.filter((item) => item.id !== action.payload),
        loading: false,
      };
    case PROVINCES.UPDATE_SUCCESS:
      return {
        ...state,
        provinces: state.provinces.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        loading: false,
      };
    case PROVINCES.SEARCH_SUCCESS:
      return {
        ...state,
        provinces: action.payload.data.content,
        loading: false,
      };

    default:
      return state;
  }
}

export default provinceReducer;
