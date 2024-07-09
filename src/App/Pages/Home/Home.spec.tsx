import React from "react";
import Home from ".";
import Default from "./Default";
import { mount } from "enzyme";
import { Route, Router } from "react-router-dom";
import { defaultGlobalState } from "../../../Redux/C_states";
import { renderWithReduxAndRouter } from "../../../Tests/Helpers";
import Typography from "@material-ui/core/Typography";

describe("container Tab Component", () => {
	it("Home", () => {
		const { container } = renderWithReduxAndRouter(
			<Home match={{ match: { url: "/url" } }} location={{ state: undefined }} />,
			defaultGlobalState,
		);
		expect(container.find(Router).exists()).toBe(true);
	});

	it("Default", () => {
		const { container } = renderWithReduxAndRouter(<Default />, defaultGlobalState);
		expect(container.find(Typography).exists()).toBe(false);

		// const defaultComponent = mount(<Default />);
		// expect(defaultComponent.find(Typography).exists()).toBe(true);
	});
});
