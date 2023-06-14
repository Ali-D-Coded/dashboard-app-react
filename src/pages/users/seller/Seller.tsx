import React from "react";
import { useGetAllShops } from "../../../hooks/shops/useShops";

function Seller() {
  const { data: shops, isLoading, isSuccess, isError } = useGetAllShops();

  if (isSuccess) {
    console.log({ shops });
  }
  return <div className="text-red-500 bg-green-400">
    
  </div>;
}

export default Seller;
