// import React, { useState, useEffect } from "react";
// import MaterialTable, { MTableToolbar } from "material-table";
// import { Breadcrumb, ConfirmationDialog } from "egret";
// import { useTranslation } from "react-i18next";
// import {
//   Grid,
//   IconButton,
//   Icon,
//   Button,
//   TextField,
//   InputAdornment,
//   Input,
//   MuiThemeProvider,
//   TableHead,
//   TableCell,
//   TableRow,
//   Checkbox,
//   TablePagination,
// } from "@material-ui/core";
// import { Link } from "react-router-dom";
// import SearchIcon from "@material-ui/icons/Search";

// import { toast } from "react-toastify";
// import { saveAs } from "file-saver";

// toast.configure({
//   autoClose: 1000,
//   draggable: false,
//   limit: 3,
// });

// const Address = () => {
//   const { t } = useTranslation();

//   return <div className="m-sm-30">address</div>;
// };

// export default Address;

import React from "react";
import { combineReducers, createStore } from "redux";

const userAction = {
  type: "UPDATE_USER",
  payload: "Trung",
};

const productAction = {
  type: "UPDATE_PRODUCT",
  payload: [{ name: "iPhone XR" }, { name: "Samsung Galaxy S10" }],
};

const userReducer = (state = "", action) => {
  console.log(action);
  switch (action.type) {
    case "UPDATE_USER":
      return action.payload;
    default:
      return state;
  }
};

const productReducer = (state = [], action) => {
  switch (action.type) {
    case "UPDATE_PRODUCT":
      return action.payload;
    default:
      return state;
  }
};

const allReducers = combineReducers({
  userReducer,
  productReducer,
});

const store = createStore(allReducers);

const renderdataStore = store.getState().productReducer.map((data, index) => {
  return <li key={`store-${index}`}>{data.name}</li>;
});

function Address() {
  return (
    <div>
      <button onClick={() => store.dispatch(userAction)}>Update User</button>
      <button onClick={() => store.dispatch(productAction)}>
        Update Product
      </button>
      <div>Hello! {store.getState().userReducer}</div>
      <div>Info Phone</div>
      <ul>{renderdataStore}</ul>
    </div>
  );
}

export default Address;
