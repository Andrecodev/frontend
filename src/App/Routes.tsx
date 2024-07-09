import React, { useEffect, useState } from "react";
import { MemoryRouter as Router, Switch, Route, Redirect, useLocation } from "react-router-dom";
import {
	// HOME_PATH,
	REQUESTS_PATH,
	COMMISSIONS_PATH,
	PORTFOLIO_PATH,
	SERVER_ERROR_PATH,
	HOME_PATH,
	BUSINESS_PATH,
	HOME_PRIVATE_PATH,
	COMMISSIONS_DASHBOARD_PATH,
	USER_ADMINISTRATOR_PATH,
	FIRST_LOGIN_PATH,
	CHANGE_PASSWORD_PATH,
	MANAGE_USER_PATH,
	USER_PROFILE_PATH,
	USER_CHANGE_KEY_PATH,
	MOBILE_MENU_PATH,
} from "../Config/constants/ROUTER_URLs";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import { NotFound, ServerError } from "./Pages/NotFound";
import Requests from "./Pages/Requests";
import Commissions from "./Pages/Commissions/index";
import Portfolio from "./Pages/Portfolio/index";

import PrivateRoute from "../Config/PrivateRoute";
import AuthGate from "./Components/public/AuthGate";
import { useDispatch, useSelector } from "react-redux";
import { setAuthConfigFetch } from "../Redux/B_actions/app_auth";
import { getAccessToken } from "../Redux/E_selectors/app_auth";
import { SnackbarProvider } from "notistack";
import SnackNotifier from "./Components/public/SnackNotifier/SnackNotifier";
import SnackNotification from "./Components/public/SnackNotification/SnackNotification";
import UsersAdmin from "./Pages/UsersAdmin";
import ChengeKey from "./Pages/ChangeKey";
import FirstLogin from "./Pages/Login/FirstLogin";
import ManageUsers from "./Pages/ManageUsers";
import Profile from "./Pages/UsersAdmin/Profile/index";
import SharedChangePassword from "./Pages/Login/shared/SharedChangePassword";
import MobileMenu from "./Pages/Mobile/Menu";

import { loadQSI, interceptorQSI } from "Config/utils/qsi";

interface Window {
	addEventListener?: any;
	QSI?: any;
}
declare var window: Window;
function callChat() {
	try {
		const QSI = window.QSI;
		if (QSI) {
			QSI.API.unload();
			QSI.API.load().then(QSI.API.run());
		}
	} catch (error) {
		console.error("Error en la encuesta ", error);
	}
}

const Routes = () => {
	const dispatch = useDispatch();
	const token = useSelector(getAccessToken);
	let location = useLocation();
	const [hasFormValues, setHasFormValues] = useState(false);

	useEffect(() => {
		/* 
			QSI Code moves from *index.html* to here, conditionated to show after user has token.
			If app has token, first thing to do is to check if scripts exists, for that reason we ask 
			for it with *querySelectorAll*, after that, we create the script tags to manage its correct 
			clean hook return, if this scripts does not exist, then, the *querySelectorAll* returns an 
			empty array, we ask for this length to conditionate the attributes.
			If not exists, we set id, type, content, and append it into the DOM.
			This procedure is executed on every change of token.
		*/
		if (!token) return;
		try {
			let qsiLoadId = document.querySelectorAll("#qsiLoadScript");
			let qsiInterceptorId = document.querySelectorAll("#qsiInterceptorScript");
			const qsiLoadScript = document.createElement("script");
			const qsiInterceptorScript = document.createElement("script");
			if (!qsiLoadId.length) {
				qsiLoadScript.id = "qsiLoadScript";
				qsiLoadScript.type = "text/javascript";
				qsiLoadScript.textContent = loadQSI;
				document.body.appendChild(qsiLoadScript);
			}
			if (!qsiInterceptorId.length) {
				qsiInterceptorScript.id = "qsiInterceptorScript";
				qsiInterceptorScript.type = "text/javascript";
				qsiInterceptorScript.textContent = interceptorQSI;
				document.body.appendChild(qsiInterceptorScript);
			}

			return () => {
				try {
					if (!!qsiLoadId.length) document.body.removeChild(qsiLoadScript);
					if (!!qsiInterceptorId.length) document.body.removeChild(qsiInterceptorScript);
				} catch (error) {}
			};
		} catch (err) {
			console.log(`External QSI Error: ${err}`);
		}
	}, [token]);

	useEffect(() => {
		callChat();
	}, [location.pathname, hasFormValues]);

	useEffect(() => {
		if (token) {
			dispatch(setAuthConfigFetch());
		}
	}, [dispatch, token]);

	const renderOptionLogin = () => {
		if (!hasFormValues) {
			return (
				<Switch>
					<Route component={() => <Login setLoginAuth={() => setHasFormValues(true)} />} />
				</Switch>
			);
		} else {
			return (
				<AuthGate test={hasFormValues}>
					<Switch>
						<PrivateRoute path={REQUESTS_PATH} component={Requests} />
						<PrivateRoute path={COMMISSIONS_PATH} component={Commissions} />
						<PrivateRoute path={PORTFOLIO_PATH} component={Portfolio} />

						<PrivateRoute path={BUSINESS_PATH} component={Commissions} />
						<PrivateRoute path={MANAGE_USER_PATH} component={ManageUsers} />
						<PrivateRoute path={USER_ADMINISTRATOR_PATH} component={UsersAdmin} />
						<PrivateRoute path={USER_CHANGE_KEY_PATH} component={ChengeKey} />
						<PrivateRoute path={CHANGE_PASSWORD_PATH} component={SharedChangePassword} />
						<PrivateRoute path={MOBILE_MENU_PATH} component={MobileMenu} />
						{/* Common routes */}
						<Route exact path={HOME_PATH} component={Home} />
						<Route exact path={SERVER_ERROR_PATH} component={ServerError} />

						<Route exact path={HOME_PATH}>
							<Redirect to={HOME_PRIVATE_PATH} />
						</Route>

						<Route exact path={USER_PROFILE_PATH} component={Profile} />

						<Route component={NotFound} />
					</Switch>
				</AuthGate>
			);
		}
	};

	return (
		<SnackbarProvider
			maxSnack={3}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			content={(key, message) => {
				return <SnackNotification id={key} message={message} />;
			}}
		>
			<SnackNotifier />
			{renderOptionLogin()}
		</SnackbarProvider>
	);
};

export default Routes;
