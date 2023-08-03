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
import { useDispatch, useSelector } from "react-redux";
import { provinceActions } from "app/redux/actions/ProvinceActions";
import { forwardRef } from "react";
import ProvinceEditorDialog from "./ProvinceEditorDialog";

toast.configure({
  autoClose: 1000,
  draggable: false,
  limit: 3,
});

function Province() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [openDialogProvince, setOpenDialogProvince] = useState(false);

  const provinces = useSelector((state) => state.province.provinces);

  useEffect(() => {
    dispatch(provinceActions.getAll());
  }, []);

  const columns = [
    {
      title: t("Action"),
      field: "custom",
      align: "center",
      width: "4%",
      render: (data) => {
        return (
          <div>
            <IconButton>
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
      title: t("Tinh"),
      field: "code",
      align: "left",
      width: "5%",
    },
    {
      title: t("Dien tich"),
      field: "name",
      align: "left",
      width: "5%",
    },
  ];

  const handleCreateProvince = () => {
    setOpenDialogProvince(true);
  };

  const handleCloseDialogProvince = () => {
    setOpenDialogProvince(false);
  };

  return (
    <div className="m-sm-30">
      <Grid lg={4} md={4}>
        <Grid container spacing={3}>
          <Grid item lg={7} md={7} sm={12} xs={12}>
            <Button
              onClick={handleCreateProvince}
              className="mb-16 mr-16"
              variant="contained"
              color="primary"
            >
              {t("Add")}
            </Button>
          </Grid>
          <Grid item lg={5} md={5} sm={12} xs={12}>
            <Input
              label={t("EnterSearch")}
              type="text"
              name="keyword"
              className="w-100 mb-16 mr-10 stylePlaceholder"
              id="search_box"
              placeholder={t("Tìm kiếm")}
              startAdornment={
                <InputAdornment>
                  <Link to="#">
                    <SearchIcon
                      style={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                      }}
                    />
                  </Link>
                </InputAdornment>
              }
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <MaterialTable
            data={provinces || []}
            columns={columns}
            options={{
              selection: false,
              actionsColumnIndex: -1,
              search: false,
              rowStyle: (rowData, index) => ({
                backgroundColor: index % 2 === 1 ? "#EEE" : "#FFF",
              }),
              maxBodyHeight: "450px",
              minBodyHeight: "370px",
              headerStyle: {
                backgroundColor: "#358600",
                color: "#fff",
              },
              padding: "dense",
              toolbar: false,
            }}
            localization={{
              body: {
                emptyDataSourceMessage: `${t("general.emptyDataMessageTable")}`,
              },
            }}
          />
        </Grid>
      </Grid>

      {openDialogProvince && (
        <ProvinceEditorDialog
          open={openDialogProvince}
          close={handleCloseDialogProvince}
          // handleChangeEmployee={handleChangeEmployee}
          // editEmployee={editEmployee}
        />
      )}
    </div>
  );
  // });
}
export default Province;
