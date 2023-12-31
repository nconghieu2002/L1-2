import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ConfirmationDialog } from "egret";
import { useTranslation } from "react-i18next";
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

function Province() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { provinces } = useSelector((state) => state.province);

  const [openDialogProvince, setOpenDialogProvince] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [updateProvince, setUpdateProvince] = useState({});
  const [searchInputValue, setSearchInputValue] = useState("");
  const columns = [
    {
      title: t("Thao tác"),
      field: "custom",
      align: "center",
      width: "5%",
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
      title: t("Tỉnh"),
      field: "name",
      align: "left",
      width: "5%",
    },
    {
      title: t("Diện tích"),
      field: "area",
      align: "left",
      width: "5%",
    },
  ];

  useEffect(() => {
    dispatch(provinceActions.getAll());
  }, [dispatch]);

  useEffect(() => {
    dispatch(provinceActions.search({ keyword: searchInputValue }));
  }, [dispatch, searchInputValue]);

  const handleCreateProvince = () => {
    setUpdateProvince({});
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
    dispatch(provinceActions.delete(deleteId));
    setOpenDialogDelete(false);
  };

  const handleDialogCLose = () => {
    setOpenDialogDelete(false);
  };

  const handleUpdateProvince = (data) => {
    setUpdateProvince(data);
    setOpenDialogProvince(true);
  };

  return (
    <div>
      <Grid>
        <Grid container spacing={3}>
          <Grid item lg={5} md={5} sm={12} xs={12}>
            <Button
              onClick={handleCreateProvince}
              className="mb-16 mr-16"
              variant="contained"
              color="primary"
            >
              {t("Add")}
            </Button>
          </Grid>
          <Grid item lg={7} md={7} sm={12} xs={12}>
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
          title={"Xóa tỉnh/thành phố"}
          open={openDialogDelete}
          onYesClick={confirmDelete}
          onConfirmDialogClose={handleDialogCLose}
          text={"Bạn có đồng ý xóa tỉnh/thành phố này không"}
          Yes="Đồng ý"
          No="Không"
        />
      )}

      {openDialogProvince && (
        <ProvinceEditorDialog
          open={openDialogProvince}
          close={handleCloseDialogProvince}
          updateProvince={updateProvince}
        />
      )}
    </div>
  );
}
export default Province;
