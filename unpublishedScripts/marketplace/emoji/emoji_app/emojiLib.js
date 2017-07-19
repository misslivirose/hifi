// emoji library elisa

// links JSON file from AWS to var
module.exports = {

	emojiLib: {
		corn: "https://hifi-content.s3.amazonaws.com/elisalj/emoji_scripts/JSON_files/corn.json?" + Date.now(),
		fireworks: "https://hifi-content.s3.amazonaws.com/elisalj/emoji_scripts/JSON_files/fireworks.json?" + Date.now(),
		flower: "https://hifi-content.s3.amazonaws.com/elisalj/emoji_scripts/JSON_files/flower.json?" + Date.now(),
		heart: "https://hifi-content.s3.amazonaws.com/elisalj/emoji_scripts/JSON_files/heart.json?" + Date.now(),
		monster: "./JSON_files/monster.json",
		//monster: "https://hifi-content.s3.amazonaws.com/elisalj/emoji_scripts/JSON_files/monster.json?" + Date.now(),
		pickle: "https://hifi-content.s3.amazonaws.com/elisalj/emoji_scripts/JSON_files/pickle.json?" + Date.now(),
		pizza: "https://hifi-content.s3.amazonaws.com/elisalj/emoji_scripts/JSON_files/pizza.json?" + Date.now(),
		poo: "https://hifi-content.s3.amazonaws.com/elisalj/emoji_scripts/JSON_files/poo.json?" + Date.now()
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