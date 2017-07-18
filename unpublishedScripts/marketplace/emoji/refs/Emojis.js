//
//  Emojis.js
//
//  Author: Liv Erickson
//  Copyright 2017 High Fidelity, Inc.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//

module.exports = emoji;

emoji.prototype = {
    poo: function (pos, username) {
        var pooProperties = {
            type: "Model",
            modelURL: "https://hifi-content.s3.amazonaws.com/liv/3DModels/poo.fbx",
            dynamic: true,
            position: pos,
            angularVelocity: { x: 0, y: 5, z: 0 },
            angularDamping: .1,
            velocity: { x: 0, y: -.2, z: 0 },
            gravity: { x: 0, y: -.1, z: 0 },
            linearDamping: 0,
            lifetime: -1,
            grabbable: true,
            script: "https://hifi-content.s3.amazonaws.com/liv/dev/emojis/Fart.js",
            collisionless: false,
            shapeType: 'Box'
        };
        return Entities.addEntity(pooProperties);
    }
}




