import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import UserReducer from "./UserReducer";
import LayoutReducer from "./LayoutReducer";
import ScrumBoardReducer from "./ScrumBoardReducer";
import NotificationReducer from "./NotificationReducer";
import EcommerceReducer from "./EcommerceReducer";
import ProvinceReducer from "./ProvinceReducer";
import DistrictReducer from "./DistrictReducer";
import WardReducer from "./WardReducer";
import EmployeeReducer from "./EmployeeReducer";

const RootReducer = combineReducers({
  login: LoginReducer,
  user: UserReducer,
  layout: LayoutReducer,
  scrumboard: ScrumBoardReducer,
  notification: NotificationReducer,
  ecommerce: EcommerceReducer,
  province: ProvinceReducer,
  district: DistrictReducer,
  ward: WardReducer,
  employee: EmployeeReducer,
});

export default RootReducer;
