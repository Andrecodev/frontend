import { AppState } from "../D_reducers";

export const getSnackNotification = (state: AppState) => state.app_snack_notifications;

export const getSnackNotificationList = (state: AppState) => getSnackNotification(state).notifications;
