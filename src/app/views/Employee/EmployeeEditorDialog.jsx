import React, { useState, useRef, useEffect } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Draggable from "react-draggable";
import Paper from "@material-ui/core/Paper";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  Button,
  Grid,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  DialogActions,
  Icon,
  IconButton,
  Tab,
  Tabs,
  Box,
  Divider,
} from "@material-ui/core";

import { employeeActions } from "app/redux/actions/EmployeeActions";
import Certificate from "./Certificate";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const EmployeeEditorDialog = ({ open, close, updateEmployee }) => {
  const { t } = useTranslation();
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const [employee, setEmployee] = useState(null);
  const [tabValue, setTabValue] = useState("one");

  const { provinces, districts, wards } = useSelector(
    (state) => state.employee
  );

  useEffect(() => {
    if (updateEmployee) {
      setEmployee(updateEmployee);
    }
  }, [updateEmployee]);

  useEffect(() => {
    dispatch(employeeActions.getProvinces());
  }, [dispatch]);

  useEffect(() => {
    dispatch(employeeActions.getDistricts(employee?.provinceId));
  }, [dispatch, employee?.provinceId]);

  useEffect(() => {
    dispatch(employeeActions.getWards(employee?.districtId));
  }, [dispatch, employee?.districtId]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "provinceId") {
      setEmployee((prevState) => ({
        ...prevState,
        [name]: value,
        districtId: "",
        wardsId: "",
      }));
    } else {
      setEmployee((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = () => {
    if (updateEmployee.id) {
      dispatch(employeeActions.update(employee));
    } else {
      dispatch(employeeActions.create(employee));
    }
    close();
  };

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Dialog
      open={open}
      PaperComponent={PaperComponent}
      maxWidth={"md"}
      fullWidth={true}
    >
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        {updateEmployee.id ? (
          <span className="styleColor">{t("Chỉnh sửa nhân viên")}</span>
        ) : (
          <span className="styleColor">{t("Thêm mới nhân viên")}</span>
        )}
        <IconButton
          style={{ position: "absolute", right: "10px", top: "10px" }}
          onClick={close}
        >
          <Icon color="error" title={t("close")}>
            close
          </Icon>
        </IconButton>
      </DialogTitle>
      <Box className="w-100">
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          aria-label="wrapped label tabs example"
          variant="fullWidth"
          indicatorColor="primary"
        >
          <Tab className="w-100 ml-24" value="one" label="Thông tin" />
          <Tab className="w-100 mr-24" value="two" label="Chứng chỉ" />
        </Tabs>
        <Divider className="mr-24 ml-24" />
      </Box>
      {tabValue === "one" && (
        <ValidatorForm
          ref={formRef}
          onSubmit={handleSubmit}
          style={{
            // overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextValidator
                  className="w-100"
                  label={
                    <span className="font">
                      <span style={{ color: "red" }}> * </span>
                      {t("staff.code")}
                    </span>
                  }
                  onChange={handleChange}
                  type="text"
                  name="code"
                  value={employee?.code || ""}
                  validators={["required", "matchRegexp:^.{6,10}$"]}
                  errorMessages={[
                    t("general.errorMessages_required"),
                    t("general.errorMessages_code_valid"),
                  ]}
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
                      {t("staff.name")}
                    </span>
                  }
                  onChange={handleChange}
                  type="text"
                  name="name"
                  value={employee?.name || ""}
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
                      {t("Tuổi")}
                    </span>
                  }
                  onChange={handleChange}
                  type="text"
                  name="age"
                  value={employee?.age || ""}
                  validators={["required", "matchRegexp:^\\d+$"]}
                  errorMessages={[
                    t("general.errorMessages_required"),
                    t("general.errorMessages_age"),
                  ]}
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
                      {t("staff.phoneNumber")}
                    </span>
                  }
                  onChange={handleChange}
                  type="text"
                  name="phone"
                  value={employee?.phone || ""}
                  validators={["required", "matchRegexp:^\\d{10}$"]}
                  errorMessages={[
                    t("general.errorMessages_required"),
                    t("general.errorMessages_phone"),
                  ]}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextValidator
                  className="w-100"
                  label={
                    <span className="font">
                      <span style={{ color: "red" }}> * </span>
                      {t("staff.email")}
                    </span>
                  }
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                  type="email"
                  name="email"
                  value={employee?.email || ""}
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    t("general.errorMessages_required"),
                    t("general.errorMessages_email_valid"),
                  ]}
                  variant="outlined"
                  size="small"
                />
              </Grid>

              {/* address */}
              <Grid item lg={4} md={4} xs={12} sm={6}>
                <FormControl fullWidth={true} variant="outlined" size="small">
                  <InputLabel style={{ backgroundColor: "white" }}>
                    {
                      <span className="font">
                        <span style={{ color: "red" }}> * </span>
                        {t("Tỉnh")}
                      </span>
                    }
                  </InputLabel>
                  <Select
                    id="province-select"
                    onChange={handleChange}
                    name="provinceId"
                    value={employee?.provinceId || ""}
                  >
                    {provinces.map((province) => (
                      <MenuItem key={province.id} value={province.id}>
                        {province.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item lg={4} md={4} xs={12} sm={6}>
                <FormControl fullWidth={true} variant="outlined" size="small">
                  <InputLabel style={{ backgroundColor: "white" }}>
                    {
                      <span className="font">
                        <span style={{ color: "red" }}> * </span>
                        {t("Huyện")}
                      </span>
                    }
                  </InputLabel>
                  <Select
                    id="district-select"
                    onChange={handleChange}
                    name="districtId"
                    value={employee?.districtId || ""}
                  >
                    {districts.map((district) => (
                      <MenuItem key={district.id} value={district.id}>
                        {district.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item lg={4} md={4} xs={12} sm={6}>
                <FormControl fullWidth={true} variant="outlined" size="small">
                  <InputLabel style={{ backgroundColor: "white" }}>
                    {
                      <span className="font">
                        <span style={{ color: "red" }}> * </span>
                        {t("Phường")}
                      </span>
                    }
                  </InputLabel>
                  <Select
                    id="ward-select"
                    onChange={handleChange}
                    name="wardsId"
                    value={employee?.wardsId || ""}
                  >
                    {wards.map((ward) => (
                      <MenuItem key={ward.id} value={ward.id}>
                        {ward.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <Divider className="mt-8 mb-8 mr-24 ml-24" />
          <DialogActions spacing={4} className="flex flex-end mr-16 mb-8">
            <Button variant="contained" color="secondary" onClick={close}>
              {t("Cancel")}
            </Button>
            <Button
              // disabled={isView}
              variant="contained"
              color="primary"
              type="submit"
            >
              {t("Save")}
            </Button>
          </DialogActions>
        </ValidatorForm>
      )}
      {tabValue === "two" && (
        <Certificate provinces={provinces} updateEmployee={updateEmployee} />
      )}
    </Dialog>
  );
};

export default EmployeeEditorDialog;
