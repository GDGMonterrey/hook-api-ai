/**
 * AutoController
 *
 * @description :: Server-side logic for managing autoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	webhook : function (req, res) {
		buscaAutoService.find(req.body.result.parameters)
			.then(function(autos){
				var responseBody = { source: "Mofles Inc" }
				if (!autos.length){
					responseBody.speech = "No hay autos que coincidan con la busqueda";
					responseBody.displayText = "No encontramos este auto";
				} else {
					if (autos.length === 1){
						responseBody.speech = "El auto "+ autos[0].modelo + " tiene las siguientes caracteristicas " + autos[0].detalles;
						responseBody.displayText = "Encontramos un auto :)";
					} else {
						listaAutos = "";
						autos.forEach(function (auto) {
							if (!listaAutos) {
								listaAutos = auto.modelo;
							} else {
								listaAutos += ", " + auto.modelo;
							}
						});
						responseBody.speech = "Encontramos los siguientes autos que coinciden con tu búsqueda " + listaAutos ;
						responseBody.displayText = "Encontramos varias coincidencias";
					}
				}

				return res.json(responseBody);
			})
			.catch(function (error) {
				var responseBody = {
					speech : "Experimentamos fallas, trata mas tarde",
					displayText: "Ocurrió un error",
					source: "Mofles Inc"
				}
				return res.json(responseBody)
			})
	}
	
};

