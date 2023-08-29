import { useNavigate, useRouteError } from "react-router-dom";
import { useEffect } from "react"
import { SHOP_ROUTE } from "../utils/consts";

export default function ErrorPage() {
  const navigate = useNavigate()
  const error: any = useRouteError();
  console.error(error);
  
  useEffect(() => {
    navigate(SHOP_ROUTE)
  }, [])

  return (
    <div>
    </div>
  );
}