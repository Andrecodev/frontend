export const capitalizeString = (str: string) => {
	const words = str.split(" ");

	const capitalizedWords = words.map((word) => {
		const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
		return capitalizedWord;
	});

	const capitalizedString = capitalizedWords.join(" ");

	return capitalizedString;
};
