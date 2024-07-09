import { useDispatch, useSelector } from "react-redux";

import { Axios } from "../index";
import { call, put, select } from "redux-saga/effects";
import {
	getOverCommissionsErrorPlanillaSuccess,
	getOverCommissionsErrorPlanillaError,
} from "../../Redux/B_actions/error_planilla_comission";
import { getBroker } from "../../Redux/E_selectors/app_broker";
import { IBrokerState } from "../../Redux/C_states/IBrokerState";
import { Config } from "../../Config/constants/env_variables";

const getRequestCommissionErrorPlanilla = (brokerKey: number, company: string, period: string) => {
	// return Axios.post(Config.URL_ENDPOINT_REQUESTS + "/commissions"
	// return Axios.post(Config.URL_ENDPOINT_PLANILLAS + "/POLIZAS",
	return Axios.get(Config.URL_ENDPOINT_PAYROLLS + "/details", {
		params: {
			brokerKey,
			company,
			period,
		},
	});
};

export function* handleOverCommissionErrorPlanillatFetch() {
	try {
		const broker: IBrokerState = yield select(getBroker);
		const { brokerKey } = broker;
		const company = "1-request";
		const period = "000000";

		const response = yield call(getRequestCommissionErrorPlanilla, brokerKey, company, period);
		const {
			data: { data },
		} = response;
		if (data) {
			yield put(getOverCommissionsErrorPlanillaSuccess(data));
		} else {
			yield put(getOverCommissionsErrorPlanillaError());
		}
	} catch (e) {
		yield put(getOverCommissionsErrorPlanillaError(e.toString()));
	}
}
