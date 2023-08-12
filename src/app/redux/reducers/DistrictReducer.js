import { DISTRICTS } from "../actions/DistrictActions";

const initialState = {
  districts: [],
  loading: false,
  error: null,
};

function districtReducer(state = initialState, action) {
  switch (action.type) {
    //request
    case DISTRICTS.GET_ALL:
    case DISTRICTS.CREATE:
    case DISTRICTS.DELETE:
    case DISTRICTS.UPDATE:
    case DISTRICTS.SEARCH:
      return {
        ...state,
        loading: true,
        error: null,
      };

    //error
    case DISTRICTS.GET_ALL_ERROR:
    case DISTRICTS.CREATE_ERROR:
    case DISTRICTS.DELETE_ERROR:
    case DISTRICTS.UPDATE_ERROR:
    case DISTRICTS.SEARCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    //success
    case DISTRICTS.GET_ALL_SUCCESS:
      return {
        ...state,
        districts: action.payload.data,
        loading: false,
      };
    case DISTRICTS.CREATE_SUCCESS:
      return {
        ...state,
        districts: [...state.districts, action.payload.data],
        loading: false,
      };
    case DISTRICTS.DELETE_SUCCESS:
      return {
        ...state,
        districts: state.districts.filter((item) => item.id !== action.payload),
        loading: false,
      };
    case DISTRICTS.UPDATE_SUCCESS:
      return {
        ...state,
        districts: state.districts.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        loading: false,
      };
    case DISTRICTS.SEARCH_SUCCESS:
      return {
        ...state,
        districts: action.payload.data.content,
        loading: false,
      };

    default:
      return state;
  }
}

export default districtReducer;
