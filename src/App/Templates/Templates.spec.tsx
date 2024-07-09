import React from "react";
import Standard from "./Standard";
import Empty from "./Empty";
import { defaultGlobalState, IGlobalState } from "../../Redux/C_states";
import { renderWithReduxAndRouter } from "../../Tests/Helpers";
import { defaultAppState } from "../../Redux/C_states/IAppState";
import { defaultAppTemplateStandardState } from "../../Redux/C_states/IAppTemplateStandardState";
import { shallow } from "enzyme";
import { ThemeProvider } from "@material-ui/styles";
import Nav from "./Standard/Layouts/Nav";
import BreadCrumb from "./Standard/Sources/BreadCrumb";

const desktopLigthTheme = {
	...defaultGlobalState,
	app: {
		...defaultGlobalState.app,
		theme: "light",
		screen: "md",
	},
};

const mobileDarkTheme = {
	...defaultGlobalState,
	app: {
		...defaultGlobalState.app,
		theme: "dark",
		screen: "md",
	},
};

const uncollapsedState: IGlobalState = {
	...desktopLigthTheme,
	app_template_standard: {
		...defaultAppTemplateStandardState,
		collapsible: true,
		collapsed: true,
		opened: true,
	},
};

const navbarHiddenState: IGlobalState = {
	...desktopLigthTheme,
	app_template_standard: {
		...defaultAppTemplateStandardState,
		templateNav: false,
		collapsible: true,
		collapsed: true,
		opened: true,
	},
};

const navbarShowState: IGlobalState = {
	...desktopLigthTheme,
	app_template_standard: {
		...defaultAppTemplateStandardState,
		templateNav: true,
		collapsible: true,
		collapsed: true,
		opened: true,
		breadcrumb: false,
		navWidth: {
			xs: 140,
			sm: 140,
			md: 140,
			lg: 140,
			xl: 140,
		},
	},
};

const navbarBreadcrumbShowState: IGlobalState = {
	...desktopLigthTheme,
	app_template_standard: {
		...defaultAppTemplateStandardState,
		templateNav: true,
		collapsible: true,
		collapsed: true,
		opened: true,
		breadcrumb: true,
		navWidth: {
			xs: 140,
			sm: 140,
			md: 140,
			lg: 140,
			xl: 140,
		},
	},
};

describe("Application Template", () => {
	it("Standard desktop - light theme", () => {
		const { container } = renderWithReduxAndRouter(
			<Standard>
				<span></span>
			</Standard>,
			{ ...desktopLigthTheme },
		);
		const element = container.find(".page");
		expect(element.exists()).toBe(true);
	});

	it("Standard mobile", () => {
		const mockedState = {
			...defaultGlobalState,
			app: {
				...defaultGlobalState.app,
				theme: "light",
				screen: "xs",
			},
		};
		const { container } = renderWithReduxAndRouter(
			<Standard>
				<span></span>
			</Standard>,
			mockedState,
		);
		const element = container.find(".appBar");
		expect(element.exists()).toBe(true);
	});

	it("Standard dark theme", () => {
		const { container } = renderWithReduxAndRouter(
			<Standard>
				<span></span>
			</Standard>,
			{ ...mobileDarkTheme },
		);
		const appbar = container.find(".appBar");
		expect(appbar.exists()).toBe(true);
	});

	it("Standard collapsed", () => {
		const { container } = renderWithReduxAndRouter(
			<Standard>
				<span></span>
			</Standard>,
			{ ...uncollapsedState },
		);
		const page = container.find(".page");
		expect(page.exists()).toBe(true);
	});
});

describe("Application Template with hidden navbar", () => {
	it("Nav mobile dark", () => {
		const mobileUncollapsedState: IGlobalState = { ...navbarHiddenState };
		mobileUncollapsedState.app.screen = "xs";
		mobileUncollapsedState.app.theme = "dark";

		const { container } = renderWithReduxAndRouter(
			<Standard>
				<span></span>
			</Standard>,
			mobileUncollapsedState,
		);
		expect(container.find(Nav).find(".nav").exists()).toBe(false);
	});

	it("Nav Close action", () => {
		const { container } = renderWithReduxAndRouter(
			<Standard>
				<span></span>
			</Standard>,
			{ ...navbarHiddenState },
		);
		expect(container.find(Nav).find(".nav").exists()).toBe(false);
	});

	it("Nav collapse action", () => {
		const { container } = renderWithReduxAndRouter(
			<Standard>
				<span></span>
			</Standard>,
			{ ...navbarHiddenState },
		);
		const buttonProps: any = container.find(Nav).find("button.collapseButton");
		expect(buttonProps.exists()).toBe(false);
	});

	it("Empty", () => {
		const empty = shallow(<Empty />);
		expect(empty.find(ThemeProvider).length).toBe(1);
	});
});

describe("Application Template showing navbar", () => {
	// it("Nav mobile dark", () => {
	// 	const mobileUncollapsedState: IGlobalState = { ...navbarShowState };
	// 	mobileUncollapsedState.app.screen = "xs";
	// 	mobileUncollapsedState.app.theme = "dark";

	// 	const { container } = renderWithReduxAndRouter(
	// 		<Standard>
	// 			<span></span>
	// 		</Standard>,
	// 		mobileUncollapsedState,
	// 	);
	// 	const onCloseProp: any = container.find(Nav).find(".nav").at(0).props();
	// 	onCloseProp["onClose"]();
	// 	expect(container.find(Nav).find(".nav").exists()).toBe(true);
	// });

	// it("Nav Close action", () => {
	// 	const { container } = renderWithReduxAndRouter(
	// 		<Standard>
	// 			<span></span>
	// 		</Standard>,
	// 		{ ...navbarShowState },
	// 	);
	// 	const onCloseProp: any = container.find(Nav).find(".nav").at(0).props();
	// 	onCloseProp["onClose"]();
	// 	expect(container.find(Nav).find(".nav").exists()).toBe(true);
	// });

	// it("Nav collapse action", () => {
	// 	const { container } = renderWithReduxAndRouter(
	// 		<Standard>
	// 			<span></span>
	// 		</Standard>,
	// 		{ ...navbarShowState },
	// 	);
	// 	const buttonProps: any = container.find(Nav).find("button.collapseButton");
	// 	buttonProps.at(0).props().onClick();
	// 	expect(buttonProps.exists()).toBe(true);
	// });

	it("Empty", () => {
		const empty = shallow(<Empty />);
		expect(empty.find(ThemeProvider).length).toBe(1);
	});
});

describe("Application Template - breadcrumb", () => {
	it("should render with breadcrumb", () => {
		const { container } = renderWithReduxAndRouter(
			<Standard>
				<span></span>
			</Standard>,
			navbarBreadcrumbShowState,
		);
		expect(container.find(BreadCrumb).exists()).toBe(true);
	});

	it("should render without breadcrumb", () => {
		const { container } = renderWithReduxAndRouter(
			<Standard>
				<span></span>
			</Standard>,
			navbarShowState,
		);
		expect(container.find(BreadCrumb).exists()).toBe(false);
	});
});
