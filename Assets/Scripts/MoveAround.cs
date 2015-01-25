using UnityEngine;
using System.Collections;

[RequireComponent (typeof (CharacterController))]


public class MoveAround : MonoBehaviour {

	public float 		speed = 3.0f;
	public float 		rotateSpeed = 3.0f;

	private Vector3 	forward;
	private float 		curSpeed;

	// Update is called once per frame
	void Update () {

		CharacterController controller = GetComponent <CharacterController>();

		// rotate around the y-axis
		transform.Rotate (0, Input.GetAxis ("Horizontal") * rotateSpeed, 0);

		// move forward/backward

		forward = transform.TransformDirection (Vector3.forward);
		curSpeed = speed * Input.GetAxis ("Vertical");
		controller.SimpleMove (forward * curSpeed);

	}

}
