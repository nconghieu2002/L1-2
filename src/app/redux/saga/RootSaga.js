import { all } from "redux-saga/effects";
// import employeeWatcher from "./EmployeeSaga";
// import districtWatcher from "./DistrictSaga";
// import wardWatcher from "./WardSaga";

import provinceSaga from "./ProvinceSaga";
import DistrictSaga from "./DistrictSaga";
import WardSaga from "./WardSaga";
import EmployeeSaga from "./EmployeeSaga";

export default function* rootSaga() {
  yield all([
    // employeeWatcher(),
    provinceSaga(),
    DistrictSaga(),
    WardSaga(),
    EmployeeSaga(),
    // districtWatcher(),
    // wardWatcher(),
  ]);
}
