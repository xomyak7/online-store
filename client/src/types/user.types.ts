import { IDevice } from "./device.types";

export interface IUser {
  id: number;
  email: string;
  exp: number;
  iat: number;
  role: string;
}

export interface IInitialUserState {
  isAuth: boolean;
  user: IUser;
  basket: IBasketDevices;
}

export interface IBasketDevice extends IDevice {
  count: number;
}

export interface IBasketDevices {
  count: number;
  devices: IBasketDevice[];
}