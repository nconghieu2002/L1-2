import React, { useState, useRef, useEffect } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import DialogContent from "@material-ui/core/DialogContent";
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
  InputLabel,
  Select,
  FormControl,
  MenuItem,
} from "@material-ui/core";

import { wardActions } from "app/redux/actions/WardActions";

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

const WardEditorDialog = ({ open, close, updateWard }) => {
  const { t } = useTranslation();
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const { districts } = useSelector((state) => state.district);

  const [ward, setWard] = useState(null);

  useEffect(() => {
    if (updateWard) {
      setWard(updateWard);
    }
  }, [updateWard]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "districtDto") {
      setWard({
        ...ward,
        districtDto: { id: value },
      });
    } else {
      setWard({
        ...ward,
        [name]: value,
      });
    }
  };

  const handleSubmit = () => {
    if (updateWard.id) {
      dispatch(wardActions.update(ward));
    } else {
      dispatch(wardActions.create(ward));
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
          {updateWard.id ? (
            <span className="mb-20 styleColor">{t("Chỉnh sửa xã/phường")}</span>
          ) : (
            <span className="mb-20 styleColor">{t("Thêm mới xã/phường")}</span>
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
                <FormControl fullWidth={true} variant="outlined" size="small">
                  <InputLabel style={{ backgroundColor: "white" }}>
                    {
                      <span className="font">
                        <span style={{ color: "red" }}> * </span>
                        {t("Chọn huyện/quận")}
                      </span>
                    }
                  </InputLabel>
                  <Select
                    id="district-select"
                    onChange={handleChange}
                    name="districtDto"
                    value={ward?.districtDto?.id || ""}
                  >
                    {districts?.map((district) => (
                      <MenuItem key={district.id} value={district.id}>
                        {district.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextValidator
                  className="w-100"
                  label={
                    <span className="font">
                      <span style={{ color: "red" }}> * </span>
                      {t("Tên xã/phường")}
                    </span>
                  }
                  type="text"
                  name="name"
                  value={ward?.name || ""}
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
                      {t("Mã xã/phường")}
                    </span>
                  }
                  type="text"
                  name="code"
                  value={ward?.code || ""}
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
                  value={ward?.area || ""}
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

export default WardEditorDialog;
