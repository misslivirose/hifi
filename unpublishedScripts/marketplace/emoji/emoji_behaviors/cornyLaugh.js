///
/// cornyLaugh.js
/// A corn on the cob that laughs
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
	var LAUGH_URL = Script.resolvePath("sounds/corny-laugh.wav");
	var LAUGH = SoundCache.getSound(Script.resolvePath(LAUGH_URL));
	var RIM_SHOT_URL = Script.resolvePath("sounds/rim-shot.wav");
	var RIM_SHOT = SoundCache.getSound(Script.resolvePath(RIM_SHOT_URL));
	var CORN = Script.resolvePath("../models/corn.fbx");
	var LAUGHING_CORN = Script.resolvePath("../models/corn_laugh.fbx");

    var _entityID;
    this.preload = function(entityID) {
          _entityID = entityID;
    };

	Audio.playSound(RIM_SHOT, {
      	position: Entities.getEntityProperties(_entityID).position,
      	volume: 0.5
    });

    Script.setInterval(function() {
    	Audio.playSound(LAUGH, {
	      position: Entities.getEntityProperties(_entityID).position,
	      volume: 0.5
	    });
    }, 3000);

    var props;
	var currentModel = CORN;
    var newModel = LAUGHING_CORN;
    var switchModel = null;

    Script.setInterval(function() {
    	props = Entities.getEntityProperties(_entityID);
    	props.modelURL = newModel;
    	Entities.editEntity(_entityID, props);
    	switchModel = newModel;
    	newModel = currentModel;
    	currentModel = switchModel;
    }, 200);

/*    this.onSomeEventThatMightHappenInTheNearFuture = function() {
          print('my entity ID is still ' + _entityID);
    };*/

    this.unload = function() {
         // UI and Cache cleanup etc happen here,
    };

});
