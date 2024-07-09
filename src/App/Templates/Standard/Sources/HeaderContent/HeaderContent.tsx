import React, { Fragment, useContext, useEffect, useState } from "react";
import { __RouterContext } from "react-router";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/styles";
import { Fab, IconButton, Tooltip } from "@material-ui/core";

import { getAppTemplateStandard, getTemplateNav } from "../../../../../Redux/E_selectors/app_template_standard";
import { setOpened, setCollapsed } from "../../../../../Redux/B_actions/app_template_standard";
import { getAccessToken } from "../../../../../Redux/E_selectors/app_auth";
// import { setDeleteToken } from "../../../../../Redux/B_actions/app_auth";
import { getApp } from "../../../../../Redux/E_selectors/app";
import { AppState } from "../../../../../Redux/D_reducers";

import { HOME_PATH, MOBILE_MENU_PATH } from "Config/constants/ROUTER_URLs";
import { executeCloseSession } from "Config/utils/closeSession";

import LoaderProps from "App/Components/public/LoaderProps";
import HeaderUserMenu from "../HeaderUserMenu/HeaderUserMenu";

import IconMenuBtn from "../../../../../Assets/svg/menu-btn.svg";
import uploadIcon from "../../../../../Assets/svg/upload-icon.svg";
import IconPrincipal from "../../../../../Assets/svg/principal.svg";
import CloseMenuIcon from "Assets/svg/menu_close_icon.svg";

const useStyles = makeStyles(() => ({
	root: {
		width: "100%",
		height: "100%",
		display: "inline-flex",
	},
	verticalLine: {
		width: "1px",
		height: "56px",
		margin: "0 17px",
	},
	appTitle: {
		fontSize: "19px",
		color: "#1e1045",
		display: "inline-flex",
		justifyContent: "center",
		alignItems: "center",
	},
	headerActionBtn: {
		marginLeft: "12.7px",
		boxShadow: "none",
		color: "#1a1446",
		backgroundColor: "#ffffff",
		width: "35.3px",
		height: "35.5px",
		padding: "10px 0",
	},
	notificationsBadge: {
		top: "10%",
		right: "10%",
		background: "#e92243",
		color: "white",
	},
	logo: {
		cursor: "pointer",
		width: 110,
		height: 56,
		viewBox: "0 0 110 56",
		display: "inline-block",
	},
	headerIcons: {
		flexGrow: 1,
		textAlign: "right",
		alignItems: "center",
		justifyContent: "flex-end",
		display: "flex",
	},
	headerCompanyMobile: {
		flexGrow: 1,
		textAlign: "left",
		alignItems: "center",
		justifyContent: "flex-start",
		display: "flex",
		padding: " 1px 2px 3px 4px",
	},
	headerCompany: {
		flexGrow: 1,
		textAlign: "left",
		alignItems: "center",
		justifyContent: "flex-start",
		display: "flex",
		paddingLeft: 40,
	},
	logoutBtn: {
		"backgroundColor": "#FFFFFF",
		"&:hover": {
			backgroundColor: "#F0FBFC",
		},
	},
	logoutIcon: {
		transform: "rotate(90deg)",
	},
	separator: {
		height: "30px",
		width: "1px",
		margin: "0px 23px",
		border: "1px solid #1E1045",
	},
	addedPadding: {
		// height: "30px",
		// width: "1px",
		// margin: "0px 23px",
		// border: "1px solid #1E1045",
		padding: "0 40px 0 0 ",
	},
}));

const HeaderContent = ({ ...props }: any) => {
	const [t] = useTranslation();
	const dispatch = useDispatch();

	const OpenMenu = (payloadOpen: boolean) => {
		dispatch(setOpened(payloadOpen));
	};

	const Collapse = (payloadCollapse: boolean) => {
		dispatch(setCollapsed(payloadCollapse));
	};

	const appState = useSelector((state: AppState) => getApp(state));

	const templateStandardState = useSelector((state: AppState) => getAppTemplateStandard(state));

	const templateNav = useSelector(getTemplateNav);

	const token = useSelector(getAccessToken);

	const { screen } = appState;
	const { opened } = templateStandardState;

	const desktop = screen !== "xs" && screen !== "sm";

	const classes = useStyles(props);

	const history = useHistory();
	const [closeSessionLoader, setCloseSessionLoader] = useState<boolean>(false);
	const closeSession = async () => await executeCloseSession(setCloseSessionLoader, dispatch, history);

	const { push } = useHistory();
	const goToHome = () => push(HOME_PATH);

	const useRouter = () => useContext(__RouterContext);
	const router = useRouter();
	const {
		location: { pathname },
	} = router;

	useEffect(() => {
		if (pathname !== MOBILE_MENU_PATH) {
			dispatch(setOpened(false));
		}
	}, [pathname]);

	return (
		<div className={classes.root}>
			<LoaderProps loading={closeSessionLoader} />
			<div className={desktop ? classes.headerCompany : classes.headerCompanyMobile}>
				<img src={IconPrincipal} className={classes.logo} alt="principal" onClick={goToHome} />
				{screen !== "xs" && screen !== "sm" && (
					<Fragment>
						<span className={classes.verticalLine} />
						{/* <div className={classes.appTitle}>Oficina en línea</div>s */}
					</Fragment>
				)}
			</div>
			{templateNav && (
				<div className={classes.headerIcons}>
					{desktop && token && (
						<>
							<HeaderUserMenu />

							<div className={classes.separator} />

							<div className={classes.addedPadding}>
								<Tooltip title={t("Header.UserMenu.Logout")}>
									<IconButton className={classes.logoutBtn} aria-label="logout" onClick={closeSession}>
										<img className={classes.logoutIcon} src={uploadIcon} />
									</IconButton>
								</Tooltip>
							</div>
						</>
					)}
					{/* <Fab
              size="small"
              aria-label="Settings"
              className={classes.headerActionBtn}
            >
              <img src={IconHeadbarHat} style={{ height: 16 }} alt="headbar-hat" />
            </Fab> */}

					{!desktop && (
						<>
							{opened ? (
								<Fab
									size="small"
									aria-label="Close menu"
									className={classes.headerActionBtn}
									onClick={() => {
										OpenMenu(!opened);
										Collapse(false);
										history.goBack();
									}}
								>
									<img src={CloseMenuIcon} alt="menu-btn" />
								</Fab>
							) : (
								<Fab
									size="small"
									aria-label="Settings"
									className={classes.headerActionBtn}
									onClick={() => {
										OpenMenu(!opened);
										Collapse(false);
										history.push(MOBILE_MENU_PATH);
									}}
								>
									<img src={IconMenuBtn} alt="menu-btn" />
								</Fab>
							)}
						</>
					)}
				</div>
			)}
		</div>
	);
};

export default HeaderContent;
