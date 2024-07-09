import {
	SECTION_COMMENTS,
	SECTION_FILES_UPLOAD,
	SECTION_POLICY_PAYMENT_LIST,
	SECTION_POLICY_SELECTION_TABLE,
	SECTION_TYPE_COLLECTION_POLICY_LEGALIZATION,
	SECTION_TYPE_COLLECTION_POLICY_REACTIVATION,
	SECTION_TYPE_COLLECTION_RECEIPT_COPY,
	SECTION_TYPE_SARLAFT_TAKER_INSURED,
	SECTION_TYPE_SARLAFT_TAKER_ONLY,
	SECTION_TYPE_COLLECTION_REQUEST_POLICY_STATE,
	SECTION_TYPE_COLLECTION_REQUEST_PORTFOLIO_RECONCILIATION,
	SECTION_TYPE_COLLECTION_REQUEST_PREMIUM_RETURNS,
	SECTION_TYPE_COLLECTION_REQUEST_AUTOMATIC_DEBIT,
	SECTION_TYPE_COLLECTION_REQUEST_PAYMENT_AGREEMENT,
	SECTION_TYPE_COLLECTION_REQUEST_PAYMENT_CERTIFICATIONS,
	SECTION_TYPE_COLLECTION_COLLECTION_REQUEST_BANK_ACCOUNTUPDATE,
	SECTION_TYPE_COLLECTION_COLLECTION_REQUEST_REGIME_CHANGE,
	SECTION_TYPE_COLLECTION_COLLECTION_REQUEST_WITHHOLDING_CERTIFICATES,
	SECTION_TYPE_COLLECTION_COLLECTION_REQUEST_RETURN_ERROR,
	SECTION_TYPE_COLLECTION_COLLECTION_REQUEST_LEGALIZATION_INVOICES,
	SECTION_TYPE_COLLECTION_COLLECTION_REQUEST_STACK_WORKSHEET,
	SECTION_TYPE_COLLECTION_COLLECTION_REQUEST_ADJUSTMENT_REQUEST,
	REQUEST_STATUS_SUPPORT_DATA,
	REQUEST_STATUS_BUSSINES_DATA,
	SECTION_ACTV_PUNCTUAL,
	SECTION_TYPE_COLLECTION_COLLECTION_REQUEST_PENDING_PAYMENTS,
	SECTION_TYPE_COLLECTION_REQUEST_BILL_ELECTRONIC_ERROR,
	SECTION_TYPE_COLLECTION_REQUEST_BILL_UPDATE_DATA,
	SECTION_TYPE_COLLECTION_REQUEST_BILL_BILL_DETAILS,
	SECTION_TYPE_COLLECTION_COLLECTION_REQUEST_OTHERS,
} from "../../Redux/A_constants/requests_create";

export interface ISection {
	type: string;
	min?: number;
	max?: number;
	hideOnCreate?: boolean;
	hideOnEdit?: boolean;
	renderWithTakerData?: boolean;
}

export interface IRequestsBusinessTableControl {
	[requestSubtype: string]: {
		create: Array<ISection>;
		edit?: Array<ISection>;
	};
}

