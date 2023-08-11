import { WARDS } from "../actions/WardActions";

const initialState = {
  wards: [],
  loading: false,
  error: null,
};

function wardReducer(state = initialState, action) {
  switch (action.type) {
    // Get WARDS
    case WARDS.GET_ALL:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case WARDS.GET_ALL_SUCCESS:
      return {
        ...state,
        wards: action.payload.data,
        loading: false,
      };
    case WARDS.GET_ALL_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Create ward
    case WARDS.CREATE:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case WARDS.CREATE_SUCCESS:
      return {
        ...state,
        wards: [...state.wards, action.payload.data],
        loading: false,
      };
    case WARDS.CREATE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    //Delete WARD
    case WARDS.DELETE:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case WARDS.DELETE_SUCCESS:
      return {
        ...state,
        wards: state.wards.filter((item) => item.id !== action.payload),
        loading: false,
      };
    case WARDS.DELETE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    //Update ward
    case WARDS.UPDATE:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case WARDS.UPDATE_SUCCESS:
      return {
        ...state,
        wards: state.wards.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        loading: false,
      };
    case WARDS.UPDATE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    //Search ward
    case WARDS.SEARCH:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case WARDS.SEARCH_SUCCESS:
      return {
        ...state,
        wards: action.payload.data.content,
        loading: false,
      };
    case WARDS.SEARCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export default wardReducer;
