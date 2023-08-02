import React, { useState, useEffect } from "react";
import { Breadcrumb, ConfirmationDialog } from "egret";
import { useTranslation } from "react-i18next";
import {
  Grid,
  IconButton,
  Icon,
  Button,
  TextField,
  InputAdornment,
  Input,
  MuiThemeProvider,
  TableHead,
  TableCell,
  TableRow,
  Checkbox,
  TablePagination,
  Dialog,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  DialogActions,
  Link,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

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
import { saveAs } from "file-saver";

import Province from "./Province/Province";

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
      <Province />
    </div>
  );
};

export default Address;
