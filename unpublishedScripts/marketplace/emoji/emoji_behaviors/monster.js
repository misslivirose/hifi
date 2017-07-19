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
	var GROWL_URL = Script.resolvePath("sounds/monster-growl.wav");
	var GROWL = SoundCache.getSound(Script.resolvePath(GROWL_URL));

    var _entityID;
    this.preload = function(entityID) {
        _entityID = entityID;
    };

    Script.setTimeout(function() {
    	Audio.playSound(GROWL, {
	      position: Entities.getEntityProperties(_entityID).position,
	      volume: 0.5,
				looping: true
	    });
    }, 2000);

    this.unload = function() {
         // UI and Cache cleanup etc happen here,
    };

});
