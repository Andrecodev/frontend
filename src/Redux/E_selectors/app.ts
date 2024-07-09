import { AppState } from "../D_reducers/index";

export const getApp = (state: AppState): any => state.app;

export const getScreen = (state: AppState) => {
	const app = getApp(state);
	return app.screen;
};

export const getTheme = (state: AppState) => {
	const app = getApp(state);
	return app.theme;
};

export const getMenuItemSelected = (state: AppState) => {
	const app = getApp(state);
	return app.menuItemSelected;
};