export const RequestsBusinessTableControl: IRequestsBusinessTableControl = {
	[SECTION_TYPE_COLLECTION_POLICY_LEGALIZATION]: {
		create: [
			{
				type: SECTION_POLICY_SELECTION_TABLE,
			},
		],
		edit: [
			{
				type: SECTION_POLICY_SELECTION_TABLE,
			},
			{
				type: SECTION_POLICY_PAYMENT_LIST,
			},
			{
				type: SECTION_FILES_UPLOAD,
				min: 1,
				max: 1000,
			},
			{
				type: SECTION_COMMENTS,
				min: 1,
				max: 1,
			},
		],
	},
	// "Collection.unique.Collective": [
	//   {
	//     type: "SectionClientProduct",
	//     min: 1,
	//     max: 1
	//   },
	//   {
	//     type: "SectionCertificatesValid",
	//     min: 1,
	//     max: 1
	//   },
	//   {
	//     type: "SectionFilesUpload",
	//     min: 1,
	//     max: 1000
	//   },
	//   {
	//     type: "SectionComments",
	//     min: 1,
	//     max: 1
	//   }
	// ],

	// requestCommission

	//
	// SECTION_TYPE_COLLECTION_COLLECTION_REQUEST_WITHHOLDING_CERTIFICATES
	// SECTION_TYPE_COLLECTION_COLLECTION_REQUEST_RETURN_ERROR
	// SECTION_TYPE_COLLECTION_COLLECTION_REQUEST_LEGALIZATION_INVOICES
	// SECTION_TYPE_COLLECTION_COLLECTION_REQUEST_STACK_WORKSHEET
	// SECTION_TYPE_COLLECTION_COLLECTION_REQUEST_ADJUSTMENT_REQUEST
	[SECTION_TYPE_COLLECTION_COLLECTION_REQUEST_REGIME_CHANGE]: {
		create: [
			// {
			// 	type: "SectionClientProduct",
			// 	min: 1,
			// 	max: 1,
			// },
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1000,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
			{
				type: "SectionSubmit",
				hideOnEdit: true,
			},
		],
		edit: [
			// {
			// 	type: "SectionClientProduct",
			// 	min: 1,
			// 	max: 1,
			// },
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1000,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
		],
	},
	[SECTION_TYPE_COLLECTION_COLLECTION_REQUEST_BANK_ACCOUNTUPDATE]: {
		create: [
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1000,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
			{
				type: "SectionSubmit",
				hideOnEdit: true,
			},
		],
		edit: [
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1000,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
		],
	},
	[SECTION_TYPE_COLLECTION_REQUEST_BILL_ELECTRONIC_ERROR]: {
		create: [
			{
				type: "SectionBillElectronic",
				min: 1,
				max: 1,
			},
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1000,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
			{
				type: "SectionSubmit",
				hideOnEdit: true,
			},
		],
		edit: [
			{
				type: "SectionClientProduct",
				min: 1,
				max: 1,
			},
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1000,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
		],
	},

	[SECTION_TYPE_COLLECTION_REQUEST_BILL_BILL_DETAILS]: {
		create: [
			{
				type: "SectionBillElectronic",
				min: 1,
				max: 1,
			},
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1000,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
			{
				type: "SectionSubmit",
				hideOnEdit: true,
			},
		],
		edit: [
			{
				type: "SectionClientProduct",
				min: 1,
				max: 1,
			},
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1000,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
		],
	},
	[SECTION_TYPE_COLLECTION_REQUEST_BILL_UPDATE_DATA]: {
		create: [
			{
				type: "SectionBillElectronic",
				min: 1,
				max: 1,
			},
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1000,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
			{
				type: "SectionSubmit",
				hideOnEdit: true,
			},
		],
		edit: [
			{
				type: "SectionClientProduct",
				min: 1,
				max: 1,
			},
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1000,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
		],
	},
	[SECTION_TYPE_COLLECTION_COLLECTION_REQUEST_STACK_WORKSHEET]: {
		create: [
			{
				type: "SectionWorksheet",
				min: 1,
				max: 1,
			},
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1000,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
			{
				type: "SectionSubmit",
				hideOnEdit: true,
			},
		],
		edit: [
			{
				type: "SectionWorksheet",
				min: 1,
				max: 1,
			},
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1000,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
		],
	},
	[SECTION_TYPE_COLLECTION_COLLECTION_REQUEST_ADJUSTMENT_REQUEST]: {
		create: [
			{
				type: "SectionErrorPlanillaPila",
				min: 1,
				max: 1,
			},
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1000,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
			{
				type: "SectionSubmit",
				hideOnEdit: true,
			},
		],
		edit: [
			{
				type: "SectionErrorPlanillaPila",
				min: 1,
				max: 1,
			},
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1000,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
		],
	},
	[SECTION_TYPE_COLLECTION_COLLECTION_REQUEST_PENDING_PAYMENTS]: {
		create: [
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1000,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
			{
				type: "SectionSubmit",
				hideOnEdit: true,
			},
		],
		edit: [
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1000,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
		],
	},
	[SECTION_TYPE_COLLECTION_COLLECTION_REQUEST_OTHERS]: {
		create: [
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1000,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
			{
				type: "SectionSubmit",
				hideOnEdit: true,
			},
		],
		edit: [
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1000,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
		],
	},
	[SECTION_TYPE_COLLECTION_COLLECTION_REQUEST_RETURN_ERROR]: {
		create: [
			{
				type: "SectionErrorPlanillaPila",
				min: 1,
				max: 1,
			},
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1000,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
			{
				type: "SectionSubmit",
				hideOnEdit: true,
			},
		],
		edit: [
			{
				type: "SectionErrorPlanillaPila",
				min: 1,
				max: 1,
			},
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1000,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
		],
	},
	[SECTION_TYPE_COLLECTION_COLLECTION_REQUEST_WITHHOLDING_CERTIFICATES]: {
		create: [
			{
				type: "SectionCertificates",
				min: 1,
				max: 1,
			},
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1000,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
			{
				type: "SectionSubmit",
				hideOnEdit: true,
			},
		],
		edit: [
			{
				type: "SectionCertificates",
				min: 1,
				max: 1,
			},
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1000,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
		],
	},
	[SECTION_TYPE_COLLECTION_COLLECTION_REQUEST_LEGALIZATION_INVOICES]: {
		create: [
			{
				type: "SectionInvoiceLegalization",
				min: 1,
				max: 1,
			},
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1000,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
			{
				type: "SectionSubmit",
				hideOnEdit: true,
			},
		],
		edit: [
			{
				type: "SectionInvoiceLegalization",
				min: 1,
				max: 1,
			},
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1000,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
		],
	},
	[SECTION_TYPE_COLLECTION_POLICY_REACTIVATION]: {
		create: [
			{
				type: "SectionClientProduct",
				min: 1,
				max: 1,
			},
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1000,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
			{
				type: "SectionSubmit",
				hideOnEdit: true,
			},
		],
		edit: [
			{
				type: "SectionClientProduct",
				min: 1,
				max: 1,
			},
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1000,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
		],
	},
	[SECTION_TYPE_COLLECTION_RECEIPT_COPY]: {
		create: [
			{
				type: "SectionClientProduct",
				min: 1,
				max: 1,
			},
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1000,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
			{
				type: "SectionSubmit",
				hideOnEdit: true,
			},
		],
		edit: [
			{
				type: "SectionClientProduct",
				min: 1,
				max: 1,
			},
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1000,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
		],
	},
	[SECTION_TYPE_SARLAFT_TAKER_ONLY]: {
		create: [
			{
				type: "SectionSarlaftTakerPersonalInfo",
			},
			{
				type: "SectionSarlaftPersonalInfo",
				hideOnCreate: true,
				renderWithTakerData: true,
			},
			{
				type: "SectionSubmit",
				hideOnEdit: true,
			},
		],
	},
	[SECTION_TYPE_SARLAFT_TAKER_INSURED]: {
		create: [
			{
				type: "SectionSarlaftTakerPersonalInfo",
			},
			{
				type: "SectionSarlaftPersonalInfo",
			},
			{
				type: "SectionSubmit",
				hideOnEdit: true,
			},
		],
	},
	[SECTION_TYPE_COLLECTION_REQUEST_PAYMENT_CERTIFICATIONS]: {
		create: [
			{
				type: "SectionClientProduct",
				min: 1,
				max: 1,
			},
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1000,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
			{
				type: "SectionSubmit",
				hideOnEdit: true,
			},
		],
		edit: [
			{
				type: "SectionClientProduct",
				min: 1,
				max: 1,
			},
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1000,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
		],
	},
	[SECTION_TYPE_COLLECTION_REQUEST_PORTFOLIO_RECONCILIATION]: {
		create: [
			{
				type: "SectionClientProduct",
				min: 1,
				max: 1,
			},
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1000,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
			{
				type: "SectionSubmit",
				hideOnEdit: true,
			},
		],
		edit: [
			{
				type: "SectionClientProduct",
				min: 1,
				max: 1,
			},
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1000,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
		],
	},
	[SECTION_TYPE_COLLECTION_REQUEST_PAYMENT_AGREEMENT]: {
		create: [
			{
				type: "SectionClientProduct",
				min: 1,
				max: 1,
			},
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1000,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
			{
				type: "SectionSubmit",
				hideOnEdit: true,
			},
		],
		edit: [
			{
				type: "SectionClientProduct",
				min: 1,
				max: 1,
			},
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1000,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
		],
	},
	[SECTION_TYPE_COLLECTION_REQUEST_AUTOMATIC_DEBIT]: {
		create: [
			{
				type: "SectionClientProduct",
				min: 1,
				max: 1,
			},
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1000,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
			{
				type: "SectionSubmit",
				hideOnEdit: true,
			},
		],
		edit: [
			{
				type: "SectionClientProduct",
				min: 1,
				max: 1,
			},
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1000,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
		],
	},
	[SECTION_TYPE_COLLECTION_REQUEST_POLICY_STATE]: {
		create: [
			{
				type: "SectionClientProduct",
				min: 1,
				max: 1,
			},
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1000,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
			{
				type: "SectionSubmit",
				hideOnEdit: true,
			},
		],
		edit: [
			{
				type: "SectionClientProduct",
				min: 1,
				max: 1,
			},
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1000,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
		],
	},
	[SECTION_TYPE_COLLECTION_REQUEST_PREMIUM_RETURNS]: {
		create: [
			{
				type: "SectionClientProduct",
				min: 1,
				max: 1,
			},
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1000,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
			{
				type: "SectionSubmit",
				hideOnEdit: true,
			},
		],
		edit: [
			{
				type: "SectionClientProduct",
				min: 1,
				max: 1,
			},
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1000,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
		],
	},
	[SECTION_TYPE_COLLECTION_RECEIPT_COPY]: {
		create: [
			{
				type: "SectionClientProduct",
				min: 1,
				max: 1,
			},
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1000,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
			{
				type: "SectionSubmit",
				hideOnEdit: true,
			},
		],
		edit: [
			{
				type: "SectionClientProduct",
				min: 1,
				max: 1,
			},
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1000,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
		],
	},
	[REQUEST_STATUS_SUPPORT_DATA]: {
		create: [
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
			{
				type: "SectionSubmit",
				hideOnEdit: true,
			},
		],
		edit: [
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
		],
	},
	[REQUEST_STATUS_BUSSINES_DATA]: {
		create: [
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
			{
				type: "SectionSubmit",
				hideOnEdit: true,
			},
		],
		edit: [
			{
				type: "SectionFilesUpload",
				min: 1,
				max: 1,
			},
			{
				type: "SectionComments",
				min: 1,
				max: 1,
			},
		],
	},
	[SECTION_ACTV_PUNCTUAL]: {
		create: [
			{
				type: "SectionHabeasDataInfo",
			},
			{
				type: "SectionSubmit",
				hideOnEdit: true,
			},
		],
	},
};
