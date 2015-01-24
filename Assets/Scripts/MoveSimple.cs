using UnityEngine;
using System.Collections;

public class MoveSimple : MonoBehaviour {

	public float 		speed = 3.0f;
	public float 		rotateSpeed = 10.0f;
	
	Ray ray = new Ray();
	RaycastHit hit = new RaycastHit();
	
	// Update is called once per frame
	void Update () {
				// detect left mouse clicks
				if (Input.GetMouseButtonDown (0)) {

						//detect if the object was clicked by raycasting between the camera and the position

						ray = Camera.main.ScreenPointToRay (Input.mousePosition);

						// cast a ray of distance 100 and check to see if it hits

						if (collider.Raycast (ray, out hit, 100.0f)) {
								// log a message
								Debug.Log ("Moving the Target");

								// Move it forward
								transform.Translate (Vector3.forward * speed);

								// rotate it a bit
								transform.Rotate (Vector3.up * rotateSpeed);
						} else {
								// clear the message
								Debug.Log ("");
						}

				}
		}
}
