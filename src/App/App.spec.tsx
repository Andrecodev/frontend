import React from "react";
import App from "./";
import { renderWithReduxAndRouter } from "../Tests/Helpers";
import { defaultGlobalState, IGlobalState } from "../Redux/C_states";
import { Loader } from "./Components/public";
import Routes from "./Routes";
import { act } from "react-dom/test-utils";
import { createStore } from "redux";
import { reducer } from "../Redux/D_reducers";
import { Route } from "react-router";

describe("App", () => {
	it("Loaded", () => {
		const { container } = renderWithReduxAndRouter(<App />, { ...defaultGlobalState });
		expect(container.find(Loader).exists()).toBe(true);
		expect(container.find(Routes).exists()).toBe(true);
	});
});

describe("Routes", () => {
	it("Token", () => {
		const mockedState: IGlobalState = {
			...defaultGlobalState,
			app_auth: {
				...defaultGlobalState.app_auth,
				accessToken: "test-token",
			},
		};

		const { container } = renderWithReduxAndRouter(<Routes />, mockedState);
		act(() => {
			mockedState.app_auth.user_idle_time_modal_before_token_expiration = 100;
			const newStore = createStore(reducer, mockedState);
			container.setProps({ store: newStore });
			container.update();
		});

		expect(container.find(Route).exists()).toBe(true);
	});
});
