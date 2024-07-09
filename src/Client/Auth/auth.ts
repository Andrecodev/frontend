import { call, put, select } from "redux-saga/effects";
import { Axios, setAxiosHeader, deleteAxiosHeader } from "..";
import {
	setCreateTokenSuccess,
	setCreateTokenError,
	setDeleteTokenSuccess,
	setUpdateTokenSuccess,
	setUpdateTokenError,
	setDeleteTokenError,
	setAuthConfigFetchSuccess,
	setAuthConfigFetchError,
	setDeleteToken,
} from "../../Redux/B_actions/app_auth";
import { saveDataToSessionStorage, removeDataFromSessionStorage } from "../../Config/utils/storage";
import { getAccessToken, getRefreshToken, getAuth } from "../../Redux/E_selectors/app_auth";
import { Config } from "../../Config/constants/env_variables";
import { getBroker } from "../../Redux/E_selectors/app_broker";
import { getUser } from "../../Redux/E_selectors/app_user";
import { navbarHide } from "../../Redux/B_actions/app_template_standard";
import { connect } from "@yalopov/redux-websocket/dist";

const { URL_ENDPOINT_LOGIN } = Config;
/* const getToken = (refer: string) => {
	return Axios.post(Config.URL_ENDPOINT_AUTH + "/token-access", {
		refer,
	});
}; */

const getToken = (data: any) => {
	return Axios.post(`${URL_ENDPOINT_LOGIN}/login`, data);
};

/* export function* handleAuthStart(action: any) {
	try {
		const response = yield call(getToken, action.payload);
		const {
			data: { data: authData },
		} = response;
		saveDataToSessionStorage("authData", authData);
		setAxiosHeader("Authorization", `${authData.accessToken}`);
		yield put(setCreateTokenSuccess(authData));
	} catch (e) {
		yield put(setCreateTokenError(e.toString()));
		yield put(navbarHide());
	}
} */

export function* handleAuthStart(action: any) {
	try {
		const response = yield call(getToken, action.payload);
		const {
			data: { data: authData },
		} = response;
		saveDataToSessionStorage("authData", authData);
		setAxiosHeader("Authorization", `${authData.accessToken}`);
		yield put(setCreateTokenSuccess(authData));
	} catch (e) {
		yield put(setCreateTokenError(e.toString()));
		yield put(navbarHide());
	}
}

const refreshToken = (accessToken: string, refreshToken: string) => {
	return Axios.post(Config.URL_ENDPOINT_AUTH + "/token-refresh", {
		accessToken,
		refreshToken,
	});
};

export function* handleAuthTokenRefresh() {
	try {
		const access_token = yield select(getAccessToken);
		const refresh_token = yield select(getRefreshToken);
		const response = yield call(refreshToken, access_token, refresh_token);
		const {
			data: { data },
		} = response;
		setAxiosHeader("Authorization", `${data.accessToken}`);
		yield put(setUpdateTokenSuccess(response.data.data));
		const authData = yield select(getAuth);
		const brokerData = yield select(getBroker);
		const userData = yield select(getUser);
		saveDataToSessionStorage("authData", {
			...authData,
			broker: brokerData,
			user: userData,
		});
	} catch (e) {
		yield put(setUpdateTokenError(e.toString()));
		yield put(setDeleteToken(e.toString()));
	}
}

const deleteToken = (accessToken: string) => {
	return Axios.post(Config.URL_ENDPOINT_AUTH + "/token-delete", {
		accessToken,
	});
};

export function* handleAuthTokenDelete() {
	try {
		window.location.replace("/");
		const access_token = yield select(getAccessToken);
		removeDataFromSessionStorage("authData");
		removeDataFromSessionStorage("lastRoute");
		removeDataFromSessionStorage("QSI_HistorySession");
		removeDataFromSessionStorage("QSI_ActionSetHistory");
		removeDataFromSessionStorage("QSI_History");
		localStorage.clear();
		yield put(setDeleteTokenSuccess());
		yield call(deleteToken, access_token);
		deleteAxiosHeader("Authorization");
		window.location.reload();
	} catch (e) {
		removeDataFromSessionStorage("authData");
		removeDataFromSessionStorage("lastRoute");
		yield put(setDeleteTokenError(e.toString()));
	}
}

export const fetchUtilConfig = (propertyName: string) => {
	return Axios.get(`${Config.URL_ENDPOINT_UTILS}/${propertyName}`);
};

export function* handleAuthConfigFetch() {
	try {
		const refresh_resp = yield call(fetchUtilConfig, "TIME_BEFORE_TOKEN_REFRESH");
		const idle_time_before_exp_reps = yield call(fetchUtilConfig, "USER_IDLE_TIME_BEFORE_EXPIRATION_ALERT");
		const idle_time_modal_before_exp_resp = yield call(fetchUtilConfig, "USER_IDLE_TIME_MODAL_BEFORE_TOKEN_EXPIRATION");
		const date_certification_limit_resp = yield call(fetchUtilConfig, "DATE_CERTIFICATE_UPLOAD");

		yield put(
			setAuthConfigFetchSuccess({
				time_before_token_refresh: refresh_resp.data.data.data,
				user_idle_time_before_expiration_alert: idle_time_before_exp_reps.data.data.data,
				user_idle_time_modal_before_token_expiration: idle_time_modal_before_exp_resp.data.data.data,
				limit_date_certification_download: date_certification_limit_resp.data.data.data,
			}),
		);
	} catch (e) {
		yield put(setAuthConfigFetchError(e.toString()));
	}
}
