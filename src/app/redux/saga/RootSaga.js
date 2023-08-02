import { all } from "redux-saga/effects";
// import employeeWatcher from "./EmployeeSaga";
import provinceSaga from "./ProvinceSaga";
// import districtWatcher from "./DistrictSaga";
// import wardWatcher from "./WardSaga";

export default function* rootSaga() {
  yield all([
    // employeeWatcher(),
    provinceSaga(),
    // districtWatcher(),
    // wardWatcher(),
  ]);
}
