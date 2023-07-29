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

toast.configure({
  autoClose: 1000,
  draggable: false,
  limit: 3,
});

const Address = () => {
  const { t } = useTranslation();

  const [searchInputValue, setSearchInputValue] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialogEmployee, setOpenDialogEmployee] = useState(false);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCLoseDialogEmployee = () => {
    setOpenDialogEmployee(false);
  };

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
      <Grid
        container
        justifyContent="space-between"
        // spacing={3}
        lg={4}
        md={4}
        sm={12}
        xs={12}
      >
        <Grid item lg={7} md={7} sm={12} xs={12}>
          <Button
            className="mb-16 mr-16"
            variant="contained"
            color="primary"
            // onClick={handleAddEmployee}
          >
            {t("Add")}
          </Button>
        </Grid>
        <Grid item lg={5} md={5} sm={12} xs={12}>
          <Input
            label={t("EnterSearch")}
            type="text"
            name="keyword"
            // value={searchInputValue}
            // onChange={(e) => setSearchInputValue(e.target.value)}
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

      <Grid item lg={4} md={4} xs={12}>
        <MaterialTable
          // data={listEmployees.slice(
          //   page * rowsPerPage,
          //   page * rowsPerPage + rowsPerPage
          // )}
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
            pageSize: 5,
            pageSizeOptions: [1, 2, 3, 5, 10, 25, 50, 100],
          }}
          localization={{
            body: {
              emptyDataSourceMessage: `${t("general.emptyDataMessageTable")}`,
            },
            pagination: {
              labelRowsSelect: "bản ghi",
              labelDisplayedRows: "{from}-{to} trong {count}",
            },
          }}
        />
        {/* <TablePagination
          component="div"
          // count={listEmployees.length}
          count={6}
          page={0}
          rowsPerPage={5}
          // onChangePage={handleChangePage}
          // onChangeRowsPerPage={handleChangeRowsPerPage}
          rowsPerPageOptions={[1, 3, 5, 10, 25]}
          labelRowsPerPage={false}
        /> */}
      </Grid>

      {/* {openDialogEmployee && (
        <EmployeeEditorDialog
          open={openDialogEmployee}
          onClose={handleCLoseDialogEmployee}
          handleChangeEmployee={handleChangeEmployee}
          editEmployee={editEmployee}
        />
      )} */}
    </div>
  );
};

export default Address;
