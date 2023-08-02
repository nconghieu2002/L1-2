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
    const response = yield call(provinceApi.create(action.payload));
    yield put({ type: PROVINCES.CREATE_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: PROVINCES.CREATE_ERROR, payload: error });
  }
}

// function* addProvince(action) {
//   try {
//     const response = yield call(
//       axios.post,
//       `${API_PATH}/api/provinces`,
//       action.payload
//     );
//     yield put(addProvinceSuccess(response.data));
//     toast.success("Thêm tỉnh thành công");
//   } catch (error) {
//     yield put(addProvinceFailure(error));
//     toast.error("Thêm tỉnh không thành công");
//   }
// }

// function* getProvinceDetail(action) {
//   try {
//     const response = yield call(
//       axios.get,
//       `${API_PATH}/api/provinces/${action.payload}/detail`
//     );
//     yield put(getProvinceDetailSuccess(response.data));
//   } catch (error) {
//     yield put(getProvinceDetailFailure(error));
//   }
// }

// function* searchProvinces(action) {
//   try {
//     const response = yield call(
//       axios.post,
//       `${API_PATH}/api/provinces/page`,
//       action.payload
//     );
//     yield put(searchProvincesSuccess(response.data));
//   } catch (error) {
//     yield put(searchProvincesFailure(error));
//   }
// }

// function* addProvince(action) {
//   try {
//     const response = yield call(
//       axios.post,
//       `${API_PATH}/api/provinces`,
//       action.payload
//     );
//     yield put(addProvinceSuccess(response.data));
//     toast.success("Thêm tỉnh thành công");
//   } catch (error) {
//     yield put(addProvinceFailure(error));
//     toast.error("Thêm tỉnh không thành công");
//   }
// }

// function* deleteProvince(action) {
//   try {
//     yield call(axios.delete, `${API_PATH}/api/provinces/${action.payload}`);
//     yield put(deleteProvinceSuccess(action.payload));
//     toast.success("Xóa tỉnh thành công");
//   } catch (error) {
//     yield put(deleteProvinceFailure(error));
//     toast.error("Xóa tỉnh không thành công");
//   }
// }

// function* updateProvince(action) {
//   try {
//     const response = yield call(
//       axios.put,
//       `${API_PATH}/api/provinces/${action.payload.id}`,
//       action.payload
//     );
//     yield put(updateProvinceSuccess(response.data.data));
//     toast.success("Sửa tỉnh thành công");
//   } catch (error) {
//     yield put(updateProvinceFailure(error));
//     toast.error("Sửa tỉnh không thành công");
//   }
// }

export default function* ProvinceSaga() {
  yield takeEvery(PROVINCES.GET_ALL, getProvinces);
  yield takeEvery(PROVINCES.GET_ALL, createProvince);
  // yield takeEvery(GET_PROVINCE_DETAIL, getProvinceDetail);
  // yield takeEvery(SEARCH_PROVINCES, searchProvinces);
  // yield takeEvery(ADD_PROVINCE, addProvince);
  // yield takeEvery(DELETE_PROVINCE, deleteProvince);
  // yield takeEvery(UPDATE_PROVINCE, updateProvince);
}
