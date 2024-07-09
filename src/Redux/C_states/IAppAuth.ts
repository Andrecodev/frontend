export interface IAuthLoginInfo {
	userId: string;
	brokerId: string;
	date: string;
	lastDate: string;
	ipAddress: string;
}
export interface IAuthUser {
	app: string;
	email: string;
	tipoId: string;
	isBroker: boolean;
	isClient: boolean;
	forzarModPassword: boolean;
	isAdministrador: boolean;
	isGestor: boolean;
	isUsuarioActivo: boolean;
	isValidado: boolean;
	login: boolean;
}

export interface IAuthState {
	loading: boolean;
	loginInfo?: IAuthLoginInfo;
	user?: IAuthUser;
	accessToken: string;
	refreshToken: string;
	timeout: number;
	modules: Array<string>;
	time_before_token_refresh: number;
	user_idle_time_before_expiration_alert: number;
	user_idle_time_modal_before_token_expiration: number;
	limit_date_certification_download: string;
}

export const defaultAuthState: IAuthState = {
	loading: true,
	accessToken: "",
	refreshToken: "",
	modules: [],
	timeout: -1,
	time_before_token_refresh: 10 * 1000,
	user_idle_time_before_expiration_alert: 3 * 60 * 1000,
	user_idle_time_modal_before_token_expiration: 15 * 1000,
	limit_date_certification_download: "17/03",
};
