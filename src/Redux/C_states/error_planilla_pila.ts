interface polizas {
	policy: number;
}

export interface ErrorPlanilla {
	payrollNumber: number;
	policies: Array<polizas>;
}

export interface IGeErrorPlanillaStorie {
	loading: boolean;
	data: any;
	message: string;
	state: number;
}

export interface dataErrorPlanillaRequest {
	data: Array<ErrorPlanilla>;
	loading: boolean;
	error: boolean;
}

export interface dataErrorPlanilla {
	fechtErrorPlanilla: dataErrorPlanillaRequest;
	getErrorPlanillaStorie: IGeErrorPlanillaStorie;
}

export const defaultErrorPlanilla: dataErrorPlanilla = {
	fechtErrorPlanilla: {
		loading: false,
		data: [],
		error: false,
	},
	getErrorPlanillaStorie: {
		loading: false,
		data: {},
		message: "",
		state: 0,
	},
};
