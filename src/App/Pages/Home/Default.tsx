import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Carousel from "nuka-carousel";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { getScreen } from "../../../Redux/E_selectors/app";

import Statitics from "App/Components/HomeDashboard/Statitics";
import ShortCut from "App/Components/HomeDashboard/ShortCut";

import { MOBILE_SIZES } from "Config/constants/sizes";

import BannerMarketingDesktop from "Assets/img/banner_maketing_desktop.jpg";
import BannerHomeOne from "../../../Assets/img/banner_maketing_mobile.jpg";
import BannerHomeThree from "../../../Assets/img/banner-home-three.jpg";
import BannerHomeTwo from "../../../Assets/img/banner-home-two.jpg";
// import HomeImage from "../../../Assets/img/home-image.png";

const useStyles = makeStyles(({ breakpoints }: any) => ({
	// conteinerSlider: {
	// 	[breakpoints.down("md")]: {
	// 		maxWidth: 500,
	// 		marginLeft: "12px",
	// 		height: "320px",
	// 	},
	// },
	root: {
		padding: 16,
		height: "320px",
		[breakpoints.up("sm")]: {
			padding: 24,
			maxWidth: 500,
			margin: "auto",
		},
		[breakpoints.up("md")]: {
			maxWidth: 700,
		},
	},
	img: {
		// height: "320px",
		width: "100%",
	},
}));

const DefaultHome = (props: any) => {
	const screen = useSelector(getScreen);
	const isMobile = MOBILE_SIZES.includes(screen);
	const classes = useStyles(props);

	useEffect(() => {
		localStorage.removeItem("fileIdentifier");
	}, []);
	const handleImageClick = () => {
		// URL a la que quieres redirigir
		const url = "https://marketinglibertyandes.com/login";

		// Redirige a la URL especificada
		window.open(url, "_blank");
	};
	return (
		//<div className={classes.conteinerSlider} >
		<div className={classes.conteinerSlider}>
			<Statitics />
			{isMobile ? (
				<Carousel withoutControls={true} autoplay={true}>
					<img
						src={BannerHomeOne}
						alt="Home image"
						style={{ maxWidth: "345px", marginLeft: "18px" }}
						onClick={() => window.open("https://marketinglibertyandes.com/login", "_blank")}
					/>
				</Carousel>
			) : (
				<Carousel withoutControls={true} autoplay={true}>
					<a href={"https://marketinglibertyandes.com/login"} target="_blank">
						<img src={BannerMarketingDesktop} alt="Marketing mayo" className={classes.img} />
					</a>

					<img src={BannerHomeTwo} alt="Home image" />
					<a href={"https://www.youtube.com/watch?v=G-1mvXDq0_I&ab_channel=LibertySegurosCO"} target="_blank">
						<img src={BannerHomeThree} alt="Home image" className={classes.img} />
					</a>
				</Carousel>
			)}
			<ShortCut />
		</div>
	);
};

export default DefaultHome;
