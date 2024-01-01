import { message } from "antd";
import { useMutation, useQuery } from "react-query";
import jsCookie from 'js-cookie';


const token : string | undefined = jsCookie.get("_auth")

export const createHeaders = (token: string | undefined) => ({
  headers: {
		Authorization: `Bearer ${token}`,
	  "Content-Type": "multipart/form-data",
  },
});

export const useMutationWithToken = (mutationFunction: any) => {
  // const session = useSession();
  // const token = getToken(session);

  const mutation = async (data: any) => {
    return await mutationFunction(data, createHeaders(token));
  };

	return useMutation(mutation);
};

export const useQueryWithToken = (queryFunction: any, queryKey: string) => {
	
  // const session = useSession();
  // const token = getToken(session);

  const query = async () => {
    return await queryFunction(createHeaders(token));
  };

	return useQuery(queryKey, query, {
	   onError: (error: any) => {
			console.error("An error occurred while fetching data:", error);
			message.error("An error occurred while fetching data")
			
    },
  });
};