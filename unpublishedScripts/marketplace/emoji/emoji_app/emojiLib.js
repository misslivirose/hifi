// emoji library elisa
module.exports = {

	emojiLib: {
		corn: "./JSON_files/corn.json?" + Date.now(),
		fireworks: "./JSON_files/fireworks.json?" + Date.now(),
		flower: "./JSON_files/flower.json?" + Date.now(),
		heart: "./JSON_files/heart.json?" + Date.now(),
		monster: "./JSON_files/monster.json",
		pickle: "./JSON_files/pickle.json?" + Date.now(),
		pizza: "./JSON_files/pizza.json?" + Date.now(),
		poo: "./JSON_files/poo.json?" + Date.now()
	},

	getEmoji: function(name, library) {
		print("Emoji to retrieve: " + name);
		//print("The library: " + JSON.stringify(library));
		if (name in library) {
			//print("Emoji's URL: " + library[name]);
			return library[name];
		} else {
			print("Unable to locate emoji");
			return null;
		}
	}

};