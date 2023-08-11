import "react-toastify/dist/ReactToastify.css";
import { call, put, takeEvery } from "redux-saga/effects";
import { toast } from "react-toastify";

import { wardApi } from "../../views/Address/Ward/WardService";
import { WARDS } from "../actions/WardActions";

toast.configure({
  autoClose: 1000,
  draggable: false,
  limit: 3,
});

function* getWards() {
  try {
    const response = yield call(wardApi.getAll);
    yield put({ type: WARDS.GET_ALL_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: WARDS.GET_ALL_ERROR, payload: error });
  }
}

function* createWard(action) {
  try {
    const response = yield call(wardApi.create, action.payload);
    yield put({ type: WARDS.CREATE_SUCCESS, payload: response.data });
    toast.success("Thêm xã/phường thành công");
  } catch (error) {
    yield put({ type: WARDS.CREATE_ERROR, payload: error });
    toast.error("Thêm xã/phường không thành công");
  }
}

function* deleteWard(action) {
  try {
    const response = yield call(wardApi.deleteById, action.payload);
    yield put({ type: WARDS.DELETE_SUCCESS, payload: action.payload });
    toast.success("Xóa xã/phường thành công");
  } catch (error) {
    yield put({ type: WARDS.DELETE_ERROR, payload: error });
    toast.error("Xóa xã/phường không thành công");
  }
}

function* updateWard(action) {
  try {
    const response = yield call(wardApi.update, action.payload);
    yield put({ type: WARDS.UPDATE_SUCCESS, payload: response.data });
    yield put({ type: WARDS.GET_ALL });
    toast.success("Sửa xã/phường thành công");
  } catch (error) {
    yield put({ type: WARDS.UPDATE_ERROR, payload: error });
    toast.error("Sửa xã/phường không thành công");
  }
}

function* searchWard(action) {
  try {
    const response = yield call(wardApi.search, action.payload);
    yield put({ type: WARDS.SEARCH_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: WARDS.SEARCH_ERROR, payload: error });
  }
}

export default function* WardSaga() {
  yield takeEvery(WARDS.GET_ALL, getWards);
  yield takeEvery(WARDS.CREATE, createWard);
  yield takeEvery(WARDS.DELETE, deleteWard);
  yield takeEvery(WARDS.UPDATE, updateWard);
  yield takeEvery(WARDS.SEARCH, searchWard);
}
