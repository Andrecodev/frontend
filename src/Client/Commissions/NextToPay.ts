import { Axios } from "../index";
import { call, put, select } from "redux-saga/effects";
import {
	onCommissionNextToPayDetailsSuccess,
	onCommissionNextToPayDetailsError,
	onCommissionNextToPayTotalsSuccess,
	onCommissionNextToPayTotalsError,
	onCommissionNextToPayCalendarSuccess,
	onCommissionNextToPayCalendarError,
	onCommissionNextToPayScheduleSuccess,
	onCommissionNextToPayScheduleError,
	onCommissionNextToPayCofcontrolSuccess,
	onCommissionNextToPayCofcontrolError,
	onCommissionNextToPayChargeRequestSuccess,
	onCommissionNextToPayChargeRequestError,
	onCommissionNextToPayChargeFetchSuccess,
	onCommissionNextToPayChargeFetchError,
	onCommissionNextToPayChargeFetchFetch,
	onCommissionNextToPayGeneralReportGenSuccess,
	onCommissionNextToPayGeneralReportGenError,
} from "../../Redux/B_actions/business_commissions_ntpay";
import {
	getCommissionNextToPayCompanyId,
	getCommissionNextToPayTotalsData,
} from "../../Redux/E_selectors/business_commissions_ntpay";
import { getBroker, getBrokerKey, getBrokerOfficeCode } from "../../Redux/E_selectors/app_broker";
import { IBrokerState } from "../../Redux/C_states/IBrokerState";
import { Config } from "../../Config/constants/env_variables";
import { ICommissionNTPayTotals, ICharge } from "../../Redux/C_states/IBusinessCommissionsNTPay";
import { downloadReportFile } from "./Payrolls";
import { race, take } from "redux-saga-test-plan/matchers";
import {
	REDUX_WEBSOCKET_OPEN,
	REPORT_GENERATION_ERROR,
	REPORT_GENERATION_START,
	REPORT_GENERATION_SUCCESS,
} from "../../Redux/A_constants/websocket";
import moment from "moment";
import { triggerFileDownload } from "../../Config/utils/files";
import { connect, send } from "@yalopov/redux-websocket/dist";
import { closeSnackNotification, enqueueSnackNotification } from "../../Redux/B_actions/snack_notifications";
import { getAccessToken } from "../../Redux/E_selectors/app_auth";

const getCommissionDetails = (brokerKey: number, company: number) => {
	return Axios.get(Config.URL_ENDPOINT_COMMISSIONS + "/detail", {
		params: {
			brokerKey,
			company,
		},
	});
};

export function* handleCommissionDetailsFetch() {
	try {
		const companyId: number = yield select(getCommissionNextToPayCompanyId);
		const broker: IBrokerState = yield select(getBroker);
		const { brokerKey } = broker;

		const response = yield call(getCommissionDetails, brokerKey, companyId);
		const {
			data: { data },
		} = response;
		if (data) {
			yield put(onCommissionNextToPayDetailsSuccess(data));
		} else {
			yield put(onCommissionNextToPayDetailsError());
		}
	} catch (e) {
		yield put(onCommissionNextToPayDetailsError(e.toString()));
	}
}

const getCommissionTotals = (brokerKey: number, company: number) => {
	return Axios.get(Config.URL_ENDPOINT_COMMISSIONS + "/total", {
		params: {
			brokerKey,
			company,
		},
	});
};

export function* handleCommissionTotalsFetch() {
	try {
		const companyId: number = yield select(getCommissionNextToPayCompanyId);
		const broker: IBrokerState = yield select(getBroker);
		const { brokerKey } = broker;

		const response = yield call(getCommissionTotals, brokerKey, companyId);
		const {
			data: { data },
		} = response;
		if (data) {
			yield put(onCommissionNextToPayTotalsSuccess(data));
		} else {
			yield put(onCommissionNextToPayTotalsError());
		}
	} catch (e) {
		yield put(onCommissionNextToPayTotalsError(e.toString()));
	}
}

const getCalendarData = () => {
	return Axios.get(Config.URL_ENDPOINT_UTILS + "/CALENDAR_VALIDATION");
};

export function* handleCommissionCalendarFetch() {
	try {
		const response = yield call(getCalendarData);
		const {
			data: {
				data: { data },
			},
		} = response;
		if (data) {
			yield put(onCommissionNextToPayCalendarSuccess(data));
		} else {
			yield put(onCommissionNextToPayCalendarError());
		}
	} catch (e) {
		yield put(onCommissionNextToPayCalendarError(e.toString()));
	}
}

const getScheduleData = () => {
	const time = new Date().getTime();
	return Axios.get(`${Config.URL_ENDPOINT_UTILS}/SCHEDULE/${time}`);
};

export function* handleCommissionScheduleFetch() {
	try {
		const response = yield call(getScheduleData);
		const {
			data: {
				data: { blocked },
			},
		} = response;
		if (blocked === false) {
			yield put(onCommissionNextToPayScheduleSuccess(true));
		} else {
			yield put(onCommissionNextToPayScheduleSuccess(false));
		}
	} catch (e) {
		yield put(onCommissionNextToPayScheduleError(e.toString()));
	}
}

const getCofcontrolData = () => {
	return Axios.get(Config.URL_ENDPOINT_UTILS + "/cofcontrol");
};

