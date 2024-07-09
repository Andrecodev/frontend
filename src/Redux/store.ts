import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from "connected-react-router";
import reduxWebsocket from "@yalopov/redux-websocket";

import { history, reducer } from "./D_reducers";
import sagas from "./F_sagas";

const REACT_APP_STAGE = process.env.REACT_APP_STAGE;

export const generateStore = () => {
	let reduxStore;
	const sagaMiddleware = createSagaMiddleware();
	const reduxWebsocketMiddleware = reduxWebsocket({
		reconnectOnClose: true,
	});

	if (REACT_APP_STAGE === "dev") {
		const composeEnhancers = composeWithDevTools({
			trace: true,
			traceLimit: 25,
		});

		reduxStore = createStore(
			reducer,
			composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware, reduxWebsocketMiddleware)),
		);
	} else {
		reduxStore = createStore(
			reducer,
			applyMiddleware(routerMiddleware(history), sagaMiddleware, reduxWebsocketMiddleware),
		);
	}

	sagaMiddleware.run(sagas);
	return reduxStore;
};

export const store = generateStore();
