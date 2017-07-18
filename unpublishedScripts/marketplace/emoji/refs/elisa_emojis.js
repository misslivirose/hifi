(function () {

    // Set up our emojis
    var _emojis = [];
    var _overlays = [];
    var EMOJI_MODEL_URLS = ["https://hifi-content.s3.amazonaws.com/liv/3DModels/heart.fbx",
        "https://hifi-content.s3.amazonaws.com/liv/3DModels/Flower.fbx",
        "https://hifi-content.s3.amazonaws.com/liv/3DModels/poo.fbx",
        "https://hifi-content.s3.amazonaws.com/liv/3DModels/pizza.fbx"];

    var EMOJI_SCRIPT_URLS = ["https://hifi-content.s3.amazonaws.com/liv/dev/emojis/HeartEmoji.js",
        "https://hifi-content.s3.amazonaws.com/liv/dev/emojis/Flowers.js",
        "https://hifi-content.s3.amazonaws.com/liv/dev/emojis/Fart.js",
        "https://hifi-content.s3.amazonaws.com/liv/dev/emojis/Edible.js"];


    // Create a 3D emoji, passing in emoji type
    // Supported Emoji Types: "Heart", "Flowers", "Pizza", "Poo"
    var Create3DEmoji = function (emojiType, userName) {
        print("Creating " + emojiType + " emoji");
        var index = 0;
        switch (emojiType) {
            case "Heart":
                index = 0;
                break;
            case "Flowers":
                index = 1;
                break;
            case "Poo":
                index = 2;
                break;
            case "Pizza":
                index = 3;
                break;
            default:
                print("Unsupported emoji type");
                break;
        }

        var newPosition = MyAvatar.position;
        //var newPosition = {"x" : 0,"y" : 0, "z" : 0};


		// JSON object
        var emojiProperties = {
            type: "Model",
            name: userName,
            modelURL: EMOJI_MODEL_URLS[index],
            position: newPosition,
            dynamic: true,
            angularVelocity: { x: 0, y: 5, z: 0 },
            angularDamping: .1,
            velocity: { x: 0, y: -.2, z: 0 },
            gravity: { x: 0, y: -.1, z: 0 },
            linearDamping: 0,
            lifetime: 180,
            grabbable: true,
            collisionless: false,
            script: EMOJI_SCRIPT_URLS[index],
            shapeType: 'Box'
        }

        var newEmoji = Entities.addEntity(emojiProperties);
        _emojis.push(newEmoji);

        var nameOverlayProperties = {
            type: "Text",
            parentID: newEmoji,
            position: newPosition,
            localPosition: { x: 0.0, y: 0.2, z: 0.0 },
            dimensions: { x: .5, y: .1, z: 0.01 },
            lineHeight: 0.065,
            text: userName
        }

        var textEntity = Entities.addEntity(nameOverlayProperties);
        _overlays.push(textEntity);
    };

	Create3DEmoji("Heart", "J-Lo");

})();


