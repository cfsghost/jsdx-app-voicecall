var toolkit = require('jsdx-toolkit');

var buttonNumber = [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#' ];
function createButton(index, displayPanel) {
	var button = new toolkit.Widget.Button(buttonNumber[index]);

	button.on(toolkit.EVENT_CLICK, function() {
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
	//var layout = new toolkit.Widget.BoxLayout;
	var layout = new toolkit.Group;
	window.setChild(layout);

	/* Main Panel */
	var panel = new toolkit.Widget.BoxLayout;
	panel.orientation = toolkit.Widget.ORIENTATION_VERTICAL;
	panel.rotate(toolkit.Y_AXIS, 0, window.width * 0.5, window.height * 0.5, 0);
	layout.add(panel);

	/* Calling */
	var callingPanel = new toolkit.Widget.BoxLayout;
	callingPanel.rotate(toolkit.Y_AXIS, 180, window.width * 0.5, window.height * 0.5, 0);
	callingPanel.opacity = 0;

	var callingSpinner =  new toolkit.Widget.Spinner;
	callingPanel.add(callingSpinner, -1);

	var statusLabel = new toolkit.Text('Calling ...');
	statusLabel.setFontName('Droid Sans 28');
	statusLabel.setColor(255, 255, 255, 255);
	callingPanel.add(statusLabel, -1);

	callingPanel.setAnchorFromGravity = toolkit.GRAVITY_CENTER;
	callingPanel.x = window.width * 0.5 - 50;
	callingPanel.y = window.height * 0.5;
	layout.add(callingPanel);

	/* Display Panel */
	var dp = new toolkit.Text;
	dp.setFontName('Droid Sans 28');
	dp.setColor(255, 255, 255, 255);
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
	callButton.on(toolkit.EVENT_CLICK, function() {
		panel.animate(toolkit.EASE_OUT_CUBIC, 600, {
			'rotation-angle-y': 180,
			'opacity': 0
		});

		callingPanel.animate(toolkit.EASE_OUT_CUBIC, 600, {
			'rotation-angle-y': 360,
			'opacity': 255
		});
	});
	panel.add(callButton, -1);


});

app.run();
