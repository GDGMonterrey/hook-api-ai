process.env.DEBUG = 'actions-on-google:*';
const API_AI_ASSISTANT = require('actions-on-google').ApiAiAssistant;
const POKEMON_ARGUMENT = "pokemon";
const ERROR_DIALOG = "Nuestra pokebase ha sido atacada por el equipo Rocket";

module.exports = {

	createApiAiAssistant(req, res){
		return new API_AI_ASSISTANT({request: req, response: res});
	},

	pokebot_fight : function (assistant) {
		let query = {};
		let responseBody = { source: "PokeMexa" }
		query.nombre = assistant.getArgument(POKEMON_ARGUMENT);
		return PokemonService.getDebilidadPokemon(query)
			.then(function (pokemon) {
				let message =`Puedes usar a ${pokemon.nombre}`;
				responseBody.speech = message;
				responseBody.displayText = message;
				return responseBody;
			}).catch(function (err) {
				responseBody.speech = ERROR_DIALOG;
				responseBody.displayText = ERROR_DIALOG;
				return responseBody;
			});
	},
	pokebot_study : function (assistant) {
		let query = {}
		query.nombre = assistant.getArgument(POKEMON_ARGUMENT);
		return PokemonService.getPokemonByQuery(query, true)
			.then(function (pokemon) {
				let message =`${pokemon.nombre} es un pokemon de tipo ${pokemon.tipo.nombre}`;
				responseBody.speech = message;
				responseBody.displayText = message;
				return responseBody;
			}).catch(function (err) {
				responseBody.speech = ERROR_DIALOG;
				responseBody.displayText = ERROR_DIALOG;
				return responseBody;
			});
	}

}