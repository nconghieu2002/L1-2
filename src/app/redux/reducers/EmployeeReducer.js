import { EMPLOYEES } from "../actions/EmployeeActions";

const initialState = {
  employees: [],
  loading: false,
  error: null,
  provinces: [],
  districts: [],
  wards: [],
};

function employeeReducer(state = initialState, action) {
  switch (action.type) {
    //request
    case EMPLOYEES.GET_ALL:
    case EMPLOYEES.GET_PROVINCES:
    case EMPLOYEES.GET_DISTRICTS:
    case EMPLOYEES.GET_WARDS:
    case EMPLOYEES.CREATE:
    case EMPLOYEES.DELETE:
    case EMPLOYEES.UPDATE:
    case EMPLOYEES.SEARCH:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case EMPLOYEES.GET_ALL_ERROR:
    case EMPLOYEES.GET_PROVINCES_ERROR:
    case EMPLOYEES.GET_DISTRICTS_ERROR:
    case EMPLOYEES.GET_WARDS_ERROR:
    case EMPLOYEES.CREATE_ERROR:
    case EMPLOYEES.DELETE_ERROR:
    case EMPLOYEES.UPDATE_ERROR:
    case EMPLOYEES.SEARCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    //success
    case EMPLOYEES.GET_ALL_SUCCESS:
      return {
        ...state,
        employees: action.payload.data,
        loading: false,
      };
    case EMPLOYEES.GET_PROVINCES_SUCCESS:
      return {
        ...state,
        provinces: action.payload.data,
        loading: false,
      };
    case EMPLOYEES.GET_DISTRICTS_SUCCESS:
      return {
        ...state,
        districts: action.payload.data,
        loading: false,
      };
    case EMPLOYEES.GET_WARDS_SUCCESS:
      return {
        ...state,
        wards: action.payload.data,
        loading: false,
      };
    case EMPLOYEES.CREATE_SUCCESS:
      return {
        ...state,
        employees: [...state.employees, action.payload.data],
        loading: false,
      };
    case EMPLOYEES.DELETE_SUCCESS:
      return {
        ...state,
        employees: state.employees.filter((item) => item.id !== action.payload),
        loading: false,
      };
    case EMPLOYEES.UPDATE_SUCCESS:
      return {
        ...state,
        employees: state.employees.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        loading: false,
      };
    case EMPLOYEES.SEARCH_SUCCESS:
      return {
        ...state,
        employees: action.payload.data.content,
        loading: false,
      };

    default:
      return state;
  }
}

export default employeeReducer;
