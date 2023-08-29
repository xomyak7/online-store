import { IDevice } from "../../types/device.types";
import { IBasketDevice, IInitialUserState, IUser } from "../../types/user.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IInitialUserState = {
  isAuth: false,
  user: {} as IUser,
  basket: { count: 0, devices: [] },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthUser: (state, actions: PayloadAction<IUser>) => {
      state.user = actions.payload;
      state.isAuth = true;
    },
    logOutUser: state => {
      state.user = {} as IUser;
      state.isAuth = false;
    },
    addToBasket: (state, actions: PayloadAction<IDevice>) => {
      const basket = state.basket;
      const index = basket.devices.findIndex(device => device.id === actions.payload.id)
      if (
        index === -1
      ) {
        basket.devices.push({...actions.payload, count: 1});
        basket.count++;
      } else {
        basket.count++;
        basket.devices[index].count++;
      }
    },
    removeOneFromBasket: (state, actions: PayloadAction<IDevice>) => {
      const index = state.basket.devices.findIndex(
        device => device.id === actions.payload.id
      );
      if (state.basket.count > 1) {
        state.basket.count--;
        state.basket.devices[index].count--;
      } else {
        state.basket.count--;
        state.basket.devices.splice(index, 1);
      }
    },
    removeFromBasket: (state, actions: PayloadAction<IBasketDevice>) => {
      const index = state.basket.devices.findIndex(
        device => device.id === actions.payload.id
      );
        state.basket.count -= state.basket.devices[index].count;
        state.basket.devices.splice(index, 1);
    },
  },
});

export const { actions, reducer } = userSlice;
