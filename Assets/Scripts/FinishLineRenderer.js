#pragma strict


var post_Left: Transform;
var post_Right: Transform;

var lineColor : Color = Color.green;


function Start () {

	var lineRenderer : LineRenderer = gameObject.AddComponent(LineRenderer);
	lineRenderer.SetPosition(0, post_Left.position);
	lineRenderer.SetPosition(1, post_Right.position);
	lineRenderer.material = new Material (Shader.Find("Particles/Additive"));
	lineRenderer.SetColors(lineColor, lineColor);

}