export function* handleCommissionCofcontrolFetch() {
	try {
		const response = yield call(getCofcontrolData);
		const {
			data: { data },
		} = response;
		if (data) {
			yield put(onCommissionNextToPayCofcontrolSuccess(data));
		} else {
			yield put(onCommissionNextToPayCofcontrolError());
		}
	} catch (e) {
		yield put(onCommissionNextToPayCofcontrolError(e.toString()));
	}
}

const doCommissionRequestCharge = (brokerKeys: Array<String>, company: number, subsidiary: string) => {
	return Axios.post(
		Config.URL_ENDPOINT_COMMISSIONS + "/charge-insert",
		{
			subsidiary,
			processState: "N/A",
			company,
			brokerKeys,
		},
		{ useCache: true },
	);
};

export function* handleCommissionChargeRequest() {
	try {
		const companyId: number = yield select(getCommissionNextToPayCompanyId);
		const sucursal = yield select(getBrokerOfficeCode);
		const brokerKey = yield select(getBrokerKey);
		const totals: Array<ICommissionNTPayTotals> = yield select(getCommissionNextToPayTotalsData);

		const brokerKeys = totals.filter((total) => total.total > 0).map((total) => String(total.brokerKey));

		const response = yield call(doCommissionRequestCharge, brokerKeys, companyId, sucursal);

		const {
			data: { data },
		} = response;

		const insertedCharge = data
			.map((charge: any) => charge.response)
			.find((charge: ICharge) => Number(charge.CLAVE_INTERMEDIARIO) === Number(brokerKey));

		yield put(onCommissionNextToPayChargeRequestSuccess(insertedCharge));
	} catch (err) {
		if (err.response && err.response.status === 409) {
			yield put(
				onCommissionNextToPayChargeRequestError({
					exists: true,
					message: err.toString(),
				}),
			);

			yield put(onCommissionNextToPayChargeFetchFetch());
		} else {
			yield put(
				onCommissionNextToPayChargeRequestError({
					exists: false,
					message: err.toString(),
				}),
			);
		}
	}
}

const getCommissionCharge = (brokerKey: number, company: number) => {
	return Axios.get(Config.URL_ENDPOINT_COMMISSIONS + "/charge-query", {
		params: {
			brokerKey,
			company,
		},
	});
};

export function* handleCommissionChargeFetch() {
	try {
		const companyId: number = yield select(getCommissionNextToPayCompanyId);
		const broker: IBrokerState = yield select(getBroker);
		const { brokerKey } = broker;

		const response = yield call(getCommissionCharge, brokerKey, companyId);

		const {
			data: {
				data: { data },
			},
		} = response;

		if (data) {
			yield put(onCommissionNextToPayChargeFetchSuccess(data));
		} else {
			yield put(onCommissionNextToPayChargeFetchError());
		}
	} catch (e) {
		yield put(onCommissionNextToPayChargeFetchError());
	}
}

export function* handleCommissionNTPGeneralReportGenFetch(action: any) {
	try {
		const accessToken = yield select(getAccessToken);
		yield put(
			enqueueSnackNotification({
				message: {
					type: "info",
					title: "Iniciando descarga...",
					dismissible: true,
				},
			}),
		);
		const {
			payload: { userBrokerKey: brokerKey, filteredBrokerKeys, wordFilter: searchTerm },
		} = action;

		const payload = {
			body: {
				company: 1,
				format: "xlsx",
				chunkSize: 1000,
				duplicates: 0,
				...(filteredBrokerKeys.length > 0 ? { keys: filteredBrokerKeys } : {}),
				...(searchTerm ? { searchTerm } : {}),
				type: "ntpay",
			},
			brokerKey,
		};

		yield put(connect(`${Config.URL_ENDPOINT_WEBSOCKET}?brokerKey=${brokerKey}`, ["WebsocketConnection", accessToken]));
		yield take(REDUX_WEBSOCKET_OPEN);
		yield put(send(payload));
		yield take(REPORT_GENERATION_START);
		yield put(
			enqueueSnackNotification({
				message: {
					type: "download",
					title: "Descargando...",
					subtitle: "Reporte general",
				},
				options: {
					persist: true,
					key: "generating_report",
				},
			}),
		);

		const { success, error } = yield race({
			success: (take as any)(REPORT_GENERATION_SUCCESS),
			error: (take as any)(REPORT_GENERATION_ERROR),
		});

		if (success) {
			const {
				payload: {
					body: { url: reportUrl },
				},
			} = success;
			const fileRes = yield call(downloadReportFile, reportUrl);

			const fileExtension = reportUrl.split(".").pop();
			const fileName = `Reporte-Autogestion-${moment().format("YYYYMMDD")}.${fileExtension}`;
			triggerFileDownload(fileRes.data, fileName);

			yield put(closeSnackNotification({}));
			yield put(onCommissionNextToPayGeneralReportGenSuccess(success));
			yield put(
				enqueueSnackNotification({
					message: {
						type: "success",
						variant: "success",
						title: "¡Descarga finalizada!",
						dismissible: true,
					},
				}),
			);
		} else if (error) {
			yield put(onCommissionNextToPayGeneralReportGenError(error));
			throw Error(error);
		}
	} catch (e) {
		yield put(closeSnackNotification({}));
		yield put(
			enqueueSnackNotification({
				message: {
					type: "error",
					variant: "error",
					title: "Ha ocurrido un error, intenta de nuevo",
					dismissible: true,
				},
			}),
		);
	}
}
