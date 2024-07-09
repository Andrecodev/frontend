import React from "react";

import { Provider } from "react-redux";
import { store } from "../Redux/store";
import Routes from "./Routes";

import "../Language";
import { Loader } from "./Components/public";
import { MemoryRouter } from "react-router";
import ExtraUrlPath from "./Components/public/Utils/ExtraUrlPath";

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<MemoryRouter>
				<ExtraUrlPath />
				<Routes />
				<Loader />
			</MemoryRouter>
		</Provider>
	);
};

export default App;
