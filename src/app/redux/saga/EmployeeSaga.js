import "react-toastify/dist/ReactToastify.css";
import { call, put, takeEvery } from "redux-saga/effects";
import { toast } from "react-toastify";

import { employeeApi } from "../../views/Employee/EmployeeService";
import { EMPLOYEES } from "../actions/EmployeeActions";

toast.configure({
  autoClose: 1000,
  draggable: false,
  limit: 3,
});

function* getEmployees() {
  try {
    const response = yield call(employeeApi.getAll);
    yield put({ type: EMPLOYEES.GET_ALL_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: EMPLOYEES.GET_ALL_ERROR, payload: error });
  }
}

function* createEmployee(action) {
  try {
    const response = yield call(employeeApi.create, action.payload);
    yield put({ type: EMPLOYEES.CREATE_SUCCESS, payload: response.data });
    toast.success("Thêm nhân viên thành công");
  } catch (error) {
    yield put({ type: EMPLOYEES.CREATE_ERROR, payload: error });
    toast.error("Thêm nhân viên không thành công");
  }
}

function* deleteEmployee(action) {
  try {
    const response = yield call(employeeApi.deleteById, action.payload);
    yield put({ type: EMPLOYEES.DELETE_SUCCESS, payload: action.payload });
    toast.success("Xóa nhân viên thành công");
  } catch (error) {
    yield put({ type: EMPLOYEES.DELETE_ERROR, payload: error });
    toast.error("Xóa nhân viên không thành công");
  }
}

function* updateEmployee(action) {
  try {
    const response = yield call(employeeApi.update, action.payload);
    yield put({ type: EMPLOYEES.UPDATE_SUCCESS, payload: response.data });
    yield put({ type: EMPLOYEES.GET_ALL });
    toast.success("Sửa nhân viên thành công");
  } catch (error) {
    yield put({ type: EMPLOYEES.UPDATE_ERROR, payload: error });
    toast.error("Sửa nhân viên không thành công");
  }
}

function* searchEmployee(action) {
  try {
    const response = yield call(employeeApi.search, action.payload);
    yield put({ type: EMPLOYEES.SEARCH_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: EMPLOYEES.SEARCH_ERROR, payload: error });
  }
}

export default function* EMPLOYEESaga() {
  yield takeEvery(EMPLOYEES.GET_ALL, getEmployees);
  yield takeEvery(EMPLOYEES.CREATE, createEmployee);
  yield takeEvery(EMPLOYEES.DELETE, deleteEmployee);
  yield takeEvery(EMPLOYEES.UPDATE, updateEmployee);
  yield takeEvery(EMPLOYEES.SEARCH, searchEmployee);
}
