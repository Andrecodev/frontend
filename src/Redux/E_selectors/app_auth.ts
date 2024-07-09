import { AppState } from "../D_reducers/index";
import { IAuthState } from "../C_states/IAppAuth";

export const getAuth = (state: AppState): IAuthState => state.app_auth;

export const getAuthLoginInfo = (state: AppState) => {
	const auth = getAuth(state);
	return auth.loginInfo;
};
export const getAuthUserInfo = (state: AppState) => {
	const auth = getAuth(state);
	return auth?.user;
};

export const getAccessToken = (state: AppState) => {
	const auth = getAuth(state);
	return auth.accessToken;
};

export const getRefreshToken = (state: AppState) => {
	const auth = getAuth(state);
	return auth.refreshToken;
};

export const getTokenTimeout = (state: AppState) => {
	const auth = getAuth(state);
	return auth.timeout;
};

export const getAuthModules = (state: AppState) => {
	const auth = getAuth(state);
	return auth.modules;
};

export const getAuthTimeBeforeTokenRefresh = (state: AppState) => {
	const auth = getAuth(state);
	return auth.time_before_token_refresh;
};

export const getAuthIdleTimeBeforeModal = (state: AppState) => {
	const auth = getAuth(state);
	return auth.user_idle_time_before_expiration_alert;
};

export const getAuthIdleTimeBeforeExpiration = (state: AppState) => {
	const auth = getAuth(state);
	return auth.user_idle_time_modal_before_token_expiration;
};

export const getAuthLoading = (state: AppState) => getAuth(state).loading;

export const getCertificationsLimitDate = (state: AppState) => {
	const auth = getAuth(state);
	return auth.limit_date_certification_download;
};
