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
import {
  ValidatorForm,
  TextValidator,
  // TextField,
} from "react-material-ui-form-validator";

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

const EmployeeEditorDialog = ({ open, onClose, handleChangeEmployee }) => {
  const { t } = useTranslation();

  const formRef = useRef(null);

  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [age, setAge] = useState();
  const [idNumber, setIdNumber] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState();
  const [provinces, setProvinces] = useState([]);
  const [provinceId, setProvinceId] = useState("");
  const [districts, setDistricts] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [wards, setWards] = useState([]);
  const [wardId, setWardId] = useState("");
  // const [employeeData, setEmployeeData] = useState({
  //   provinceId: "",
  //   provinceList: [],
  //   districtId: "",
  //   districtList: [],
  //   wardsId: "",
  //   wardList: [],
  // });

  useEffect(() => {
    fetchProvinces();
  }, []);

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
      setDistrictId(""); // Reset giá trị huyện khi thay đổi tỉnh
      setWardId(""); // Reset giá trị phường/ xã khi thay đổi tỉnh
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWards = async (id) => {
    try {
      const response = await getWardsByDistricts(id);
      setWards(response.data.data);
      setWardId(""); // Reset giá trị phường/ xã khi thay đổi huyện
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "lastName":
        setLastName(value);
        break;
      case "firstName":
        setFirstName(value);
        break;
      case "age":
        setAge(value);
        break;
      case "idNumber":
        setIdNumber(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "provinceId":
        setProvinceId(value);
        fetchDistricts(value);
        break;
      case "districtId":
        setDistrictId(value);
        fetchWards(value);
        break;
      case "wardId":
        setWardId(value);
        break;
      default:
        break;
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const employee = {
      name: lastName + " " + firstName,
      age,
      code: idNumber,
      phone: phoneNumber,
      email,
      provinceId,
      districtId,
      wardsId: wardId,
    };

    try {
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
                name="idNumber"
                value={idNumber}
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
                    {t("staff.lastName")}
                  </span>
                }
                onChange={handleChange}
                type="text"
                name="lastName"
                value={lastName}
                // validators={["required"]}
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
                    {t("staff.firstName")}
                  </span>
                }
                value={firstName}
                onChange={handleChange}
                type="text"
                name="firstName"
                validators={["required"]}
                errorMessages={[t("general.errorMessages_email_valid")]}
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
                value={age}
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
                name="phoneNumber"
                value={phoneNumber}
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
                value={email}
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
                  value={provinceId}
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
                  value={districtId}
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
                  name="wardId"
                  value={wardId}
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
