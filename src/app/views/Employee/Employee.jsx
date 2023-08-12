import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Breadcrumb, ConfirmationDialog } from "egret";
import { useTranslation } from "react-i18next";
import {
  Grid,
  IconButton,
  Icon,
  Button,
  InputAdornment,
  Input,
  TablePagination,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";

import { employeeActions } from "app/redux/actions/EmployeeActions";
import EmployeeEditorDialog from "./EmployeeEditorDialog";
import { useDispatch, useSelector } from "react-redux";

const Employee = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { employees } = useSelector((state) => state.employee);

  const [openDialogEmployee, setOpenDialogEmployee] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [updateEmployee, setUpdateEmployee] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const columns = [
    {
      title: t("Action"),
      field: "custom",
      align: "center",
      width: "4%",
      render: (data) => {
        return (
          <div>
            <IconButton onClick={() => handleUpdateEmployee(data)}>
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
      title: t("Tuổi"),
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
    dispatch(employeeActions.getAll());
  }, [dispatch]);

  useEffect(() => {
    dispatch(employeeActions.search({ keyword: searchInputValue }));
  }, [dispatch, searchInputValue]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCreateEmployee = () => {
    setUpdateEmployee({});
    setIsUpdating(false);
    setOpenDialogEmployee(true);
  };

  const handleCloseDialogEmployee = () => {
    setOpenDialogEmployee(false);
  };

  const handleDeleteEmployee = (id) => {
    setOpenDialogDelete(true);
    setDeleteId(id);
  };

  const confirmDelete = () => {
    console.log(deleteId);
    dispatch(employeeActions.delete(deleteId));
    setOpenDialogDelete(false);
  };

  const handleDialogCLose = () => {
    setOpenDialogDelete(false);
  };

  const handleUpdateEmployee = (data) => {
    setUpdateEmployee(data);
    setIsUpdating(true);
    setOpenDialogEmployee(true);
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
            onClick={handleCreateEmployee}
          >
            {t("Add")}
          </Button>
          <Button className="mb-16 mr-36" variant="contained" color="primary">
            {t("general.exportToExcel")}
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
          data={employees.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
          )}
          columns={columns}
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
          count={employees.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          rowsPerPageOptions={[1, 3, 5, 10, 25]}
          labelRowsPerPage={t("general.rows_per_page")}
        />
      </Grid>

      {openDialogDelete && (
        <ConfirmationDialog
          title={"Xóa nhân viên"}
          open={openDialogDelete}
          onYesClick={confirmDelete}
          onConfirmDialogClose={handleDialogCLose}
          text={"Bạn có đồng ý xóa nhân viên này không"}
          Yes="Đồng ý"
          No="Không"
        />
      )}

      {openDialogEmployee && (
        <EmployeeEditorDialog
          open={openDialogEmployee}
          close={handleCloseDialogEmployee}
          updateEmployee={updateEmployee}
          isUpdating={isUpdating}
        />
      )}
    </div>
  );
};

export default Employee;
