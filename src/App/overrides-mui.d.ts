import { Overrides } from "@material-ui/core/styles/overrides";
import { MuiPickersOverrides } from "@material-ui/pickers/typings/overrides";
import { useStyles as DayStyles } from "@material-ui/pickers/views/Calendar/Day";

type overridesNameToClassKey = {
	[P in keyof MuiPickersOverrides]: keyof MuiPickersOverrides[P];
};

type overridesNameToClassKeyPlus = {
	MuiPickersStaticWrapper: any;
};

declare module "@material-ui/core/styles/overrides" {
	export interface ComponentNameToClassKey extends overridesNameToClassKey, overridesNameToClassKeyPlus {}
}
