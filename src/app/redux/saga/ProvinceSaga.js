import "react-toastify/dist/ReactToastify.css";
import { call, put, takeEvery } from "redux-saga/effects";
import { toast } from "react-toastify";

import { provinceApi } from "../../views/Address/Province/ProvinceService";
import { PROVINCES } from "../actions/ProvinceActions";

toast.configure({
  autoClose: 1000,
  draggable: false,
  limit: 1,
});

function* getProvinces() {
  try {
    const response = yield call(provinceApi.getAll);
    yield put({ type: PROVINCES.GET_ALL_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: PROVINCES.GET_ALL_ERROR, payload: error });
  }
}

function* createProvince(action) {
  try {
    const response = yield call(provinceApi.create, action.payload);
    yield put({ type: PROVINCES.CREATE_SUCCESS, payload: response.data });
    toast.success("Thêm tỉnh/thành phố thành công");
  } catch (error) {
    yield put({ type: PROVINCES.CREATE_ERROR, payload: error });
    toast.error("Thêm tỉnh/thành phố không thành công");
  }
}

function* deleteProvince(action) {
  try {
    const response = yield call(provinceApi.deleteById, action.payload);
    yield put({ type: PROVINCES.DELETE_SUCCESS, payload: action.payload });
    toast.success("Xóa tỉnh/thành phố thành công");
  } catch (error) {
    yield put({ type: PROVINCES.DELETE_ERROR, payload: error });
    toast.error("Xóa tỉnh/thành phố không thành công");
  }
}

function* updateProvince(action) {
  try {
    const response = yield call(provinceApi.update, action.payload);
    yield put({ type: PROVINCES.UPDATE_SUCCESS, payload: response.data });
    yield put({ type: PROVINCES.GET_ALL });
    toast.success("Sửa tỉnh/thành phố thành công");
  } catch (error) {
    yield put({ type: PROVINCES.UPDATE_ERROR, payload: error });
    toast.error("Sửa tỉnh/thành phố không thành công");
  }
}

function* searchProvince(action) {
  try {
    const response = yield call(provinceApi.search, action.payload);
    yield put({ type: PROVINCES.SEARCH_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: PROVINCES.SEARCH_ERROR, payload: error });
  }
}

export default function* ProvinceSaga() {
  yield takeEvery(PROVINCES.GET_ALL, getProvinces);
  yield takeEvery(PROVINCES.CREATE, createProvince);
  yield takeEvery(PROVINCES.DELETE, deleteProvince);
  yield takeEvery(PROVINCES.UPDATE, updateProvince);
  yield takeEvery(PROVINCES.SEARCH, searchProvince);
}
