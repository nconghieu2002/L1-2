import React from "react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DialogContent from "@material-ui/core/DialogContent";
import MaterialTable from "material-table";

import {
  Button,
  Grid,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  DialogActions,
  Divider,
  IconButton,
  Icon,
} from "@material-ui/core";

function Certificate({ provinces, updateEmployee }) {
  const { t } = useTranslation();
  const formRef = useRef(null);

  const columns = [
    {
      title: t("Thao tác"),
      field: "custom",
      align: "center",
      width: "4%",
      render: (data) => {
        return (
          <div>
            <IconButton onClick={() => handleUpdateEmployee(data)}>
              <Icon color="primary">edit</Icon>
            </IconButton>
            <IconButton>
              <Icon style={{ color: "red" }}>delete</Icon>
            </IconButton>
          </div>
        );
      },
    },
    {
      title: t("Mã chứng chỉ"),
      field: "code",
      align: "left",
      width: "5%",
    },
    {
      title: t("Tên chứng chỉ"),
      field: "name",
      align: "left",
      width: "5%",
    },
    {
      title: t("Nơi cấp"),
      field: "address",
      align: "left",
      width: "5%",
    },
    {
      title: t("Ngày cấp"),
      field: "dateStart",
      align: "left",
      width: "5%",
    },
    {
      title: t("Ngày hết hạn"),
      field: "dateEnd",
      align: "left",
      width: "5%",
    },
  ];

  const handleUpdateEmployee = (data) => {
    console.log(data);
  };

  return (
    <ValidatorForm
      ref={formRef}
      //   onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <DialogContent style={{ overflow: "hidden" }}>
        <Grid container spacing={2}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextValidator
              className="w-100"
              label={
                <span className="font">
                  <span style={{ color: "red" }}> * </span>
                  {t("Tên chứng chỉ")}
                </span>
              }
              //   onChange={handleChange}
              type="text"
              name="name"
              //   value={employee?.code || ""}
              validators={["required"]}
              errorMessages={[t("general.errorMessages_required")]}
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextValidator
              className="w-100"
              label={
                <span className="font">
                  <span style={{ color: "red" }}> * </span>
                  {t("Mã chứng chỉ")}
                </span>
              }
              //   onChange={handleChange}
              type="text"
              name="code"
              //   value={employee?.code || ""}
              validators={["required"]}
              errorMessages={[t("general.errorMessages_required")]}
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item lg={4} md={4} xs={12} sm={6}>
            <FormControl fullWidth={true} variant="outlined" size="small">
              <InputLabel style={{ backgroundColor: "white" }}>
                {
                  <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    {t("Nơi cấp")}
                  </span>
                }
              </InputLabel>
              <Select
                id="province-select"
                // onChange={handleChange}
                name="provinceId"
                // value={employee?.provinceId || ""}
              >
                {provinces.map((province) => (
                  <MenuItem key={province.id} value={province.id}>
                    {province.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <TextValidator
              className="w-100"
              label={
                <span className="font">
                  <span style={{ color: "red" }}> * </span>
                  {t("Ngày cấp")}
                </span>
              }
              //   onChange={handleChange}
              type="date"
              name="dateStart"
              //   value={employee?.code || ""}
              validators={["required"]}
              errorMessages={[t("general.errorMessages_required")]}
              variant="outlined"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <TextValidator
              className="w-100"
              label={
                <span className="font">
                  <span style={{ color: "red" }}> * </span>
                  {t("Ngày hết hạn")}
                </span>
              }
              //   onChange={handleChange}
              type="date"
              name="dateEnd"
              //   value={employee?.code || ""}
              validators={["required"]}
              errorMessages={[t("general.errorMessages_required")]}
              variant="outlined"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <div className="mr-24 ml-24">
        <Grid>
          <Grid className="flex flex-end mt-4 mb-20">
            <Button
              variant="contained"
              color="primary"
              // onClick={handleCreateEmployee}
            >
              {t("Add")}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <MaterialTable
              // data={updateEmployee}
              columns={columns}
              options={{
                selection: false,
                actionsColumnIndex: -1,
                paging: false,
                search: false,
                headerStyle: {
                  backgroundColor: "#358600",
                  color: "#fff",
                },
                padding: "dense",
                toolbar: false,
              }}
              localization={{
                body: {
                  emptyDataSourceMessage: `${t(
                    "general.emptyDataMessageTable"
                  )}`,
                },
              }}
            />
          </Grid>
        </Grid>
      </div>

      <DialogActions spacing={4} className="flex flex-end mr-16 mb-8 mt-4">
        <Button variant="contained" color="secondary">
          {t("Hủy")}
        </Button>
        <Button
          // disabled={isView}
          variant="contained"
          color="primary"
          type="submit"
        >
          {t("Lưu")}
        </Button>
      </DialogActions>
    </ValidatorForm>
  );
}

export default Certificate;
