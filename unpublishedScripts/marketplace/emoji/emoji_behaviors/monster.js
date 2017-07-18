///
/// monster.js
/// A little angry monster
/// Attach to an entity 
/// 
/// Author: Elisa Lupin-Jimenez
/// Copyright High Fidelity 2017
///
/// Licensed under the Apache 2.0 License
/// See accompanying license file or http://apache.org/
///
/// All assets are under CC Attribution Non-Commerical
/// http://creativecommons.org/licenses/
///

(function () {
	var GROWL_URL = "https://hifi-content.s3.amazonaws.com/elisalj/emoji_scripts/behaviors/sounds/monster-growl.wav";
	var GROWL = SoundCache.getSound(Script.resolvePath(GROWL_URL));

    var _entityID;
    this.preload = function(entityID) {
        _entityID = entityID;
    };

    Script.setInterval(function() {
    	Audio.playSound(GROWL, {
	      position: Entities.getEntityProperties(_entityID).position,
	      volume: 2
	    });
    }, 2000);

/*    Script.setInterval(function() {
        var props = Entities.getEntityProperties(_entityID);
        print("Velocity: " + JSON.stringify(props.velocity));
        props.velocity.x *= -1;
        Entities.editEntity(_entityID, props);
    }, 2000)*/

/*    Script.setInterval(function() {
    	props = Entities.getEntityProperties(_entityID);
    	props.modelURL = newModel;
    	Entities.editEntity(_entityID, props);

    }, 1000);*/

    this.unload = function() {
         // UI and Cache cleanup etc happen here,
    };

});