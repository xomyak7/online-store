import { IBrand, IDevice, IStore, IType } from "../../types/device.types";
import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

const initialState: IStore = {
  types: [],
  brands: [],
  devices: [],
  selectedType: { id: 0, name: "" },
  selectedBrand: { id: 0, name: "" },
  totalCount: 0,
  limit: 2,
  currentPage: 1,
};

export const devicesSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    getTypes: (state, actions: PayloadAction<IType[]>) => {
      state.types = actions.payload;
    },
    getBrands: (state, actions: PayloadAction<IBrand[]>) => {
      state.brands = actions.payload;
    },
    getDevices: (state, actions: PayloadAction<IDevice[]>) => {
      state.devices = actions.payload;
    },
    setSelectedType: (state, actions: PayloadAction<IType>) => {
      state.currentPage = 1;
      current(state).selectedType !== actions.payload
        ? (state.selectedType = actions.payload)
        : (state.selectedType = { id: 0, name: "" });
    },
    setSelectedBrand: (state, actions: PayloadAction<IBrand>) => {
      state.currentPage = 1;
      current(state).selectedBrand !== actions.payload
        ? (state.selectedBrand = actions.payload)
        : (state.selectedBrand = { id: 0, name: "" });
    },
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { actions, reducer } = devicesSlice;
