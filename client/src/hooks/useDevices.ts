import { useTypedSelector } from "./useTypedSelector";

export const useDevices = () => {
  const devices = useTypedSelector(state => state.devices);

  return devices;
}