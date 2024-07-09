import { takeEvery, takeLeading } from "redux-saga/effects";
import {
	APP_AUTH_TOKEN_CREATE,
	APP_AUTH_TOKEN_UPDATE,
	APP_AUTH_TOKEN_DELETE,
	APP_AUTH_CONFIG_FETCH,
} from "../A_constants/app_auth";
import {
	handleAuthStart,
	handleAuthTokenRefresh,
	handleAuthTokenDelete,
	handleAuthConfigFetch,
} from "../../Client/Auth/auth";

export function* watchAuthLoginStart() {
	yield takeLeading(APP_AUTH_TOKEN_CREATE, handleAuthStart);
	yield takeLeading(APP_AUTH_TOKEN_UPDATE, handleAuthTokenRefresh);
	yield takeEvery(APP_AUTH_TOKEN_DELETE, handleAuthTokenDelete);
	yield takeEvery(APP_AUTH_CONFIG_FETCH, handleAuthConfigFetch);
}
