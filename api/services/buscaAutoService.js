module.exports = {
	find: function (data){
		filters = {};
		for (var i in data){
			if (data[i]) {
				filters[i] = data[i];
			}
		}
		return Auto.find(filters).limit(10);
	}
};