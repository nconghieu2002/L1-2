import React, { useState, useRef, useEffect } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import DialogTitle from "@material-ui/core/DialogTitle";
import Draggable from "react-draggable";
import Paper from "@material-ui/core/Paper";
import {
  Dialog,
  Button,
  Grid,
  DialogActions,
  Icon,
  IconButton,
} from "@material-ui/core";

import { provinceActions } from "app/redux/actions/ProvinceActions";
import DialogContent from "@material-ui/core/DialogContent";

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

const ProvinceEditorDialog = ({ open, close, updateProvince }) => {
  const { t } = useTranslation();
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const [province, setProvince] = useState(null);

  useEffect(() => {
    if (updateProvince) {
      setProvince(updateProvince);
    }
  }, [updateProvince]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProvince((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (updateProvince.id) {
      dispatch(provinceActions.update(province));
    } else {
      dispatch(provinceActions.create(province));
    }
    close();
  };

  return (
    <div>
      <Dialog
        open={open}
        PaperComponent={PaperComponent}
        maxWidth={"sm"}
        fullWidth={true}
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          {updateProvince.id ? (
            <span className="mb-20 styleColor">
              {t("Chỉnh sửa tỉnh/thành phố")}
            </span>
          ) : (
            <span className="mb-20 styleColor">
              {t("Thêm mới tỉnh/thành phố")}
            </span>
          )}
          <IconButton
            onClick={close}
            style={{ position: "absolute", right: "10px", top: "10px" }}
          >
            <Icon color="error" title={t("close")}>
              close
            </Icon>
          </IconButton>
        </DialogTitle>
        <ValidatorForm
          ref={formRef}
          onSubmit={handleSubmit}
          style={{
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <DialogContent style={{ overflow: "hidden" }}>
            <Grid container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextValidator
                  className="w-100"
                  label={
                    <span className="font">
                      <span style={{ color: "red" }}> * </span>
                      {t("Tên tỉnh/thành phố")}
                    </span>
                  }
                  type="text"
                  name="name"
                  value={province?.name || ""}
                  onChange={handleChange}
                  validators={["required"]}
                  errorMessages={[t("general.errorMessages_required")]}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextValidator
                  className="w-100"
                  label={
                    <span className="font">
                      <span style={{ color: "red" }}> * </span>
                      {t("Mã tỉnh/thành phố")}
                    </span>
                  }
                  type="text"
                  name="code"
                  value={province?.code || ""}
                  onChange={handleChange}
                  validators={["required"]}
                  errorMessages={[t("general.errorMessages_required")]}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextValidator
                  className="w-100"
                  label={
                    <span className="font">
                      <span style={{ color: "red" }}> * </span>
                      {t("Diện tích")}
                    </span>
                  }
                  type="text"
                  name="area"
                  value={province?.area || ""}
                  onChange={handleChange}
                  validators={["required", "matchRegexp:^\\d+$"]}
                  errorMessages={[
                    t("general.errorMessages_required"),
                    t("general.errorMessages_number"),
                  ]}
                  variant="outlined"
                  size="small"
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions spacing={4} className="flex flex-end flex-middle">
            <Button onClick={close} variant="contained" color="secondary">
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
    </div>
  );
};

export default ProvinceEditorDialog;
