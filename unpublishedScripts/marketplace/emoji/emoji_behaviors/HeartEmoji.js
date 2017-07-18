///
/// HeartEmoji.js
/// An object that spawns a heart
/// Attach to an entity 
/// 
/// Author: Liv Erickson
/// Copyright High Fidelity 2017
///
/// Licensed under the Apache 2.0 License
/// See accompanying license file or http://apache.org/
///
(function(){
    HeartEmoji = function(){

    }
    HeartEmoji.prototype = {
        preload: function(){
            var URL = www.url.com;
            var Model = model.fbx;
            var dimensions = {};

            var properties = {
                // entity properties
            }
        }
    }
    return new HeartEmoji();

});


// In another script....

var emojis = Script.require("emojis.js");
var heart = emojis.CreateEmoji(Heart); 
                /// in Emojis.js....
                        include(heartemoji.js);
                        function CreateEmoji(Emoji Name)
                        {
                            if (heart)
                              return new HeartEmoji();
                        }
Entities.addentity(heart);
