import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { useTranslation, withTranslation, Trans } from "react-i18next";
const Address = EgretLoadable({
  loader: () => import("./Address"),
});
const ViewComponent = withTranslation()(Address);

const AddressRoutes = [
  {
    path: ConstantList.ROOT_PATH + "dashboard/address",
    exact: true,
    component: ViewComponent,
  },
];

export default AddressRoutes;
