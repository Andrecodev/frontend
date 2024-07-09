import {
  APP_AUTH_TOKEN_CREATE,
  APP_AUTH_TOKEN_DELETE,
  APP_AUTH_TOKEN_UPDATE,
  APP_AUTH_TOKEN_CREATE_SUCCESS,
  APP_AUTH_TOKEN_CREATE_ERROR,
  APP_AUTH_TOKEN_DELETE_SUCCESS,
  APP_AUTH_TOKEN_DELETE_ERROR,
  APP_AUTH_TOKEN_UPDATE_SUCCESS,
  APP_AUTH_TOKEN_UPDATE_ERROR,
  APP_AUTH_RESTORE_DATA_FROM_STORAGE,
  APP_AUTH_CONFIG_FETCH_SUCCESS,
  APP_AUTH_CONFIG_FETCH,
  APP_AUTH_CONFIG_FETCH_ERROR
} from "../A_constants/app_auth";
import { createAction } from "redux-actions";

export const setAuthDataFromStorage = createAction(APP_AUTH_RESTORE_DATA_FROM_STORAGE);

export const setCreateToken = createAction(APP_AUTH_TOKEN_CREATE);

export const setCreateTokenSuccess = createAction(
  APP_AUTH_TOKEN_CREATE_SUCCESS
);
export const setCreateTokenError = createAction(APP_AUTH_TOKEN_CREATE_ERROR);

export const setDeleteToken = createAction(APP_AUTH_TOKEN_DELETE);
export const setDeleteTokenSuccess = createAction(
  APP_AUTH_TOKEN_DELETE_SUCCESS
);
export const setDeleteTokenError = createAction(APP_AUTH_TOKEN_DELETE_ERROR);

export const setUpdateToken = createAction(APP_AUTH_TOKEN_UPDATE);
export const setUpdateTokenSuccess = createAction(
  APP_AUTH_TOKEN_UPDATE_SUCCESS
);
export const setUpdateTokenError = createAction(APP_AUTH_TOKEN_UPDATE_ERROR);

export const setAuthConfigFetch = createAction(APP_AUTH_CONFIG_FETCH);
export const setAuthConfigFetchSuccess = createAction(APP_AUTH_CONFIG_FETCH_SUCCESS);
export const setAuthConfigFetchError = createAction(APP_AUTH_CONFIG_FETCH_ERROR);
