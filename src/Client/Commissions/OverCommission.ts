import { useDispatch, useSelector } from "react-redux";

import { Axios } from "../index";
import { call, put, select } from "redux-saga/effects";
import {
	getOverCommissionsCurrentSuccess,
	getOverCommissionsCurrentError,
	getOverCommissionsCurrentPymeSuccess,
	getOverCommissionsCurrentPymeError,
	getOverCommissionsCurrentHomeSuccess,
	getOverCommissionsCurrentHomeError,
	getOverCommissionsStorieSucces,
	getOverCommissionsStorieError,
	getOverCommissionsBranch,
	getOverCommissionsPymeStorieSucces,
	getOverCommissionsPymeStorieError,
	getOverCommissionsHomeStorieSucces,
	getOverCommissionsHomeStorieError,
} from "../../Redux/B_actions/business_overcommissions";

import { getBroker } from "../../Redux/E_selectors/app_broker";
import { IBrokerState } from "../../Redux/C_states/IBrokerState";
import { selectOverCommissionsBranch } from "../../Redux/E_selectors/business_overcommissions";
import { IGetBranch } from "../../Redux/C_states/IBusinessOverCommissions";
import { Config } from "../../Config/constants/env_variables";
import { CarPercentages } from "mocks/servicePercentages";

const getOverCommissionStorie = (brokerKey: number, branch: string, sbu: string) => {
	return Axios.post(Config.URL_ENDPOINT_OVERCOMMISSIONS + "/storie?brokerKey=" + brokerKey, {
		branch,
		sbu,
	});
};

export function* handleOverCommissionStorieFetch() {
	try {
		const branch: IGetBranch[] = yield select(selectOverCommissionsBranch);
		const { value } = branch[0];
		const sbu = "AUT";
		const broker: IBrokerState = yield select(getBroker);
		const { brokerKey } = broker;

		const response = yield call(getOverCommissionStorie, brokerKey, value, sbu);
		const {
			data: { data },
		} = response;
		if (data) {
			yield put(getOverCommissionsStorieSucces(data));
		} else {
			yield put(getOverCommissionsStorieError());
		}
	} catch (e) {
		yield put(getOverCommissionsStorieError(e.toString()));
	}
}

export function* handleOverCommissionPymeStorieFetch() {
	try {
		const branch: IGetBranch[] = yield select(selectOverCommissionsBranch);
		const { value } = branch[1];
		const sbu = "OTH";
		const broker: IBrokerState = yield select(getBroker);
		const { brokerKey } = broker;

		const response = yield call(getOverCommissionStorie, brokerKey, value, sbu);
		const {
			data: { data },
		} = response;
		if (data) {
			yield put(getOverCommissionsPymeStorieSucces(data));
		} else {
			yield put(getOverCommissionsPymeStorieError());
		}
	} catch (e) {
		yield put(getOverCommissionsPymeStorieError(e.toString()));
	}
}

export function* handleOverCommissionHomeStorieFetch() {
	try {
		const branch: IGetBranch[] = yield select(selectOverCommissionsBranch);
		const { value } = branch[2];
		const sbu = "OTH";
		const broker: IBrokerState = yield select(getBroker);
		const { brokerKey } = broker;

		const response = yield call(getOverCommissionStorie, brokerKey, value, sbu);
		const {
			data: { data },
		} = response;
		if (data) {
			yield put(getOverCommissionsHomeStorieSucces(data));
		} else {
			yield put(getOverCommissionsHomeStorieError());
		}
	} catch (e) {
		yield put(getOverCommissionsHomeStorieError(e.toString()));
	}
}

const getOverCommissionCurrent = (brokerKey: number, branch: string, sbu: string) => {
	return Axios.post(Config.URL_ENDPOINT_OVERCOMMISSIONS + "/current?brokerKey=" + brokerKey, {
		branch,
		sbu,
	});
};

export function* handleOverCommissionCurrentFetch() {
	try {
		const branch: IGetBranch[] = yield select(selectOverCommissionsBranch);
		// console.log("prueba current branch ", branch);
		const { value } = branch[0];

		const sbu = "AUT";
		const broker: IBrokerState = yield select(getBroker);
		const { brokerKey } = broker;

		const response = yield call(getOverCommissionCurrent, brokerKey, value, sbu);

		const {
			data: { data },
		} = response;
		if (data) {
			yield put(getOverCommissionsCurrentSuccess({ ...data, branch: value }));
		} else {
			yield put(getOverCommissionsCurrentError());
		}
	} catch (e) {
		yield put(getOverCommissionsCurrentError(e.toString()));
	}
}

export function* handleOverCommissionCurrentPymeFetch() {
	try {
		const branch: IGetBranch[] = yield select(selectOverCommissionsBranch);
		// console.log("prueba current branch ", branch);
		const { value } = branch[1];

		const sbu = "OTH";
		const broker: IBrokerState = yield select(getBroker);
		const { brokerKey } = broker;

		const response = yield call(getOverCommissionCurrent, brokerKey, value, sbu);

		const {
			data: { data },
		} = response;
		if (data) {
			yield put(getOverCommissionsCurrentPymeSuccess({ ...data, branch: value }));
		} else {
			yield put(getOverCommissionsCurrentPymeError());
		}
	} catch (e) {
		yield put(getOverCommissionsCurrentPymeError(e.toString()));
	}
}

export function* handleOverCommissionCurrentHomeFetch() {
	try {
		const branch: IGetBranch[] = yield select(selectOverCommissionsBranch);
		// console.log("prueba current branch ", branch);
		const { value } = branch[2];

		const sbu = "OTH";
		const broker: IBrokerState = yield select(getBroker);
		const { brokerKey } = broker;

		const response = yield call(getOverCommissionCurrent, brokerKey, value, sbu);

		const {
			data: { data },
		} = response;
		if (data) {
			yield put(getOverCommissionsCurrentHomeSuccess({ ...data, branch: value }));
		} else {
			yield put(getOverCommissionsCurrentHomeError());
		}
	} catch (e) {
		yield put(getOverCommissionsCurrentHomeError(e.toString()));
	}
}

export const ServiceOverCommissionBranch = async () => {
	const res = await Axios.get(`${Config.URL_ENDPOINT_UTILS}/OVERCOMMISSIONSBRANCHES`);
	return res.data.data.data;
};

export const ServiceGrowthpercentages = async (branch: any) => {
	const res = await Axios.get(`${Config.URL_ENDPOINT_UTILS}/GROWTHPERCENTAGES/${branch}`);
	return res.data.data.data;
	// return CarPercentages;
};

// export const getOvercommissionsAsset = async () => {
// 	//   // brokerKey: number,
// 	// ) => {
// 	// let reportUrl = Config.URL_ATTACHMENTS;
// 	let reportUrlTest = Config.URL_ATTACHMENTS + "AI_Liberty_Modelo_Sobrecomisiones.pdf";
// 	// const fileExtension = reportUrl.split(".").pop();
// 	const fileRes = await Axios.get(reportUrlTest, { responseType: "blob" });
// 	const urlReport = window.URL.createObjectURL(new Blob([fileRes.data]));
// 	// return { urlReport, fileExtension };
// 	return { urlReport };
// };

export const getOvercommissionsAsset = async (branch: any) => {
	let reportUrlTest = Config.URL_ATTACHMENTS + `${branch}_Liberty_Modelo_Sobrecomisiones.pdf`;
	const fileRes = await Axios.get(reportUrlTest, { responseType: "blob" });
	const urlReport = window.URL.createObjectURL(new Blob([fileRes.data]));
	return { urlReport };
};
