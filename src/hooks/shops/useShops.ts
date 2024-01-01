
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

// export const useEditShop = () => {
//   const editShop = async (data: any, headers: any) => {
//     const { id, ...shop } = data;
//     console.log({ shop });

//     const formData = new FormData();

//     for (const [key, value] of Object.entries(shop) as [string,any] ) {
//       if (Array.isArray(value)) {
//         if (value.length > 0 && value[0]?.originFileObj instanceof Blob) {
//           formData.append(key, value[0].originFileObj as Blob);
//         }
//       } else {
//         formData.append(key, value);
//       }
//     }

//     return await APIClientPrivate.patch(`/shop/update/${id}`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//   };

//   return useMutationWithToken(editShop);
// };

export const useEditShop = () => {
	const editShop = async (data: any,headers:any) => {
		const {id, ...shop} = data
		console.log({ shop });
		
		return await APIClientPrivate.patch(`/shop/update/${id}`, shop,headers);
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
