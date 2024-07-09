import { INavBar } from "../../Redux/C_states/IAppTemplateStandardState";

export const canAccessRoute = (listNavBar: INavBar[], userModuleList: Array<string>, path: string) => {
	const canAccess = listNavBar.some(
		(navBarItem) =>
			navBarItem.subCategory.some((navSubcategory) => navSubcategory.path.includes(path)) &&
			(userModuleList.some((moduleName) => moduleName === navBarItem.moduleName) ||
				userModuleList.filter((value) => navBarItem.subCategory.map((sub) => sub.moduleName).includes(value)).length !==
					0),
	);
	return canAccess;
};

export const hasTokenExpired = (timeout: number) => {
	if (timeout === -1) return true;
	const expirationDate = new Date(timeout);
	const currentDate = new Date();
	return currentDate > expirationDate;
};
