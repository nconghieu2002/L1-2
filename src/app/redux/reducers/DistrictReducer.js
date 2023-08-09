import { DISTRICTS } from "../actions/DistrictActions";

const initialState = {
  districts: [],
  district: null,
  loading: false,
  error: null,
};

function districtReducer(state = initialState, action) {
  switch (action.type) {
    // Get DISTRICTS
    case DISTRICTS.GET_ALL:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DISTRICTS.GET_ALL_SUCCESS:
      return {
        ...state,
        districts: action.payload.data,
        loading: false,
      };
    case DISTRICTS.GET_ALL_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Create province
    case DISTRICTS.CREATE:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DISTRICTS.CREATE_SUCCESS:
      return {
        ...state,
        districts: [...state.districts, action.payload.data],
        loading: false,
      };
    case DISTRICTS.CREATE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    //Delete province
    case DISTRICTS.DELETE:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DISTRICTS.DELETE_SUCCESS:
      return {
        ...state,
        districts: state.districts.filter((item) => item.id !== action.payload),
        loading: false,
      };
    case DISTRICTS.DELETE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    //Update province
    case DISTRICTS.UPDATE:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DISTRICTS.UPDATE_SUCCESS:
      return {
        ...state,
        districts: state.districts.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        loading: false,
      };
    case DISTRICTS.UPDATE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    //Search province
    case DISTRICTS.SEARCH:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DISTRICTS.SEARCH_SUCCESS:
      return {
        ...state,
        districts: action.payload.data.content,
        loading: false,
      };
    case DISTRICTS.SEARCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export default districtReducer;
