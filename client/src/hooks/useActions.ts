import { bindActionCreators } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { useMemo } from "react"
import { actions as userActions } from "../store/user/user.slice"
import { actions as devicesActions } from "../store/devices/devices.slice"

const rootActions = {
  ...userActions,
  ...devicesActions
}

export const useActions = () => {
  const dispatch = useDispatch()

  return useMemo(() =>
    bindActionCreators(rootActions, dispatch), [dispatch])
}