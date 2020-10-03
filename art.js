// These are the preset values for the artwork.
const PRESETS = {
	"rain": {
		chance: 0.215,
		control: 1,
		lineLength: 10,
		lineWeight: 4.48,
		chaos: 0,
		lineColor: '#FFFFFE',
		backgroundColor: '#007AB1'
	},
	"night": {
		chance: 1,
		chaos: 0.875,
		control: 0.9299999999999999,
		lineLength: 14,
		lineWeight: 11,
		lineColor: '#151714', //sky
		backgroundColor: '#DAA947' //star

	},
	"tenPrintClassic": {
		chance: 1,
		control: 0.5,
		lineLength: 32,
		lineWeight: 12,
		chaos: 0,
		lineColor: '#7B80EA',
		backgroundColor: '#313FA5'
	},
	"matrix": {
		backgroundColor: "#000000",
		chance: 0.68,
		chaos: 0,
		control: 0.645,
		lineColor: "#08f738",
		lineLength: 12.5,
		lineWeight: 7
	},
};




// An object to keep track of the overall state of the work
var artworkState = { ...PRESETS['tenPrintClassic'] };

// sync the controls with the artwork state.
updateControls();



// if a user clicks a preset button, call the handlePresetClick function. 
document.getElementById('presets').addEventListener("click", handlePresetClick);

// if a user clicks a changes a control slider, call the handleInterfaceInput function. 
document.getElementById('sketch-controls').addEventListener("input", handleInterfaceInput);







// handleInterfaceInput gets the value from a slider and applies it to the correct value in the artwork.
function handleInterfaceInput(event) {
	switch (event.target.name) {
		case "chance":
			console.log("chance", event.target.value);
			artworkState.chance = parseFloat(event.target.value);
			redraw();
			break;
		case "control":
			console.log("control", event.target.value);
			artworkState.control = parseFloat(1 - event.target.value);
			redraw();
			break;
		case "lineLength":
			artworkState.lineLength = parseFloat(event.target.value);
			redraw();
			break;
		case "lineWeight":
			artworkState.lineWeight = parseFloat(event.target.value);
			redraw();
			break;
		case "chaos":
			artworkState.chaos = parseFloat(event.target.value);
			redraw();
			break;
		case "lineColor":
			artworkState.lineColor = event.target.value;
			redraw();
			break;
		case "backgroundColor":
			artworkState.backgroundColor = event.target.value;
			redraw();
			break;
		default:
			break;
	}
};



// handlePresetClick loads a preset when a user clicks a preset button.
function handlePresetClick(event) {
	if (event.target.dataset && PRESETS[event.target.dataset.preset]) {
		artworkState = { ...PRESETS[event.target.dataset.preset] };
		updateControls();
		redraw();
	}
};




// This is the main artwork sketch code

// Get the width / height of our html element
let WIDTH = document.getElementById("sketch-holder").offsetWidth;
let HEIGHT = document.getElementById("sketch-holder").offsetHeight;


// p5 setup function, creating a new canvase
function setup() {
	var canvas = createCanvas(WIDTH, HEIGHT);
	canvas.parent("sketch-holder");
	noLoop();
}

// a function which generates a random chaos number
function generateChaos() {
	return artworkState.chaos - ((artworkState.chaos * 2) * Math.random());
}


// the sketch itself is quite simple really
function draw() {

	// set the canvas background, line colour and line width.
	background(artworkState.backgroundColor);
	stroke(artworkState.lineColor);
	strokeWeight(artworkState.lineWeight);
	smooth();


	// these two for loops calculate where each line needs to start & end to cover the screen
	for (var x = 0; x < WIDTH; x += artworkState.lineLength) {
		for (var y = 0; y < HEIGHT; y += artworkState.lineLength) {


			// create a random number between 0 - 1
			// if the number is less than the 'chance' value - go to the next step and draw
			// if the number is more than the 'control' value - don't draw & go to next block.
			if (Math.random() < artworkState.chance) {


				// create a random number between 0 - 1
				// if the number is less than the 'control' value - draw a right line.
				// if the number is more than the 'control' value - draw a left line.
				if (Math.random() < artworkState.control) {
					line(
						x + generateChaos(),
						y + generateChaos(),
						x + generateChaos() + artworkState.lineLength,
						y + generateChaos() + artworkState.lineLength);
				} else {
					line(
						x + generateChaos() + artworkState.lineLength,
						y + generateChaos(),
						x + generateChaos(),
						y + generateChaos() + artworkState.lineLength);
				}
			}
		}
	}
}




// updateControls syncs the user interface with the artwork state, so the interface reflects
// what the code is doing.

function updateControls() {
	document.getElementById("chance").value = artworkState["chance"];
	document.getElementById("control").value = artworkState["control"];
	document.getElementById("chaos").value = artworkState["chaos"];
	document.getElementById("lineLength").value = artworkState["lineLength"];
	document.getElementById("lineWeight").value = artworkState["lineWeight"];
	document.getElementById("lineColor").value = artworkState["lineColor"];
	document.getElementById("backgroundColor").value = artworkState["backgroundColor"];
}