import { Axios } from "../index";
import { call, put, select } from "redux-saga/effects";
import { Config } from "../../Config/constants/env_variables";
import {
	getCommissionPayrollsTotalsData,
	getCommissionPayrollsSelectedYear,
	getCommissionPayrollsSelectedMonth,
	getCommissionPayrolls,
	getCommissionPayrollsCompanyId,
} from "../../Redux/E_selectors/business_commissions_payrolls";
import { getBroker, getBrokerKey } from "../../Redux/E_selectors/app_broker";
import {
	onCommissionPayrollsTotalsSuccess,
	onCommissionPayrollsTotalsError,
	onCommissionPayrollsStatusSuccess,
	onCommissionPayrollsStatusError,
	onCommissionPayrollsDetailsSuccess,
	onCommissionPayrollsDetailsError,
	onCommissionPayrollsSingleReportGenError,
	onCommissionPayrollsSingleReportGenSuccess,
	onCommissionPayrollsGeneralReportGenSuccess,
	onCommissionPayrollsGeneralReportGenError,
} from "../../Redux/B_actions/business_commissions_payrolls";
import { leftpad } from "../../Config/utils/strings";
import { connect, send } from "@yalopov/redux-websocket/dist";
import { race, take } from "redux-saga-test-plan/matchers";
import {
	REDUX_WEBSOCKET_OPEN,
	REPORT_GENERATION_ERROR,
	REPORT_GENERATION_START,
	REPORT_GENERATION_SUCCESS,
} from "../../Redux/A_constants/websocket";
import moment from "moment";
import { triggerFileDownload } from "../../Config/utils/files";
import { useSnackbar } from "notistack";
import { closeSnackNotification, enqueueSnackNotification } from "../../Redux/B_actions/snack_notifications";
import { getAccessToken } from "../../Redux/E_selectors/app_auth";

const getCommissionPayrollsTotals = (
	brokerKey: number,
	company: number,
	selectedYear: number,
	selectedMonth: number,
) => {
	const currentMonth = leftpad(selectedMonth + 1);

	return Axios.get(Config.URL_ENDPOINT_PAYROLLS + "/headers", {
		params: {
			brokerKey,
			company,
			period: `${selectedYear}${currentMonth}`,
		},
	});
};

export function* handleCommissionPayrollsTotalsFetch() {
	try {
		const companyId = yield select(getCommissionPayrollsCompanyId);
		const broker = yield select(getBroker);
		const selectedYear = yield select(getCommissionPayrollsSelectedYear);
		const selectedMonth = yield select(getCommissionPayrollsSelectedMonth);
		const { brokerKey } = broker;

		const response = yield call(getCommissionPayrollsTotals, brokerKey, companyId, selectedYear, selectedMonth);
		const {
			data: { data },
		} = response;
		if (data) {
			yield put(onCommissionPayrollsTotalsSuccess(data));
		} else {
			yield put(onCommissionPayrollsTotalsError());
		}
	} catch (e) {
		yield put(onCommissionPayrollsTotalsError(e.toString()));
	}
}

const getCommissionPayrollsDetails = (
	brokerKey: number,
	company: string,
	selectedYear: number,
	selectedMonth: number,
) => {
	const currentMonth = selectedMonth + 1;
	const pad = "00";
	const monthVal = (pad + currentMonth).slice(-pad.length);

	return Axios.get(Config.URL_ENDPOINT_PAYROLLS + "/details", {
		params: {
			brokerKey,
			company,
			period: `${selectedYear}${monthVal}`,
		},
	});
};

export function* handleCommissionPayrollsDetailsFetch() {
	try {
		const companyId = yield select(getCommissionPayrollsCompanyId);
		const broker = yield select(getBroker);
		const selectedYear = yield select(getCommissionPayrollsSelectedYear);
		const selectedMonth = yield select(getCommissionPayrollsSelectedMonth);
		const { brokerKey } = broker;
		const company = `${companyId}-comission`;
		const response = yield call(getCommissionPayrollsDetails, brokerKey, company, selectedYear, selectedMonth);
		const {
			data: { data },
		} = response;
		if (data) {
			yield put(onCommissionPayrollsDetailsSuccess(data));
		} else {
			yield put(onCommissionPayrollsDetailsError());
		}
	} catch (e) {
		yield put(onCommissionPayrollsDetailsError(e.toString()));
	}
}

const getCommissionPayrollsStatus = (
	brokerKey: number,
	company: number,
	selectedYear: number,
	selectedMonth: number,
) => {
	return Axios.get(Config.URL_ENDPOINT_COMMISSIONS + "/payrolls-status", {
		params: {
			brokerKey,
			company,
			selectedYear,
			selectedMonth,
		},
	});
};

export function* handleCommissionPayrollsStatusFetch() {
	try {
		const companyId: number = yield select(getCommissionPayrollsCompanyId);
		const broker = yield select(getBroker);
		const selectedYear = yield select(getCommissionPayrollsSelectedYear);
		const selectedMonth = yield select(getCommissionPayrollsSelectedMonth);
		const { cod_intermediary: brokerKey } = broker;

		const response = yield call(getCommissionPayrollsStatus, brokerKey, companyId, selectedYear, selectedMonth);
		const {
			data: { data },
		} = response;
		if (data) {
			yield put(onCommissionPayrollsStatusSuccess(data));
		} else {
			yield put(onCommissionPayrollsStatusError());
		}
	} catch (e) {
		yield put(onCommissionPayrollsStatusError(e.toString()));
	}
}

export const downloadReportFile = (reportUrl: string) => {
	return Axios.get(reportUrl, { responseType: "blob" });
};

export function* handleCommissionPayrollsSingleReportGenFetch(action: any) {
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
			payload: { brokerKey, payroll, period, company, formatParam },
		} = action;

		const payload = {
			body: {
				company,
				payroll: String(payroll),
				period,
				format: formatParam,
				chunkSize: 1000,
				duplicates: 0,
				type: "single",
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
					subtitle: `Reporte individual (${formatParam})`,
				},
				options: {
					persist: true,
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
			const fileName = `Reporte-Planillas-Individual-${moment().format("YYYYMMDD")}.${fileExtension}`;
			triggerFileDownload(fileRes.data, fileName);

			yield put(closeSnackNotification({}));
			yield put(onCommissionPayrollsSingleReportGenSuccess(success));
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
			yield put(onCommissionPayrollsSingleReportGenError(error));
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

export function* handleCommissionPayrollsGeneralReportGenFetch(action: any) {
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
			payload: { brokerKey, period, filteredBrokerKeys, wordFilter: searchTerm },
		} = action;

		const payload = {
			body: {
				format: "xlsx",
				chunkSize: 1000,
				duplicates: 0,
				company: 1,
				period,
				...(filteredBrokerKeys.length > 0 ? { keys: filteredBrokerKeys } : {}),
				...(searchTerm ? { searchTerm } : {}),
				type: "consolidated",
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
			const fileName = `Reporte-Planillas-General-${moment().format("YYYYMMDD")}.${fileExtension}`;
			triggerFileDownload(fileRes.data, fileName);

			yield put(closeSnackNotification({}));
			yield put(onCommissionPayrollsGeneralReportGenSuccess(success));
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
			yield put(onCommissionPayrollsGeneralReportGenError(error));
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
