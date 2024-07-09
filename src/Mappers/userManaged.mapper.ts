export const mapperUserDataToEdit = (data: any) => {
	const dataMappered = {
		data: {
			Names: data.nombre,
			LastNames: data.apellido,
			TypeDocument: data.tipoDocumento,
			NumberId: data.numeroDocumento,
			Broker:
				data.listaUsuarioApp[0] && data.listaUsuarioApp[0]?.atributosPersonalizados
					? Number(
							data.listaUsuarioApp[0].atributosPersonalizados.filter(
								(e: any) => e.nombreAtributo === "clavePrincipal",
							)[0].valoresPersonalizados[0],
					  )
					: 0,
			BrokerChilds:
				data.listaUsuarioApp[0] &&
				data.listaUsuarioApp[0]?.atributosPersonalizados &&
				data.listaUsuarioApp[0].atributosPersonalizados.filter((e: any) => e.nombreAtributo === "clavesHijas").length >
					0
					? data.listaUsuarioApp[0].atributosPersonalizados.filter((e: any) => e.nombreAtributo === "clavesHijas")[0]
							.valoresPersonalizados
					: [],
			Mail: data.email,
			Telephone: data.telefonoFijo,
			Cellphone: Number(data.celular),
			Features: data.listaUsuarioApp[0].gruposAplicacion,
			Verified: data.isValidado,
		},
	};

	return dataMappered;
};
