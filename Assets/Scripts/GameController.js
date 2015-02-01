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

var gameObjectsToReset : GameObject[];

var fanReactionScript : FanReaction;



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
	if (!gameRunning)
		return;
		
		// Keep Track of time and display a countdown
	gameTimeRemaining -= Time.deltaTime;
	if (gameTimeRemaining <= 0) {
		timedOut = true;
		gameRunning = false;
		
		// play the sound of defeat
		fanReactionScript.playSoundOfVictory(false);
		
	}
}
		
function MissionComplete() {
	if (!gameRunning)
		return;
	
	missionCompleted = true;
	gameRunning = false;
	
	// play win sounds
	
	fanReactionScript.playSoundOfVictory(true);
	
	missionCompleteTime = gameTimeAllowed - gameTimeRemaining;
	
	
			
}	


function StartGame() {
	// reset if starting a new game
	gameTimeRemaining = gameTimeAllowed;
	timedOut = false;
	missionCompleted = false;
	
	// Change button text after initial run
	playButtonText = "Play Again";

	// Clean out any obstacles
	var enemies = GameObject.FindGameObjectsWithTag("Enemy");
	for (var enemy : GameObject in enemies) {
		Destroy ( enemy);
	}

	// Call all game reset methods
	for (var gameObjectReciever : GameObject in gameObjectsToReset) {
		gameObjectReciever.SendMessage("resetGame", null, SendMessageOptions.DontRequireReceiver);
	
	}
	
	// kick off the game
	gameRunning = true;
}
