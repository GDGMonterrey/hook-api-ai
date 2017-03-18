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
		query.nombre = assistant.getArgument(POKEMON_ARGUMENT);
		PokemonService.getDebilidadPokemon(query)
			.then(function (pokemon) {
				assistant.tell(`Puedes usar a ${pokemon.nombre}`);
			}).catch(function (err) {
				assistant.tell(ERROR_DIALOG);
			});
	},
	pokebot_study : function (assistant) {
		let query = {}
		query.nombre = assistant.getArgument(POKEMON_ARGUMENT);
		PokemonService.getPokemonByQuery(query, true)
			.then(function (pokemon) {
				assistant.tell(`${pokemon.nombre} es un pokemon de tipo ${pokemon.tipo.nombre}`);
			}).catch(function (err) {
				assistant.tell(ERROR_DIALOG);
			});
	}

}