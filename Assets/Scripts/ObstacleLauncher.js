#pragma strict

var projectile : Rigidbody;
var speed = 5;
var maxObstacles = 2;
var launchInterval : float = 5.0;
var target : Transform;

private var nextLaunch : float = 0.0;
private var numObstaclesLaunched = 0;


function Start () {
	if (target == null) {
	// find player transform
	target = GameObject.FindGameObjectWithTag("Player").transform;
	}
}

function Update () {

	if (GameController != null && !GameController.gameRunning)
		return;


	if ((numObstaclesLaunched < maxObstacles) && (Time.time > nextLaunch)) {
	// set up the next launch time
	nextLaunch = Time.time + launchInterval;
	
	// set the direciton
	var hit : RaycastHit;
	var ray : Ray;
	var hitDistance : float;
	
	// Instantiate the projectile
	var instantiatedProjectile : Rigidbody = Instantiate(projectile, transform.position, transform.rotation);
	
	// Try and put it in front of the player
	
	instantiatedProjectile.velocity = target.TransformDirection(-Vector3.forward*speed);
	
	// keep track of how many launched
	numObstaclesLaunched ++;
	
	}

}


function resetGame () {
	// reset to original state (no objects)
	numObstaclesLaunched = 0;

}
