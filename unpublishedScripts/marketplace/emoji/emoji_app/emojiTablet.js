// emoji tablet

// to avoid the caching block on updating JSONs
var DEBUG = true;

if (DEBUG) {
    var lib = Script.require("./emojiLib.js?" + Date.now());
} else {
    var lib = Script.require("./emojiLib.js");
}

(function() {

    var APP_NAME = "EMOJIS";
    var APP_URL = Script.resolvePath("emojiTabletUI.html");
    // need to put icon here later
    // "50 by 50(or square), white on a transparent background in the SVG file format"
    var APP_ICON = null;
    var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");

    var button = tablet.addButton({
        //icon: APP_ICON,
        text: APP_NAME
    });

    // Activates tablet UI when selected from menu
    function onClicked() {
        tablet.gotoWebScreen(APP_URL);
    };
    button.clicked.connect(onClicked);

    // Gives position right in front of user's avatar
    function getPositionToCreateEntity() {
        var direction = Quat.getFront(MyAvatar.orientation);
        var distance = 0.3;
        var position = Vec3.sum(MyAvatar.position, Vec3.multiply(direction, distance));
        position.y += 0.5;
        return position;
    };

    var emojiJSON = null;

    // Handles emoji button clicks to retrieve the link to the emoji JSON from emojiLib
    function onWebEventReceived(event) {
        var emojiName = (JSON.parse(event)).data;
        var url = lib.getEmoji(emojiName, lib.emojiLib);
        if (url != null) {
            emojiJSON = Script.require(url);
            create3DEmoji(emojiJSON, null);
        } else {
            print("Unable to create emoji");
        }
    };
    tablet.webEventReceived.connect(onWebEventReceived);

    function create3DEmoji(emojiJSON, userName) {
        print("Creating " + emojiJSON.name + " emoji");
        emojiJSON.position = getPositionToCreateEntity();
        var newEmoji = Entities.addEntity(emojiJSON);
    };

    // When tablet UI is closed and app is removed from menu
    function cleanup() {
        tablet.removeButton(button);
    };
    Script.scriptEnding.connect(cleanup);

}());
