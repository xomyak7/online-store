export interface IStore {
  types: IType[];
  brands: IBrand[];
  devices: IDevice[];
  selectedType: IType;
  selectedBrand: IBrand;
  totalCount: number;
  limit: number;
  currentPage: number;
}

export interface IInfo {
  title: string;
  description: string;
  number: number;
}

export interface IType {
  id: number;
  name: string;
}

export interface IPostType extends Omit<IType, "id"> {}

export interface IBrand {
  id: number;
  name: string;
}

export interface IPostBrand extends Omit<IBrand, "id"> {}

export interface IDevice {
  id: number;
  name: string;
  price: number;
  rating: number;
  img: string;
  brandId: number;
  typeId: number;
  info: IInfo[];
}

export interface IAPIDevice {
  count: number;
  rows: IDevice[];
}

export interface IPostDevice extends IDevice {}
