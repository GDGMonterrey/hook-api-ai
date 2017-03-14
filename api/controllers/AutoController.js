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
					responseBody.speech = "There are not matches";
					responseBody.displayText = "There are not matches";
				} else {
					if (autos.length === 1){
						responseBody.speech = autos[0].modelo + " " + autos[0].detalles;
						responseBody.displayText = "We found a match";
					} else {
						listaAutos = "";
						autos.forEach(function (auto) {
							if (!listaAutos) {
								listaAutos = auto.modelo;
							} else {
								listaAutos += ", " + auto.modelo;
							}
						});
						responseBody.speech = "List of matches " + listaAutos ;
						responseBody.displayText = "We found many matches";
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

