﻿#pragma strict

var speed : float = 3.0;
var rotateSpeed : float = 3.0;

var moveJoystick : Joystick;
var rotateJoystick : Joystick;

var originalPosition : Vector3;
var originalRotation : Quaternion;


function Awake() {
	originalPosition = transform.position;
	originalRotation = transform.rotation;

}



function Update () {

	
	if (GameController != null && !GameController.gameRunning)
		return;

	var controller : CharacterController = GetComponent(CharacterController);
	
	//rotate around y-axis
	var rotatePos = Input.GetAxis ("Horizontal") ? Input.GetAxis ("Horizontal") : joyStickInput(rotateJoystick);
	transform.Rotate(0, rotatePos * rotateSpeed, 0);
	
	//move forward/backward
	var forward = transform.TransformDirection(Vector3.forward);
	var movePos = Input.GetAxis ("Vertical") ? Input.GetAxis ("Vertical") : joyStickInput(moveJoystick);
	
	var curSpeed : float = speed * movePos;
	
	controller.SimpleMove(forward * curSpeed);
}



function joyStickInput (joystick : Joystick) {
	var absJoyPos = Vector2 (Mathf.Abs(joystick.position.x), Mathf.Abs(joystick.position.y));
	
	var xDirection = (joystick.position.x > 0) ? 1:-1;
	var yDirection = (joystick.position.y > 0) ? 1:-1;
	
	return ( ( absJoyPos.x > absJoyPos.y) ? absJoyPos.x * xDirection : absJoyPos.y * yDirection);
}

function resetGame() {
	// reset to original position
	transform.position = originalPosition;
	transform.rotation = originalRotation;

}

@script RequireComponent(CharacterController)