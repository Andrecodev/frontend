import { takeEvery } from "redux-saga/effects";
import {
	handleCommissionDetailsFetch,
	handleCommissionTotalsFetch,
	handleCommissionCalendarFetch,
	handleCommissionScheduleFetch,
	handleCommissionCofcontrolFetch,
	handleCommissionChargeRequest,
	handleCommissionChargeFetch,
	handleCommissionNTPGeneralReportGenFetch,
} from "../../Client/Commissions/NextToPay";
import {
	GET_COMMISSION_NEXTTOPAY_DETAILS_FETCHING,
	GET_COMMISSION_NEXTTOPAY_TOTALS_FETCHING,
	GET_COMMISSION_NEXTTOPAY_CALENDAR_FETCHING,
	GET_COMMISSION_NEXTTOPAY_SCHEDULE_FETCHING,
	GET_COMMISSION_NEXTTOPAY_COFCONTROL_FETCHING,
	GET_COMMISSION_NEXTTOPAY_CHARGE_REQUEST_FETCHING,
	GET_COMMISSION_NEXTTOPAY_CHARGE_FETCH_FETCHING,
	GET_COMMISSION_NEXTTOPAY_GENERAL_REPORT_GEN_FETCHING,
} from "../A_constants/business_commissions_ntpay";
import { GET_COMMISSION_PAYROLLS_GENERAL_REPORT_GEN_FETCHING } from "../A_constants/business_commissions_payrolls";
import { handleCommissionPayrollsGeneralReportGenFetch } from "../../Client/Commissions/Payrolls";

export function* watchCommissionsNextToPayStart() {
	yield takeEvery(GET_COMMISSION_NEXTTOPAY_DETAILS_FETCHING, handleCommissionDetailsFetch);
	yield takeEvery(GET_COMMISSION_NEXTTOPAY_TOTALS_FETCHING, handleCommissionTotalsFetch);
	yield takeEvery(GET_COMMISSION_NEXTTOPAY_CALENDAR_FETCHING, handleCommissionCalendarFetch);
	yield takeEvery(GET_COMMISSION_NEXTTOPAY_SCHEDULE_FETCHING, handleCommissionScheduleFetch);
	yield takeEvery(GET_COMMISSION_NEXTTOPAY_COFCONTROL_FETCHING, handleCommissionCofcontrolFetch);
	yield takeEvery(GET_COMMISSION_NEXTTOPAY_CHARGE_REQUEST_FETCHING, handleCommissionChargeRequest);
	yield takeEvery(GET_COMMISSION_NEXTTOPAY_CHARGE_FETCH_FETCHING, handleCommissionChargeFetch);
	yield takeEvery(GET_COMMISSION_NEXTTOPAY_GENERAL_REPORT_GEN_FETCHING, handleCommissionNTPGeneralReportGenFetch);
}
