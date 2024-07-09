import axios, { AxiosAdapter, AxiosError, AxiosResponse } from "axios";
import MockAdapter from "axios-mock-adapter";
import { Config } from "../Config/constants/env_variables";
import { store } from "../Redux/store";
import { appResetState } from "../Redux/B_actions/app";
import { enableDevelopmentMocks } from "./mocks";

import { cacheAdapterEnhancer, ICacheLike, retryAdapterEnhancer } from "axios-extensions";
// This sets the mock adapter on the default instance

declare module "axios" {
	interface AxiosRequestConfig {
		useCache?: boolean | ICacheLike<any>;
	}
}

export const Axios = axios.create({
	adapter: retryAdapterEnhancer(cacheAdapterEnhancer(<AxiosAdapter>axios.defaults.adapter)),
});

export const setAxiosHeader = (header_name: string, access_token: string): void => {
	Axios.defaults.headers.common[header_name] = access_token;
};

export const deleteAxiosHeader = (header_name: string): void => {
	delete Axios.defaults.headers.common[header_name];
};

Axios.interceptors.response.use(
	(response: AxiosResponse) => {
		return response;
	},
	(error: AxiosError) => {
		if (error.response && (error.response.status === 401 || error.response.status === 403)) {
			store.dispatch(appResetState());
		}
		return Promise.reject(error);
	},
);

export const mockedAxios = new MockAdapter(Axios);

if (process.env.NODE_ENV === "production" || process.env.REACT_APP_MOCK !== "true") {
	mockedAxios.restore();
} else {
	enableDevelopmentMocks();
}
