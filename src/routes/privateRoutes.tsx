import React from "react";
import { useAppSelector } from "../stores/store";

function PrivateRoutes(props: any) {
  const { emailHeader } = useAppSelector((state) => state.userReducer);
  if (!emailHeader) {
    return <div>Bạn không có quyền vào trang này</div>;
  }
  return <div>{props.children}</div>;
}

export default PrivateRoutes;
