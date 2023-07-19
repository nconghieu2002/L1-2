import React, { useState, useEffect } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
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
} from "@material-ui/core";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import EmployeeEditorDialog from "./EmployeeEditorDialog";
import {
  deleteEmployee,
  exportEmployee,
  getAll,
  searchByPage,
  saveEmployee,
} from "./EmployeeService";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";

toast.configure({
  autoClose: 1000,
  draggable: false,
  limit: 3,
});

const Employee = () => {
  const { t } = useTranslation();

  const [listEmployees, setListEmployees] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialogEmployee, setOpenDialogEmployee] = useState(false);

  const [changeEmployee, setChangeEmployee] = useState(false);

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
            <IconButton onClick={() => handleDeleteEmployee(data.id)}>
              <Icon style={{ color: "red" }}>delete</Icon>
            </IconButton>
          </div>
        );
      },
    },
    {
      title: t("staff.code"),
      field: "code",
      align: "left",
      width: "5%",
    },
    {
      title: t("staff.name"),
      field: "name",
      align: "left",
      width: "5%",
    },
    {
      title: t("staff.birthDate"),
      field: "age",
      align: "left",
      width: "5%",
    },
    {
      title: t("staff.phoneNumber"),
      field: "phone",
      align: "left",
      width: "5%",
    },
    {
      title: t("staff.email"),
      field: "email",
      align: "left",
      width: "5%",
    },
  ];

  useEffect(() => {
    fetchData();
  }, [searchInputValue, changeEmployee]);

  const fetchData = async () => {
    try {
      const response = await searchByPage({ keyword: searchInputValue });
      setListEmployees(response?.data?.data?.content);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      const response = await deleteEmployee(id);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialogEmployee = () => {
    setOpenDialogEmployee(true);
  };

  const handleCLoseDialogEmployee = () => {
    setOpenDialogEmployee(false);
  };

  const handleChangeEmployee = () => {
    setChangeEmployee(!changeEmployee);
  };

  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: t("Dashboard.manage"), path: "/directory/apartment" },
            { name: t("Nhân viên") },
          ]}
        />
      </div>
      <Grid container spacing={3}>
        <Grid item lg={7} md={7} sm={12} xs={12}>
          <Button
            className="mb-16 mr-16"
            variant="contained"
            color="primary"
            onClick={handleOpenDialogEmployee}
          >
            {t("Add")}
          </Button>
          <Button className="mb-16 mr-36" variant="contained" color="primary">
            {t("Export")}
          </Button>
        </Grid>
        <Grid item lg={5} md={5} sm={12} xs={12}>
          <Input
            label={t("EnterSearch")}
            type="text"
            name="keyword"
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value)}
            className="w-100 mb-16 mr-10 stylePlaceholder"
            id="search_box"
            placeholder={t("general.enterSearch")}
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
          // title={t("personnel.list")}
          data={listEmployees.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
          )}
          columns={columns}
          // parentChildData={(row, rows) => {
          //   var list = rows.find((a) => a.id === row.parentId);
          //   return list;
          // }}
          options={{
            selection: false,
            actionsColumnIndex: -1,
            paging: false,
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
        <TablePagination
          component="div"
          count={listEmployees.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          rowsPerPageOptions={[1, 3, 5, 10, 25]}
          labelRowsPerPage={t("general.rows_per_page")}
        />
      </Grid>

      {openDialogEmployee && (
        <EmployeeEditorDialog
          open={openDialogEmployee}
          onClose={handleCLoseDialogEmployee}
          handleChangeEmployee={handleChangeEmployee}
        />
      )}
    </div>
  );
};

export default Employee;
