var seconds: float;
var timeLeft: float;
var equipped: boolean;
var contentType: String;
var armed: boolean = false;
 var projectedPowder: GameObject;
function Start () {
	timeLeft = seconds;
	
	this.transform.Find("Extinguisher Camera").camera.enabled = false;
} 
function Update () {
	if (Input.GetAxis("Fire1") && equipped){
		// Did you finish the extinguisher?
		if ( timeLeft >= 0) {
			timeLeft = timeLeft - Time.deltaTime;
			var guiObject : GameObject = GameObject.Find("GUI");
			guiObject.GetComponent("ExtinguisherLevel").seconds = timeLeft;
			//animation.Play("Grab");
			
			if (myExtinguisher.contentType == "Powder") {
    		var powderProjection : GameObject = Instantiate(
    			projectedPowder, 
    			Vector3( this.transform.position.x, this.transform.position.y + 3, this.transform.position.z),
    			this.transform.rotation);
    		}
			
			
			if (!audio.isPlaying)
				audio.Play();
		}
		else {
			var extinguisherFlux: flux  = GameObject.Find("extinguisherFlux").GetComponent(flux);
			extinguisherFlux.exaustExtinguisher();
			audio.Stop();
		}
	} else {
		audio.Stop();
	}
}
function equip() {
	equipped = true;
	collider.enabled = false;
	var body: Rigidbody = this.gameObject.GetComponent(Rigidbody);
	Destroy(body);
	animation.Play("Default Take");
}
function unequip() {
	equipped = false;
	transform.parent = null;
	transform.rotation = Quaternion.identity;
	transform.position.y = 2.5;
	collider.enabled = true;
	this.gameObject.AddComponent(Rigidbody);
}