#pragma strict


function OnTriggerEnter(other : Collider) {

	if (other.gameObject.tag == "Player")
	{
		Debug.Log("You made it!!!");
	}

}

@script RequireComponent(Collider)