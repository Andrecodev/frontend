import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getKeysInfo } from "./utils/keysUtils";
import { MOBILE_SIZES } from "Config/constants/sizes";
import { SNACK_MESSAGES } from "Client/Portfolio/ConectionPortfolio";
// import { CONSULTATIONS_TAX_CERTIFICATIONS_PATH } from "Config/constants/ROUTER_URLs";
import { checkSuitabilityDate } from "../Consultations/Certifications/utils/certificationUtils";

import { closeSnackNotification, enqueueSnackNotification } from "Redux/B_actions/snack_notifications";
// import { clearRequestPortFolioCurrent } from "Redux/E_selectors/portFolio";
import { getBroker, getBrokerKey } from "Redux/E_selectors/app_broker";
import { setCreateTokenSuccess } from "Redux/B_actions/app_auth";
import { getAuth } from "Redux/E_selectors/app_auth";
import { getUser } from "Redux/E_selectors/app_user";
import { getScreen } from "Redux/E_selectors/app";

import TemplateStandard from "../../Templates/Standard";
import Default from "./Default";

import styles from "./index.module.scss";
// import { IBrokerChildren } from "Redux/C_states/IBrokerState";

const Home = (props: any) => {
	const getDataKeysInfo = async (brokerKey: number) => {
		let body = {
			Broker: String(brokerKey), //`${value.user.clave}`,
		};
		let {
			data: { data },
		} = await getKeysInfo(body);
		return data;
	};

	const dispatch = useDispatch();
	const userBrokerKey = useSelector(getBrokerKey);
	const userBroker = useSelector(getBroker);

	const authUser = useSelector(getAuth);
	const getDataUser = useSelector(getUser);

	const screen = useSelector(getScreen);
	const isMobile = MOBILE_SIZES.includes(screen);
	const {
		match,
		location: { state },
	} = props;
	//const requestPortFolioCurrent1 = useSelector(clearRequestPortFolioCurrent);
	const dispatchonly = () => {
		var data: any = {
			...authUser,
		};
		data.Broker = userBroker;
		data.user = getDataUser;
		dispatch(setCreateTokenSuccess(data));
	};
	useEffect(() => {
		getDataKeysInfo(userBrokerKey).then((response) => {
			if (getDataUser.isAdministrador || getDataUser.isGestor) {
				userBroker.childrenInfo = response;
				dispatchonly();
			} else {
				if (Number(getDataUser.claveshijas[0]) == getDataUser.clave) {
					userBroker.childrenInfo = response;
				} else {
					let KeysChidlrenInfo: any = [];
					if (Array.isArray(getDataUser.claveshijas)) {
						getDataUser.claveshijas.forEach((element) => {
							KeysChidlrenInfo.push(response.find((x: any) => x.brokerKey === Number(element)));
						});
						userBroker.childrenInfo = KeysChidlrenInfo;
					}
				}
			}

			dispatchonly();
		});

		localStorage.removeItem("fileIdentifier");
	}, []);

	useEffect(() => {
		if (state?.checkSuitability) {
			const isSuitabilityOk = checkSuitabilityDate({ vigency: state?.vigency });
			if (isSuitabilityOk) return;
			const renovationLink = "https://intermediario.academialibertyandes.com";
			const title = (() => (
				<span>
					La certificación de idoneindad 050 se encuentra vencida.
					<a className={styles.renovationLink} href={renovationLink} rel="noreferrer" target="_blank">
						Renovar aquí
					</a>
				</span>
			))();
			const suitabilitySnackConfig = {
				title,
				type: "error",
				variant: "error_center",
				key: "renovate_suitability",
				bold: isMobile,
			};
			const snackNotification = SNACK_MESSAGES.invalidSuitability(suitabilitySnackConfig);
			const showSnackTimer = setTimeout(() => dispatch(enqueueSnackNotification(snackNotification)), 1100);
			const closeSnackTimer = setTimeout(
				() => dispatch(closeSnackNotification({ key: suitabilitySnackConfig.key })),
				11100,
			);
			return () => {
				clearTimeout(showSnackTimer);
				clearTimeout(closeSnackTimer);
			};
		}
	}, [dispatch, isMobile, state?.checkSuitability, state?.vigency]);

	return (
		<TemplateStandard>
			<Switch>
				<Route path={`${match.url}`} component={Default} />
			</Switch>
		</TemplateStandard>
	);
};

export default Home;
