/**
 * PokemonController
 *
 * @description :: Server-side logic for managing pokemons
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	webhook : function (req, res) {
		const assistant = IntentsService.createApiAiAssistant(req, res);
		const intent = assistant.getIntent();
		switch (intent) {
			case "pokebot-fight":
				IntentsService.pokebot_fight(assistant)
					.then(function (responseBody) {
						res.json(responseBody)
					});
				break;
			case "pokebot-study":
				IntentsService.pokebot_study(assistant)
					.then(function (responseBody) {
						res.json(responseBody)
					});
				break;
			}
	}
};

