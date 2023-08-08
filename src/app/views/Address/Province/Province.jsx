import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ConfirmationDialog } from "egret";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import {
  Grid,
  IconButton,
  Icon,
  Button,
  InputAdornment,
  Input,
  Link,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MaterialTable from "material-table";

import { provinceActions } from "app/redux/actions/ProvinceActions";
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
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [updateProvince, setUpdateProvince] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");

  const provinces = useSelector((state) => state.province.provinces);

  useEffect(() => {
    dispatch(provinceActions.getAll());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(provinceActions.search());

  // })

  const columns = [
    {
      title: t("Action"),
      field: "custom",
      align: "center",
      width: "4%",
      render: (data) => {
        return (
          <div>
            <IconButton onClick={() => handleUpdateProvince(data)}>
              <Icon color="primary">edit</Icon>
            </IconButton>
            <IconButton onClick={() => handleDeleteProvince(data.id)}>
              <Icon style={{ color: "red" }}>delete</Icon>
            </IconButton>
          </div>
        );
      },
    },
    {
      title: t("Tinh"),
      field: "name",
      align: "left",
      width: "5%",
    },
    {
      title: t("Dien tich"),
      field: "area",
      align: "left",
      width: "5%",
    },
  ];

  const handleCreateProvince = () => {
    setUpdateProvince({});
    setIsUpdating(false);
    setOpenDialogProvince(true);
  };

  const handleCloseDialogProvince = () => {
    setOpenDialogProvince(false);
  };

  const handleDeleteProvince = (id) => {
    setOpenDialogDelete(true);
    setDeleteId(id);
  };

  const confirmDelete = () => {
    console.log(deleteId);
    dispatch(provinceActions.delete(deleteId));
    setOpenDialogDelete(false);
  };

  const handleDialogCLose = () => {
    setOpenDialogDelete(false);
  };

  const handleUpdateProvince = (data) => {
    setUpdateProvince(data);
    setIsUpdating(true);
    setOpenDialogProvince(true);
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
              value={searchInputValue}
              onChange={(e) => setSearchInputValue(e.target.value)}
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

      {openDialogDelete && (
        <ConfirmationDialog
          title={"Xóa tỉnh"}
          open={openDialogDelete}
          onYesClick={confirmDelete}
          onConfirmDialogClose={handleDialogCLose}
          text={"Bạn có đồng ý xóa tỉnh này không"}
          Yes="Đồng ý"
          No="Không"
        />
      )}

      {openDialogProvince && (
        <ProvinceEditorDialog
          open={openDialogProvince}
          close={handleCloseDialogProvince}
          updateProvince={updateProvince}
          isUpdating={isUpdating}
        />
      )}
    </div>
  );
  // });
}
export default Province;
