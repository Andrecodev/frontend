export const mockStore = {
	broker: {
		officeCode: 1,
		childrenInfo: [{ brokerKey: 1, businessName: "Business Name Test" }],
		nitNumber: 123,
	},
	user: {
		operacion: 1,
		tipoid: "CC",
		email: "test@test.test",
		usuario: 1,
		name: "Name Test",
		celular: "3001234567",
		app: "qazwsxedc",
	},
};

export const localStorageMock = (() => {
	let store = {};

	return {
		getItem(key) {
			return store[key] || null;
		},
		setItem(key, value) {
			store[key] = value.toString();
		},
		removeItem(key) {
			delete store[key];
		},
		clear() {
			store = {};
		},
	};
})();
