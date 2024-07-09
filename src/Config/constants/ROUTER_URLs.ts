export const HOME_PATH: string = "/";

export const SERVER_ERROR_PATH: string = "/error";
export const LOGIN_PUBLIC_PATH: string = "/login";
export const HOME_PRIVATE_PATH: string = "/home";
export const FIRST_LOGIN_PATH: string = "/firstlogin";
export const REQUESTS_PATH: string = "/requests";
//USER GESTOR

export const USER_CHANGE_KEY_PATH: string = "/clave de navegación";
// USER ADMINISTRATION
export const USER_ADMINISTRATOR_PATH: string = "/user-administrator";
export const USER_ADMINISTRATOR_LIST_PATH: string = "/user-administrator/list";
export const USER_ADMINISTRATOR_CREATE_PATH: string = "/user-administrator/create";
export const CHANGE_PASSWORD_PATH: string = "/change-password";
export const MANAGE_USER_PATH: string = "/user-administrator/edit";
export const MANAGE_USER_EDIT_PROFILE_PATH: string = "/user-administrator/edit";
export const MANAGE_USER_EDIT_PASSWORDS_PATH: string = "/user-administrator/edit/passwords";
export const MANAGE_USER_EDIT_FUNCTIONALITIES_PATH: string = "/user-administrator/edit/functionalities";
export const USER_PROFILE_PATH: string = "/user_profile";
export const REQUESTS_CREATE_PATH: string = "/requests/myrequests/create";
export const REQUESTS_CREATE_SUCCESS_PATH: string = "/requests/create/success";
export const REQUESTS_QUERY: string = "/requests/query";
export const REQUESTS_QUERY_PATH: string = "/requests/Myrequests/query";
export const REQUESTS_IDENTITY_PATH: string = "/requests/identity";
export const REQUESTS_IDENTITY_VALIDATION_PATH: string = "/requests/identity/validation";
export const REQUESTS_IDENTITY_HABEAS_PATH: string = "/requests/create/types/business";
export const REQUESTS_IDENTITY_SARLAFT_PATH: string = "/requests/create/types/business";
export const REQUESTS_IDENTITY_RECORDS_PATH: string = "/requests/identity/records";
export const REQUESTS_QUERY_VIEW_PATH: string = "/requests/query/:uuid";
export const REQUESTS_PAY_ONLINE: string =
	"https://aplicaciones.libertyseguros.co/caja_external/faces/start?_adf.ctrl-state=rw8ms26g0_3";
export const REQUESTS_UPDATE_FAC: string =
	"https://forms.office.com/pages/responsepage.aspx?id=OTOoCOeQv0mQdZV8zVYb8ZUnmrjgDfJNhgbC_AAUzBpUQ0lRMzVJNkdMVFRUMjBXRVVESTcyMkZVRi4u&web=1&wdLOR=cB9AA05F8-2A99-4C22-9535-162279D35632";

export const REQUEST_CREATE_TYPES: string = "/requests/create/types"; // esta es de los tabs
export const REQUESTS_BUSINESS_PATH: string = "/requests/create/types/business"; // esta es de negocio
export const REQUESTS_SUPPORT_PATH: string = "/requests/create/types/support"; // esta de support
// REFERS
export const REQUESTS_PRODUCTION_PATH: string = "/requests/querys/production"; // Pantalla de Producción
export const REQUESTS_RENOVATIONS_PATH: string = "/requests/querys/renovations"; // Pantalla de Renovaciones
export const REQUESTS_PYME_PATH: string = "/requests/product/pyme/cotiza"; // Pantalla PYME
export const REQUESTS_BPM_PATH: string = "/requests/product/bpm/cotiza"; // Pantalla BPM
export const REQUESTS_CARS_PATH: string = "/requests/product/cars/cotiza"; // Pantalla Autos
export const REQUESTS_CARS_MANAGEMENT_PATH: string = "/requests/product/carsmanagement/gestion"; // Pantalla Autos Gestión
export const REQUESTS_COLECTIVE_CARS_PATH: string = "/requests/product/colectivecars/cotiza"; // Pantalla Autos Colectivo
export const REQUESTS_HOME_PATH: string = "/requests/product/home/cotiza"; // Pantalla Hogar
export const REQUESTS_SINISTERS_PATH: string = "/requests/querys/sinisters"; // Pantalla Siniestros
export const REQUESTS_IAXIS_PATH: string = "/requests/product/iaxis"; // Pantalla IAXIS
export const REQUESTS_POLICY_MANAGEMENT_PATH: string = "/requests/product/policymanagement/cotiza"; // Pantalla Gestión Póliza
export const REQUESTS_SASIC_PATH: string = "/requests/myrequests/sasic"; // Pantalla SASIC

export const CONSULTATIONS_PATH: string = "/requests/querys";
export const CONSULTATIONS_TAX_CERTIFICATIONS_PATH = "/requests/querys/tax_certifications";

export const BUSINESS_PATH: string = "/business";
export const COMMISSIONS_PATH: string = "/business/commissions";
export const PAYROLLS_PATH: string = "/business/commissions/payrolls";
export const NEXT_TO_PAY_PATH: string = "/business/commissions/next_to_pay";
export const PORTFOLIO_PATH: string = "/business/query/portfolio";
export const DUE_FOR_PAYMENT_PATH: string = "/business/query/portfolio/due-for-payment";
export const FUNDED_PORTFOLIO: string = "/business/query/portfolio/funded-portfolio";

export const COMMISSIONS_DASHBOARD_PATH: string = "/business/dashboard";
export const COMMISSIONS_DASHBOARD_COMMISSIONS_PATH: string = "/business/dashboard/commissions/sobrecommisions";
export const COMMISSIONS_DASHBOARD_COMMISSIONS_PATH_HOME: string =
	"/business/dashboard/commissions/sobrecommisions/home";
export const COMMISSIONS_DASHBOARD_COMMISSIONS_PATH_AUTO: string =
	"/business/dashboard/commissions/sobrecommisions/auto";
export const COMMISSIONS_DASHBOARD_COMMISSIONS_PATH_PYME: string =
	"/business/dashboard/commissions/sobrecommisions/pyme";
export const COMMISSIONS_DASHBOARD_WALLET_PATH: string = "/business/dashboard/wallet";
export const COMMISSIONS_DASHBOARD_PRODUCTION_PATH: string = "/business/dashboard/production";

export const PUBLICATIONS_AND_DOCUMENTS_PATH: string = "/requests/online/publications";
export const MOBILE_MENU_PATH: string = "/menu";

export const BREADCRUMB_DEFAULTS_URIS: any = {
	"/business": COMMISSIONS_PATH,
	"/requests": REQUESTS_CREATE_PATH,
	"/requests/identity": REQUESTS_IDENTITY_VALIDATION_PATH,
	"/home/manage_user/edit": MANAGE_USER_PATH,
};
export const BREADCRUMB_URIS_TO_REMOVE: any = {
	[REQUEST_CREATE_TYPES]: true,
	[REQUESTS_PATH]: true,
	[BUSINESS_PATH]: true,
	[COMMISSIONS_DASHBOARD_PATH]: true,
	[USER_ADMINISTRATOR_LIST_PATH]: true,
};
