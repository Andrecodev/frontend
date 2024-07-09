export const initialState = {
	publications: [],
	wrapperTitle: "Publicaciones y documentos",
	searchInput: "",
	publicationsFiltered: [],
	documentsSuggested: [],
	categoryItems: [],
	isCategorySelected: false,
	isSearchButtonClicked: false,
	isLoading: true,
};

export const ACTIONS = {
	SET_PUBLICATIONS: "SET_PUBLICATIONS",
	SET_WRAPPER_TITLE: "SET_WRAPPER_TITLE",
	SET_SEARCH_INPUT: "SET_SEARCH_INPUT",
	SET_DATA_FILTERED: "SET_DATA_FILTERED",
	SET_DOCUMENTS_SUGGESTED: "SET_DOCUMENTS_SUGGESTED",
	SET_BUTTON_CLICKED: "SET_BUTTON_CLICKED",
	SET_CATEGORY_CLICKED: "SET_CATEGORY_CLICKED",
	SET_CATEGORY_ITEMS: "SET_CATEGORY_ITEMS",
	CLEAR_SEARCH_INPUT: "CLEAR_SEARCH_INPUT",
	SET_LOADING: "SET_LOADING",
};

export const publicationsReducer = (state: any, action: any) => {
	switch (action.type) {
		case ACTIONS.SET_PUBLICATIONS:
			return { ...state, publications: action.payload };
		case ACTIONS.SET_WRAPPER_TITLE:
			return { ...state, wrapperTitle: action.payload };
		case ACTIONS.SET_SEARCH_INPUT:
			return { ...state, searchInput: action.payload };
		case ACTIONS.SET_DATA_FILTERED:
			return { ...state, publicationsFiltered: action.payload };
		case ACTIONS.SET_DOCUMENTS_SUGGESTED:
			return { ...state, documentsSuggested: action.payload };
		case ACTIONS.SET_CATEGORY_ITEMS:
			return { ...state, categoryItems: action.payload };
		case ACTIONS.SET_CATEGORY_CLICKED:
			return { ...state, isCategorySelected: action.payload };
		case ACTIONS.SET_BUTTON_CLICKED:
			return { ...state, isSearchButtonClicked: action.payload };
		case ACTIONS.CLEAR_SEARCH_INPUT:
			return { ...state, searchInput: action.payload };
		case ACTIONS.SET_LOADING:
			return { ...state, isLoading: action.payload };
		default:
			return state;
	}
};
