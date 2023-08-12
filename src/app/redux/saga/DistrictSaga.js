import "react-toastify/dist/ReactToastify.css";
import { call, put, takeEvery } from "redux-saga/effects";
import { toast } from "react-toastify";

import { districtApi } from "../../views/Address/District/DistrictService";
import { DISTRICTS } from "../actions/DistrictActions";

toast.configure({
  autoClose: 1000,
  draggable: false,
  limit: 1,
});

function* getDistricts() {
  try {
    const response = yield call(districtApi.getAll);
    yield put({ type: DISTRICTS.GET_ALL_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: DISTRICTS.GET_ALL_ERROR, payload: error });
  }
}

function* createDistrict(action) {
  try {
    const response = yield call(districtApi.create, action.payload);
    yield put({ type: DISTRICTS.CREATE_SUCCESS, payload: response.data });
    toast.success("Thêm huyện/quận thành công");
  } catch (error) {
    yield put({ type: DISTRICTS.CREATE_ERROR, payload: error });
    toast.error("Thêm huyện/quận không thành công");
  }
}

function* deleteDistrict(action) {
  try {
    const response = yield call(districtApi.deleteById, action.payload);
    yield put({ type: DISTRICTS.DELETE_SUCCESS, payload: action.payload });
    toast.success("Xóa huyện/quận thành công");
  } catch (error) {
    yield put({ type: DISTRICTS.DELETE_ERROR, payload: error });
    toast.error("Xóa huyện/quận không thành công");
  }
}

function* updateDistrict(action) {
  try {
    const response = yield call(districtApi.update, action.payload);
    yield put({ type: DISTRICTS.UPDATE_SUCCESS, payload: response.data });
    yield put({ type: DISTRICTS.GET_ALL });
    toast.success("Sửa huyện/quận thành công");
  } catch (error) {
    yield put({ type: DISTRICTS.UPDATE_ERROR, payload: error });
    toast.error("Sửa huyện/quận không thành công");
  }
}

function* searchDistrict(action) {
  try {
    const response = yield call(districtApi.search, action.payload);
    yield put({ type: DISTRICTS.SEARCH_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: DISTRICTS.SEARCH_ERROR, payload: error });
  }
}

export default function* DistrictSaga() {
  yield takeEvery(DISTRICTS.GET_ALL, getDistricts);
  yield takeEvery(DISTRICTS.CREATE, createDistrict);
  yield takeEvery(DISTRICTS.DELETE, deleteDistrict);
  yield takeEvery(DISTRICTS.UPDATE, updateDistrict);
  yield takeEvery(DISTRICTS.SEARCH, searchDistrict);
}
