import { createAction } from "redux-actions";
import { SCREEN, THEME, APP_RESET_STATE, MENU_ITEM_SELECTED } from "../A_constants/app";

export const setScreen = createAction(SCREEN, (payload: any) => payload);

export const setTheme = createAction(THEME, (payload: any) => payload);

export const setMenuItemSelected = createAction(MENU_ITEM_SELECTED, (payload: any) => payload);

export const appResetState = createAction(APP_RESET_STATE);
