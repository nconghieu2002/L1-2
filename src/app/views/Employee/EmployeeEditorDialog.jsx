import React, { useState, useRef, useEffect, useCallback } from "react";
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
  TextField,
} from "@material-ui/core";

import MaterialTable, {
  MTableToolbar,
  Chip,
  MTableBody,
  MTableHeader,
} from "material-table";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Draggable from "react-draggable";
import Paper from "@material-ui/core/Paper";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { toast } from "react-toastify";
import {
  addEmployee,
  getWardsByDistricts,
  getDistrictsByProvinces,
  getProvinces,
  updateEmployee,
  saveEmployee,
  getAllDistricts,
} from "./EmployeeService";
import { useTranslation } from "react-i18next";

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

const EmployeeEditorDialog = ({
  open,
  onClose,
  handleChangeEmployee,
  editEmployee,
}) => {
  const { t } = useTranslation();

  const formRef = useRef(null);

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [employee, setEmployee] = useState({
    name: "",
    age: "",
    code: "",
    phone: "",
    email: "",
    provinceId: "",
    districtId: "",
    wardsId: "",
  });

  useEffect(() => {
    if (editEmployee) {
      setEmployee({
        ...editEmployee,
      });
    }
  }, [editEmployee]);

  useEffect(() => {
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (open && employee.provinceId !== "") {
      fetchDistricts(employee.provinceId); // Gọi hàm để lấy danh sách huyện khi mở form và provinceId đã có giá trị
    }
  }, [open, employee.provinceId]);

  useEffect(() => {
    if (open && employee.districtId !== "") {
      fetchWards(employee.districtId); // Gọi hàm để lấy danh sách xã khi mở form và districtId đã có giá trị
    }
  }, [open, employee.districtId]);

  const fetchProvinces = async () => {
    try {
      const response = await getProvinces();
      setProvinces(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDistricts = async (id) => {
    try {
      const response = await getDistrictsByProvinces(id);
      setDistricts(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWards = async (id) => {
    try {
      const response = await getWardsByDistricts(id);
      setWards(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "provinceId") {
      fetchDistricts(value); // Gọi hàm để lấy danh sách huyện khi tỉnh thay đổi
      console.log(employee);
      setEmployee((prevState) => ({ ...prevState, districtId: "" })); // Xóa giá trị districtId để tránh hiển thị lựa chọn không hợp lệ khi tỉnh thay đổi
      setEmployee((prevState) => ({ ...prevState, wardsId: "" })); // Xóa giá trị wardsId khi tỉnh thay đổi (nếu không có hàm này, giá trị wardsId của huyện trước đó vẫn còn)
    } else if (name === "districtId") {
      fetchWards(value); // Gọi hàm để lấy danh sách xã khi huyện thay đổi
      setEmployee((prevState) => ({ ...prevState, wardsId: "" })); // Xóa giá trị wardsId khi tỉnh thay đổi (nếu không có hàm này, giá trị wardsId của huyện trước đó vẫn còn)
    }

    setEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(employee);
      const response = await saveEmployee(employee);
      onClose();
      handleChangeEmployee();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      open={open}
      PaperComponent={PaperComponent}
      maxWidth={"md"}
      fullWidth={true}
    >
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        <span className="mb-20 styleColor">{t("Add")}</span>
        <IconButton
          style={{ position: "absolute", right: "10px", top: "10px" }}
          onClick={onClose}
        >
          <Icon color="error" title={t("close")}>
            close
          </Icon>
        </IconButton>
      </DialogTitle>
      <ValidatorForm
        ref={formRef}
        onSubmit={handleFormSubmit}
        style={{
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item lg={2} md={2} sm={12} xs={12}>
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
                value={employee.code}
                validators={["isNumber"]}
                errorMessages={[t("staff.errorMessages_required")]}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item lg={5} md={5} sm={12} xs={12}>
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
                value={employee.name}
                // validators={["required"]}
                errorMessages={[t("staff.errorMessages_required")]}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item lg={2} md={2} sm={12} xs={12}>
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
                value={employee.age}
                validators={["isNumber"]}
                errorMessages={[t("general.errorMessages_required")]}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item lg={5} md={5} sm={12} xs={12}>
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
                value={employee.phone}
                validators={["isNumber"]}
                errorMessages={[t("general.isNumber")]}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item lg={5} md={5} sm={12} xs={12}>
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
                value={employee.email}
                validators={["isEmail"]}
                errorMessages={[t("general.errorMessages_email_valid")]}
                variant="outlined"
                size="small"
              />
            </Grid>

            {/* address */}
            <Grid item lg={4} md={4} xs={12} sm={6}>
              <FormControl fullWidth={true} variant="outlined" size="small">
                <InputLabel style={{ backgroundColor: "white" }}>
                  {<span className="font">{t("Tỉnh")}</span>}
                </InputLabel>
                <Select
                  id="province-select"
                  onChange={handleChange}
                  name="provinceId"
                  value={employee.provinceId}
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
                  {<span className="font">{t("Huyện")}</span>}
                </InputLabel>
                <Select
                  id="district-select"
                  onChange={handleChange}
                  name="districtId"
                  value={employee.districtId}
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
                  {<span className="font">{t("Phường/Xã")}</span>}
                </InputLabel>
                <Select
                  id="ward-select"
                  onChange={handleChange}
                  name="wardsId"
                  value={employee.wardsId}
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

        <DialogActions spacing={4} className="flex flex-end flex-middle">
          <Button variant="contained" color="secondary" onClick={onClose}>
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
    </Dialog>
  );
};

export default EmployeeEditorDialog;
