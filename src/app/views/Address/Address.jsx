import React from "react";
import { Breadcrumb } from "egret";
import { useTranslation } from "react-i18next";
import { Grid } from "@material-ui/core";
import { toast } from "react-toastify";

import Province from "./Province/Province";
import District from "./District/District";

toast.configure({
  autoClose: 1000,
  draggable: false,
  limit: 3,
});

const Address = () => {
  const { t } = useTranslation();

  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: t("Dashboard.manage"), path: "/directory/apartment" },
            { name: t("Quản lý địa điểm") },
          ]}
        />
      </div>
      <Grid container spacing={4}>
        <Grid item lg={4}>
          <Province />
        </Grid>
        <Grid item lg={4}>
          <District />
        </Grid>
      </Grid>
    </div>
  );
};

export default Address;
