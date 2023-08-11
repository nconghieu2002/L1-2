import { EMPLOYEES } from "../actions/EmployeeActions";

const initialState = {
  employees: [],
  loading: false,
  error: null,
};

function employeeReducer(state = initialState, action) {
  switch (action.type) {
    // Get EMPLOYEES
    case EMPLOYEES.GET_ALL:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case EMPLOYEES.GET_ALL_SUCCESS:
      return {
        ...state,
        employees: action.payload.data,
        loading: false,
      };
    case EMPLOYEES.GET_ALL_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Create employee
    case EMPLOYEES.CREATE:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case EMPLOYEES.CREATE_SUCCESS:
      return {
        ...state,
        employees: [...state.employees, action.payload.data],
        loading: false,
      };
    case EMPLOYEES.CREATE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    //Delete employee
    case EMPLOYEES.DELETE:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case EMPLOYEES.DELETE_SUCCESS:
      return {
        ...state,
        employees: state.employees.filter((item) => item.id !== action.payload),
        loading: false,
      };
    case EMPLOYEES.DELETE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    //Update employee
    case EMPLOYEES.UPDATE:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case EMPLOYEES.UPDATE_SUCCESS:
      return {
        ...state,
        employees: state.employees.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        loading: false,
      };
    case EMPLOYEES.UPDATE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    //Search employee
    case EMPLOYEES.SEARCH:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case EMPLOYEES.SEARCH_SUCCESS:
      return {
        ...state,
        employees: action.payload.data.content,
        loading: false,
      };
    case EMPLOYEES.SEARCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export default employeeReducer;
