import React from "react";

import MainTheme from "../MainTheme";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "typeface-roboto";

import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../../Redux/B_actions/app";
import { AppState } from "../../../Redux/D_reducers";
import { getApp } from "../../../Redux/E_selectors/app";
import { getAppTemplateStandard } from "../../../Redux/E_selectors/app_template_standard";

import Content from "./Layouts/Content";
import Header from "./Layouts/Header";
import Nav from "./Layouts/Nav";

import HeaderContent from "./Sources/HeaderContent/HeaderContent";
import NavContent from "./Sources/NavContent";
import NavHeader from "./Sources/NavHeader/NavHeader";
import NavBottom from "./Sources/NavBottom/NavBottom";
import ChatButton from "App/Components/public/ChatButton/ChatButton";
import HorizontalMenu from "App/Components/public/Menus/HorizontalMenu/HorizontalMenu";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { getUser } from "Redux/E_selectors/app_user";

const Standard: React.FC = (props: any) => {
	const dispatch = useDispatch();

	const ThemeChange = (payloadTheme: string) => {
		dispatch(setTheme(payloadTheme));
	};

	const handlerTheme = (event: any) => {
		if (theme === "light") {
			ThemeChange("dark");
		} else {
			ThemeChange("light");
		}
	};

	const appState = useSelector((state: AppState) => getApp(state));

	const templateStandardState = useSelector((state: AppState) => getAppTemplateStandard(state));
	const { modulos } = useSelector(getUser);

	const { theme } = appState;

	const { templateHeader, templateNav, templateContent } = templateStandardState;

	const desktop = useMediaQuery("(min-width:960px)");

	if (theme !== "light") {
		ThemeChange("light");
	}

	return (
		<ThemeProvider theme={MainTheme}>
			<CssBaseline />
			<div style={{ minHeight: "100vh" }}>
				<Header changeTheme={handlerTheme}>{templateHeader && <HeaderContent />}</Header>
				{templateNav && desktop && <HorizontalMenu modules={modulos} />}
				{/* {templateNav && !desktop && (
					<Nav header={<NavHeader />}>
						{" "}
						<NavContent />{" "}
					</Nav>
				)} */}

				{templateContent && <Content>{props.children}</Content>}
			</div>
			{/* <ChatButton /> */}
		</ThemeProvider>
	);
};

export default Standard;
