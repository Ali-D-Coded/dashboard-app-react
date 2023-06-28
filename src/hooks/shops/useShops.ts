
import APIClientPrivate from "../../utils/axios";
import { useMutationWithToken, useQueryWithToken } from "../helper/useHelper";



export const useGetAllShops = () => {
async function getAllShops(headers:any) {
	return await APIClientPrivate.get("/shop/all",headers)
}
	return useQueryWithToken(getAllShops,"shops")
}


export const useEditShopStatus = () => {
	const editShop = async (data: any,headers:any) => {
		const {id, ...shop} = data
		console.log({ shop });
		
		return await APIClientPrivate.patch(`/shop/update/status/${id}`, shop,headers);
	};
  return useMutationWithToken(editShop);
};

export const useEditShop = () => {
	const editShop = async (data: any,headers:any) => {
		const {id, ...shop} = data
		console.log({ shop });
		
		return await APIClientPrivate.patch(`/shop/update/${id}`, shop, {
			headers: {
				"Content-Type":"multipart/formdata"
			}
		});
	};
  return useMutationWithToken(editShop);
};

export const useCreateShop = () => {
	const editShop = async (data: any,
		// headers: any
	) => {
		
		console.log({ data });
		
		return await APIClientPrivate.post("/auth/local/shop/sign-up", data, {
			headers: {
			"Content-Type":"application/json"
		}
		});
	};
  return useMutationWithToken(editShop);
};
