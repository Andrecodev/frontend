import { handleActions } from "redux-actions";
import { MENU_ITEM_SELECTED, SCREEN, THEME } from "../A_constants/app";
import { defaultAppState, IAppState } from "../C_states/IAppState";

export const app = handleActions<IAppState>(
	{
		[SCREEN]: (state: IAppState, action: any) => ({
			...state,
			screen: action.payload,
		}),

		[THEME]: (state: IAppState, action: any) => ({
			...state,
			theme: action.payload,
		}),

		[MENU_ITEM_SELECTED]: (state: IAppState, action: any) => ({
			...state,
			menuItemSelected: action.payload,
		}),
	},
	defaultAppState,
);
