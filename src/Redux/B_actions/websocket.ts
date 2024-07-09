import { createAction } from "redux-actions";
import { REPORT_GENERATION_ERROR, REPORT_GENERATION_START, REPORT_GENERATION_SUCCESS } from "../A_constants/websocket";

export const reportGenerationStart = createAction(REPORT_GENERATION_START);
export const reportGenerationSuccess = createAction(REPORT_GENERATION_SUCCESS);
export const reportGenerationError = createAction(REPORT_GENERATION_ERROR);
