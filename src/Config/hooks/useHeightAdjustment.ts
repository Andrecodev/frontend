import { useEffect, useRef, useState } from "react";

import { useTheme } from "@material-ui/core";

import createGetScreenValue from "../utils/createGetScreenValue";
import someIs from "../utils/someIs";

import useWidth from "./useWidth";

import { useSelector } from "react-redux";
import { AppState } from "../../Redux/D_reducers";
import { getAppTemplateStandard } from "../../Redux/E_selectors/app_template_standard";

export default (appBarHeight?: any, interval?: any): any => {
  const {
    breakpoints: { keys }
  } = useTheme();

  const templateStandardState = useSelector((state: AppState) =>
    getAppTemplateStandard(state)
  );

  const {
    clipped,
    headerPosition,
    initialAdjustmentHeight,
    heightAdjustmentSpeed,
    heightAdjustmentDisabled,
    navVariant
  } = templateStandardState;

  const currentScreen = useWidth();
  const getScreenValue = createGetScreenValue(keys, currentScreen);
  const initialHeight = getScreenValue(appBarHeight, initialAdjustmentHeight);

  const [height, setHeight] = useState(initialHeight);

  const debounced = useRef(() =>
    setTimeout(() => {
      if (height > 0) {
        const offset = initialHeight - window.scrollY;
        setHeight(offset < 0 ? 0 : offset);
      }
    }, interval || heightAdjustmentSpeed)
  );

  useEffect(() => {
    window.addEventListener("scroll", debounced.current);
    return () => {
      window.removeEventListener("scroll", debounced.current);
    };
  }, []);

  if (heightAdjustmentDisabled) return 0; // disabled by user.
  if (navVariant === "temporary") return 0;
  if (!clipped) {
    // do not run the effect below if behavior is not right.
    return 0;
  }

  if (clipped && someIs(["sticky", "fixed"], headerPosition)) {
    return initialHeight;
  }
  return 0;
};
