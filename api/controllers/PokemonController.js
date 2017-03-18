/**
 * PokemonController
 *
 * @description :: Server-side logic for managing pokemons
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	webhook : function (req, res) {
		const assistant = IntentsService.createApiAiAssistant(req, res);
		const actionMap = new Map();
		actionMap.set("pokebot-fight", IntentsService.pokebot_fight);
		actionMap.set("pokebot-study", IntentsService.pokebot_study);
		assistant.handleRequest(actionMap);
	}
};

