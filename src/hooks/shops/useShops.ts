
import APIClientPrivate from "../../utils/axios";
import { useMutationWithToken, useQueryWithToken } from "../helper/useHelper";



export const useGetAllShops = () => {
async function getAllShops(headers:any) {
	return await APIClientPrivate.get("/shop/all",headers)
}
	return useQueryWithToken(getAllShops,"shops")
}


export const useEditShop = () => {
	const editShop = async (data: any,headers:any) => {
		const {id, ...shop} = data
		console.log({ shop });
		
		return await APIClientPrivate.patch(`/shop/update/status/${id}`, shop,headers);
	};
  return useMutationWithToken(editShop);
};
