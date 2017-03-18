module.exports = {
	getDebilidadPokemon : function(query) {
		return PokemonService.getPokemonByQuery(query)
			.then(function(pokemon) {
				return PokemonService.getDebilidadTipo(pokemon.tipo);
			})
			.then(function (tipo) {
				return PokemonService.getPokemonByQuery({ tipo : tipo.id})
			})
	},
	getPokemonByQuery : function(query, populated) {
		if (!populated){
			return Pokemon.findOne(query);
		} else {
			return Pokemon.findOne(query).populateAll();
		}
	},
	getDebilidadTipo : function(tipoId) {
		return PokemonService.getTipoByQuery({ id : tipoId })
			.then(function (tipo) {
				return PokemonService.getTipoByQuery ( { id : tipo.debilidad })
			});
	},
	getTipoByQuery : function(query) {
		return Tipo.findOne(query);
	}
};