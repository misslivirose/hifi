(function() {
	var APP_NAME = "EMOTE STREAM";
	var APP_URL = Script.resolvePath("app.html");

	var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");

	var button = tablet.addButton({
        text: APP_NAME
    });

	function onClicked() {
		tablet.gotoWebScreen(APP_URL);
	}
    button.clicked.connect(onClicked);
})();