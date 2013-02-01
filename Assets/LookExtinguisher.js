#pragma strict

var mainCamera : Camera;
var extinguisherCamera : Camera;

function Start () {
	mainCamera.enabled = true;
	extinguisherCamera.enabled = false;
}

function Update () {
	if (Input.GetKeyDown(KeyCode.E)) {
		mainCamera.enabled = !mainCamera.enabled;
		extinguisherCamera.enabled = !extinguisherCamera.enabled;
	}
}
public function isLookingExtinguisher()
{
	return extinguisherCamera.enabled;
}