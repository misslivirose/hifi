//
//  CreateEmojis.js
//
//  Author: Liv Erickson
//  Copyright 2017 High Fidelity, Inc.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//
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


    // Set up where we want our entities to spawn.
    var TABLE_ENTITY_ID = "{2595625d-68bd-405b-924f-1d85c95b3775}";
    var TABLE_POS = Entities.getEntityProperties(TABLE_ENTITY_ID).position;
    var TABLE_WIDTH_ADJUSTMENT = Entities.getEntityProperties(TABLE_ENTITY_ID).dimensions.x / 2;
    var TABLE_LENGTH_ADJUSTMENT = Entities.getEntityProperties(TABLE_ENTITY_ID).dimensions.z / 2;

    // Set up our XMLHttpRequest
    var FUNCTION_URL = "https://sendanentity.azurewebsites.net/api/HttpTriggerJS/";


    // Check for new emojis every 30 seconds
    Script.setInterval(function () {
        var req = new XMLHttpRequest();
        req.open("GET", FUNCTION_URL + "?user=jazmin&command=retrieve");
        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    // We have our response. Create all of our new emojis!
                    parseResponse(JSON.parse(req.response));
                } else {
                    print(req.status);
                }
            }
        }
        req.send("");
    }, 30000);

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

        var generateRandomLocation = function () {
            var _x = TABLE_POS.x + Math.random() * (Math.random() > 0.5 ? -TABLE_WIDTH_ADJUSTMENT : TABLE_WIDTH_ADJUSTMENT);
            var _z = TABLE_POS.z + Math.random() * (Math.random() > 0.5 ? -TABLE_LENGTH_ADJUSTMENT : TABLE_LENGTH_ADJUSTMENT);

            return { x: _x, y: TABLE_POS.y + 1, z: _z };
        }

        var newPosition = generateRandomLocation();

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

    Script.scriptEnding.connect(function () {
        
    })

    // Parse our response object
    // Create an emoji entity for each number of new objects sent
    // Each object has a corresponding list of users who have sent objects
    function parseResponse(response) {
        var _hearts = response.Heart._;
        var _sentHeart = formatUsernameList(response.SentHeart._);
        for (var i = 0; i < _hearts; ++i) {
            Create3DEmoji("Heart", _sentHeart[i]);
        }

        var _flowers = response.Flowers._;
        var _sentFlowers = formatUsernameList(response.SentFlowers._);
        for (var i = 0; i < _flowers; ++i) {
            Create3DEmoji("Flowers", _sentFlowers[i]);
        }

        var _pizza = response.Pizza._;
        var _sentPizza = formatUsernameList(response.SentPizza._);
        for (var i = 0; i < _pizza; ++i) {
            Create3DEmoji("Pizza", _sentPizza[i]);
        }

        var _poo = response.Poo._;
        var _sentPoo = formatUsernameList(response.SentPoo._);
        for (var i = 0; i < _poo; ++i) {
            Create3DEmoji("Poo", _sentPoo[i]);
        }
    };

    // Helper function to format user names
    function formatUsernameList(unformattedList) {
        var trimmed = unformattedList.substring(2); // Remove prefixed comma
        return trimmed.split(',');
    };
})();