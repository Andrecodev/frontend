import { Config } from "Config/constants/env_variables";
import { Axios } from "Client";
export const getKeysInfo = async (data) => {
	const bodyToSend = { data };
	const { URL_ENDPOINT_ADMIN_USER } = Config;
	const endpointURL = `${URL_ENDPOINT_ADMIN_USER}/keysInfo`;
	const body = bodyToSend;
	return Axios.post(endpointURL, body);
};
