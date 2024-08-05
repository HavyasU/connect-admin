import { serverCon } from "../App";
export const apiReqest = async ({ url, token, data, method }) => {
    try {
        let response = await serverCon(url, {
            method: method || "GET",
            data: data
        });
        return response?.data;
    } catch (error) {
        return (error?.response?.data);
    }
};




export const fetchRequestCaller = async ({ url, data, method }) => {
    try {
        const res = await apiReqest(
            {
                url: url || "/admin/posts",
                data: data || {},
                method: method || "POST"
            }
        );
        return (res);
    } catch (error) {
        return (error?.response);
    }
};