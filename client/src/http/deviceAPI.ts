import {
  IAPIDevice,
  IBrand,
  IDevice,
  IPostBrand,
  IPostDevice,
  IPostType,
  IType,
} from "../types/device.types";
import { $authHost, $host } from "./index";

export const createType = async (type: IPostType): Promise<IType> => {
  const { data }: { data: IType } = await $authHost.post("api/type", type);
  return data;
};

export const fetchTypes = async (): Promise<IType[]> => {
  const { data }: { data: IType[] } = await $host.get("api/type");
  return data;
};

export const createBrand = async (brand: IPostBrand): Promise<IBrand> => {
  const { data }: { data: IBrand } = await $authHost.post("api/brand", brand);
  return data;
};

export const fetchBrands = async (): Promise<IBrand[]> => {
  const { data }: { data: IBrand[] } = await $host.get("api/brand");
  return data;
};

export const createDevice = async (device: FormData): Promise<IPostDevice> => {
  const { data }: { data: IPostDevice } = await $authHost.post(
    "api/device",
    device
  );
  return data;
};

export const fetchDevices = async (
  typeId: number,
  brandId: number,
  page: number,
  limit: number = 5
): Promise<IAPIDevice> => {
  const { data }: { data: IAPIDevice } =
    typeId && brandId
      ? await $host.get("api/device", {
          params: { typeId, brandId, page, limit },
        })
      : !typeId && brandId
      ? await $host.get("api/device", {
          params: { brandId, page, limit },
        })
      : typeId && !brandId
      ? await $host.get("api/device", {
          params: { typeId, page, limit },
        })
      : await $host.get("api/device", {
          params: { page, limit },
        });
  return data;
};

export const fetchOneDevice = async (id: number): Promise<IDevice> => {
  const { data }: { data: IDevice } = await $host.get("api/device/" + id);
  return data;
};
