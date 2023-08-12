import { WARDS } from "../actions/WardActions";

const initialState = {
  wards: [],
  loading: false,
  error: null,
};

function wardReducer(state = initialState, action) {
  switch (action.type) {
    //request
    case WARDS.GET_ALL:
    case WARDS.CREATE:
    case WARDS.DELETE:
    case WARDS.UPDATE:
    case WARDS.SEARCH:
      return {
        ...state,
        loading: true,
        error: null,
      };

    //error
    case WARDS.GET_ALL_ERROR:
    case WARDS.CREATE_ERROR:
    case WARDS.DELETE_ERROR:
    case WARDS.UPDATE_ERROR:
    case WARDS.SEARCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    //success
    case WARDS.GET_ALL_SUCCESS:
      return {
        ...state,
        wards: action.payload.data,
        loading: false,
      };
    case WARDS.CREATE_SUCCESS:
      return {
        ...state,
        wards: [...state.wards, action.payload.data],
        loading: false,
      };
    case WARDS.DELETE_SUCCESS:
      return {
        ...state,
        wards: state.wards.filter((item) => item.id !== action.payload),
        loading: false,
      };
    case WARDS.UPDATE_SUCCESS:
      return {
        ...state,
        wards: state.wards.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        loading: false,
      };
    case WARDS.SEARCH_SUCCESS:
      return {
        ...state,
        wards: action.payload.data.content,
        loading: false,
      };

    default:
      return state;
  }
}

export default wardReducer;
