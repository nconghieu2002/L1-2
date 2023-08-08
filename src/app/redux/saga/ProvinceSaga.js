import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { PROVINCES } from "../actions/ProvinceActions";

import ConstantList from "../../appConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { provinceApi } from "../../views/Address/Province/ProvinceService";

toast.configure({
  autoClose: 1000,
  draggable: false,
  limit: 3,
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
    toast.success("Thêm tỉnh thành công");
  } catch (error) {
    yield put({ type: PROVINCES.CREATE_ERROR, payload: error });
    toast.error("Thêm tỉnh không thành công");
  }
}

function* deleteProvince(action) {
  try {
    const response = yield call(provinceApi.deleteById, action.payload);
    yield put({ type: PROVINCES.DELETE_SUCCESS, payload: action.payload });
    toast.success("Xóa tỉnh thành công");
  } catch (error) {
    yield put({ type: PROVINCES.DELETE_ERROR, payload: error });
    toast.error("Xóa tỉnh không thành công");
  }
}

function* updateProvince(action) {
  try {
    const response = yield call(provinceApi.update, action.payload);
    yield put({ type: PROVINCES.UPDATE_SUCCESS, payload: response.data });
    yield put({ type: PROVINCES.GET_ALL });
    toast.success("Sửa tỉnh thành công");
  } catch (error) {
    yield put({ type: PROVINCES.UPDATE_ERROR, payload: error });
    toast.error("Sửa tỉnh không thành công");
  }
}

export default function* ProvinceSaga() {
  yield takeEvery(PROVINCES.GET_ALL, getProvinces);
  yield takeEvery(PROVINCES.CREATE, createProvince);
  yield takeEvery(PROVINCES.DELETE, deleteProvince);
  yield takeEvery(PROVINCES.UPDATE, updateProvince);
}
