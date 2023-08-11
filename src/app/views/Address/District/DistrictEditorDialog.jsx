import React, { useState, useRef, useEffect } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
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

import { districtActions } from "app/redux/actions/DistrictActions";
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

const DistrictEditorDialog = ({ open, close, updateDistrict, isUpdating }) => {
  const { t } = useTranslation();
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const { provinces } = useSelector((state) => state.province);

  const [district, setDistrict] = useState(null);

  useEffect(() => {
    if (updateDistrict) {
      setDistrict(updateDistrict);
    }
  }, [updateDistrict]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "provinceDto") {
      setDistrict({
        ...district,
        provinceDto: { id: value },
      });
      console.log(district);
    } else {
      setDistrict({
        ...district,
        [name]: value,
      });
    }

    console.log(district);
  };

  const handleSubmit = () => {
    if (isUpdating) {
      dispatch(districtActions.update(district));
    } else {
      dispatch(districtActions.create(district));
    }
    close();
    console.log(district);
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
          {isUpdating ? (
            <span className="mb-20 styleColor">
              {t("Chỉnh sửa huyện/quận")}
            </span>
          ) : (
            <span className="mb-20 styleColor">{t("Thêm mới huyện/quận")}</span>
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
                        {t("Chọn tỉnh/thành phố")}
                      </span>
                    }
                  </InputLabel>
                  <Select
                    id="province-select"
                    onChange={handleChange}
                    name="provinceDto"
                    value={district?.provinceDto?.id || ""}
                  >
                    {provinces?.map((province) => (
                      <MenuItem key={province.id} value={province.id}>
                        {province.name}
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
                      {t("Tên huyện/quận")}
                    </span>
                  }
                  type="text"
                  name="name"
                  value={district?.name || ""}
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
                      {t("Mã huyện/quận")}
                    </span>
                  }
                  type="text"
                  name="code"
                  value={district?.code || ""}
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
                  value={district?.area || ""}
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

export default DistrictEditorDialog;
