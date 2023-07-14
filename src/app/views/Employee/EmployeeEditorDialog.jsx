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

const EmployeeEditorDialog = ({ open, onClose, editData }) => {
  const { t } = useTranslation();

  const formRef = useRef(null);

  const handleFormSubmit = () => {
    console.log("hi");
  };

  return (
    <Dialog
      open={open}
      // onCloseee={onClose}
      PaperComponent={PaperComponent}
      maxWidth={"md"}
      fullWidth={true}
    >
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        <span className="mb-20 styleColor">{t("Add")}</span>
        <IconButton
          style={{ position: "absolute", right: "10px", top: "10px" }}
          // onClick={() => handleClose()}
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
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <TextValidator
                className="w-100"
                label={
                  <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    {t("staff.firstName")}
                  </span>
                }
                // onChange={(value) => this.handleChange(value, "firstName")}
                type="text"
                // name="firstName"
                // value={firstName}
                validators={["required"]}
                errorMessages={[t("general.errorMessages_required")]}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <TextValidator
                className="w-100"
                label={
                  <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    {t("staff.lastName")}
                  </span>
                }
                // onChange={(value) => this.handleChange(value, "lastName")}
                type="text"
                name="lastName"
                // value={lastName}
                validators={["required"]}
                errorMessages={[t("general.errorMessages_required")]}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item lg={5} md={5} sm={12} xs={12}>
              <TextValidator
                disabled={true}
                className="w-100"
                label={<span className="font">{t("staff.displayName")}</span>}
                type="text"
                name="displayName"
                // value={displayName}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <TextValidator
                className="w-100"
                // label={<span><span style={{ color: "red" }}> * </span>
                //     {t("general.phoneNumber")}
                //     </span>}
                label={<span className="font">{t("staff.phoneNumber")}</span>}
                // onChange={this.handleChange}
                type="text"
                name="phoneNumber"
                // value={phoneNumber}
                validators={["isNumber"]}
                errorMessages={[t("general.isNumber")]}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item lg={5} md={5} sm={12} xs={12}>
              <TextValidator
                className="w-100"
                label={<span className="font">{t("staff.idNumber")}</span>}
                // onChange={this.handleChange}
                type="text"
                name="idNumber"
                // value={idNumber}
                validators={["isNumber"]}
                errorMessages={[t("general.errorMessages_required")]}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <TextValidator
                className="w-100"
                // label={<span><span style={{ color: "red" }}> * </span>
                //     {t("general.email")}
                //     </span>}
                label={<span className="font">{t("staff.email")}</span>}
                // onChange={this.handleChange}
                placeholder="example@gmail.com"
                type="email"
                name="email"
                // value={email}
                validators={["isEmail"]}
                errorMessages={[t("general.errorMessages_email_valid")]}
                variant="outlined"
                size="small"
              />
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
