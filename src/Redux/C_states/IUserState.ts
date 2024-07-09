export interface IUserState {
	clave: number;
	claveshijas: string;
	operacion: string;
	tipoid: string;
	numeroid: string;
	email: string;
	usuario: string;
	name: string;
	modulos: string[];
	stick: string;
	sucursal: string;
	profileName: string;
	isAdministrador?: boolean;
	isGestor?: boolean;
}

export const defaultUserState: IUserState = {
	clave: -1,
	claveshijas: "",
	operacion: "",
	tipoid: "",
	numeroid: "",
	email: "",
	usuario: "",
	name: "",
	modulos: [],
	stick: "",
	sucursal: "",
	profileName: "",
};
