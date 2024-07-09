import { useEffect } from "react";
import { useTheme } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { setCollapsed } from "../../Redux/B_actions/app_template_standard";
import { AppState } from "../../Redux/D_reducers";
import { getApp } from "../../Redux/E_selectors/app";
import { getAppTemplateStandard } from "../../Redux/E_selectors/app_template_standard";

export default () => {
  const {
    breakpoints: { keys }
  } = useTheme();

  const appState = useSelector((state: AppState) =>
    getApp(state)
  );

  const templateStandardState = useSelector((state: AppState) =>
    getAppTemplateStandard(state)
  );

  const {
    screen
  } = appState;

  const {
    collapsible,
    collapsed,
    collapsedBreakpoint,
    autoCollapsedDisabled
  } = templateStandardState;

  function Collapse(payload: boolean) {
    const dispatch = useDispatch();
    dispatch(setCollapsed(payload));
  }

  useEffect(() => {
    // skip everything if user disable this feature in config
    if (!autoCollapsedDisabled) {
      if (collapsible && screen) {
        if (collapsed && screen === collapsedBreakpoint) {
          Collapse(false);
        }
        if (
          !collapsed &&
          keys.indexOf(screen) < keys.indexOf(collapsedBreakpoint)
        ) {
          Collapse(false);
        }
      }
    }
  }, [screen]);

  if (autoCollapsedDisabled) {
    return null;
  }
  return true;
};
