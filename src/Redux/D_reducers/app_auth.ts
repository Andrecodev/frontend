import { handleActions } from "redux-actions";
import {
  APP_AUTH_TOKEN_CREATE_SUCCESS,
  APP_AUTH_TOKEN_DELETE_SUCCESS,
  APP_AUTH_TOKEN_UPDATE_SUCCESS,
  APP_AUTH_RESTORE_DATA_FROM_STORAGE,
  APP_AUTH_TOKEN_DELETE_ERROR,
  APP_AUTH_CONFIG_FETCH_SUCCESS,
  APP_AUTH_TOKEN_CREATE,
  APP_AUTH_TOKEN_CREATE_ERROR
} from "../A_constants/app_auth";
import { IAuthState, defaultAuthState } from "../C_states/IAppAuth";
import { APP_RESET_STATE } from "../A_constants/app";

export const app_auth = handleActions<IAuthState>(
  {
    [APP_AUTH_RESTORE_DATA_FROM_STORAGE]: (state: IAuthState, action: any): IAuthState => {
      const {
        broker,
        user,
        ...data
      } = action.payload;
      return {
        ...state,
        ...data,
        loading: false
      };
    },
    [APP_AUTH_TOKEN_CREATE]: (state: IAuthState, action: any): IAuthState => {
      return {
        ...state,
        loading: true
      };
    },
    [APP_AUTH_TOKEN_CREATE_SUCCESS]: (state: IAuthState, action: any): IAuthState => {
      const {
        broker,
        user,
        ...data
      } = action.payload;
      return {
        ...state,
        ...data,
        loading: false
      };
    },
    [APP_AUTH_TOKEN_CREATE_ERROR]: (state: IAuthState, action: any): IAuthState => {
      return {
        ...state,
        loading: false
      };
    },
    [APP_AUTH_TOKEN_DELETE_SUCCESS]: (state: IAuthState): IAuthState => ({
      ...state,
      ...defaultAuthState,
      loading: false
    }),
    [APP_AUTH_TOKEN_DELETE_ERROR]: (state: IAuthState): IAuthState => ({
      ...state,
      ...defaultAuthState,
      loading: false
    }),
    [APP_AUTH_TOKEN_UPDATE_SUCCESS]: (state: IAuthState, action: any): IAuthState => ({
      ...state,
      accessToken: action.payload.accessToken,
      refreshToken: action.payload.refreshToken,
      timeout: action.payload.timeout,
    }),
    [APP_AUTH_CONFIG_FETCH_SUCCESS]: (state: IAuthState, action: any): IAuthState => ({
      ...state,
      ...action.payload
    }),
    [APP_RESET_STATE]: (state: IAuthState, action: any): IAuthState => ({
      ...defaultAuthState,
      loading: false
    }),
  },
  defaultAuthState
);
