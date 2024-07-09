import React from "react";
import { act } from "react-dom/test-utils";

import { IconButton } from "@material-ui/core";

import { getAccessToken } from "../../../../../Redux/E_selectors/app_auth";

import { mockedAppAuthStateWithUser } from "../../../../../Tests/Mocks/states/Auth";
import { renderWithReduxAndRouter } from "../../../../../Tests/Helpers";
import HeaderContent from "./HeaderContent";

describe("HeaderContent Standard Component", () => {
	it("user should be able to logout", () => {
		const mockedState = mockedAppAuthStateWithUser;
		const { container, store } = renderWithReduxAndRouter(<HeaderContent />, mockedState);

		const logoutBtn = container.find(IconButton).filter({ "aria-label": "logout" });

		expect(logoutBtn.exists()).toBe(true);
		jest.useFakeTimers();
		act(() => {
			logoutBtn.simulate("click");
			jest.runAllTimers();
		});
		jest.useRealTimers();
		expect(getAccessToken(store.getState())).toBe("");
	});
});
