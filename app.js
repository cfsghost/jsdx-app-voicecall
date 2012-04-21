var toolkit = require('jsdx-toolkit');

var buttonNumber = [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#' ];
function createButton(index, displayPanel) {
	var button = new toolkit.Widget.Button(buttonNumber[index]);

	button.on(toolkit.EVENT_CLICK, function() {
		console.log(button);
		displayPanel.text += button.label;
	});

	return button;
}

/* Create a new application */
var app = new toolkit.Application('VoiceCall');

/* Create a new window */
app.createWindow(function(window) {

	/* Quit current application when this window is destroyed */
	window.on(toolkit.EVENT_DESTROY, function() {
		app.quit();
	});

	window.title = 'VoiceCall';
	window.hasToolbar = false;
	window.setColor(0, 0, 0, 255);
	window.width = 320;
	window.height = 480;
	window.show();

	/* Layout */
	var panel = new toolkit.Widget.BoxLayout
	panel.orientation = toolkit.Widget.ORIENTATION_VERTICAL;
	window.setChild(panel);

	/* Display Panel */
	var dp = new toolkit.Widget.Label;
	dp.height = 60;
	panel.add(dp, -1);

	/* Number Buttons */
	var buttonMatrix = new toolkit.Widget.Table;
	buttonMatrix.width = 320;
	buttonMatrix.height = 320;
	buttonMatrix.columnSpacing = 3;
	buttonMatrix.rowSpacing = 4;

	var btnIndex = 0;
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 3; j++) {
			var button = createButton(btnIndex, dp);
			buttonMatrix.add(button, i, j);

			btnIndex++;
		}
	}
	panel.add(buttonMatrix, -1);

	/* Calling Button */
	var callButton = new toolkit.Widget.Button('Call Now!');
	callButton.height = 60;
	panel.add(callButton, -1);
});

app.run();
