#pragma strict

static var gameRunning : boolean = false;

var gameTimeAllowed : float = 20.0;
var gameMessageFont : Font;

private var missionCompleted : boolean = false;
private var missionCompleteTime : float = gameTimeAllowed;

private var gameMessageLabel = "";
private var gameMessageDisplay : Rect;
private var timedOut : boolean = false;
private var gameTimeRemaining : float = gameTimeAllowed;

private var playButtonText = "Play";



function Awake () {
	gameMessageDisplay = Rect (10,10, Screen.width - 20, 40);

}


function OnGUI () {
	GUI.skin.font = gameMessageFont;
	GUI.color = Color.yellow;
	GUI.backgroundColor = Color.black;
	
	var text : String = "";
	if (missionCompleted) {
		text = String.Format( "{0:00}:{1:00}", parseInt(missionCompleteTime /60.0), parseInt(missionCompleteTime % 60.0));
		gameMessageLabel = "Mission Completed in: " + text;
	}else if (timedOut) {
		gameMessageLabel = "Time's up!!";
	} else {
		text = String.Format( "{0:00}:{1:00}", parseInt(gameTimeRemaining /60.0), parseInt(gameTimeRemaining % 60.0));
		gameMessageLabel = "Time: Left: " + text;
	}
	GUI.Box(gameMessageDisplay, gameMessageLabel);

	// Add menu button
	
	if (!gameRunning) {
		var xPos = Screen.width / 2 - 100;
		var yPos = Screen.height / 2 + 100;
		if (GUI.Button( new Rect (xPos, yPos, 200, 50), playButtonText) ) {
			StartGame();
		}
	}

}


function Update () {
	
	if (GameController != null && !GameController.gameRunning)
		return;

	if (!gameRunning)
		return;
		
		// Keep Track of time and display a countdown
	gameTimeRemaining -= Time.deltaTime;
	if (gameTimeRemaining <= 0) {
		timedOut = true;
		gameRunning = false;
	}
}
		
function MissionComplete() {
	if (!gameRunning)
		return;
	
	missionCompleted = true;
	gameRunning = false;
	
	missionCompleteTime = gameTimeAllowed - gameTimeRemaining;
			
}	


function StartGame() {
	// reset if starting a new game
	gameTimeRemaining = gameTimeAllowed;
	timedOut = false;
	missionCompleted = false;
	
	// Change button text after initial run
	playButtonText = "Play Again";

	// kick off the game
	gameRunning = true;
}
