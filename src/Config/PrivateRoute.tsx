import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";

import { AppState } from "../Redux/D_reducers";
import { getAccessToken, getTokenTimeout } from "../Redux/E_selectors/app_auth";

import { NotAuthorized } from "../App/Pages/NotFound";
import { hasTokenExpired } from "./utils/auth";

interface IPrivateRoute {
	path: string;
	component: any;
}

const PrivateRoute = ({ component: Component, ...rest }: IPrivateRoute) => {
	const token = useSelector((state: AppState) => getAccessToken(state));

	const tokenTimeout = useSelector((state: AppState) => getTokenTimeout(state));
	const isTokenValid = !hasTokenExpired(tokenTimeout);

	return (
		<Route
			{...rest}
			render={(props) => (token && isTokenValid ? <Component {...props} /> : <Route component={NotAuthorized} />)}
		/>
	);
};

export default PrivateRoute;
