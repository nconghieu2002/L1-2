import { all } from "redux-saga/effects";
// import employeeWatcher from "./EmployeeSaga";
// import districtWatcher from "./DistrictSaga";
// import wardWatcher from "./WardSaga";

import provinceSaga from "./ProvinceSaga";
import DistrictSaga from "./DistrictSaga";

export default function* rootSaga() {
  yield all([
    // employeeWatcher(),
    provinceSaga(),
    DistrictSaga(),
    // districtWatcher(),
    // wardWatcher(),
  ]);
}
