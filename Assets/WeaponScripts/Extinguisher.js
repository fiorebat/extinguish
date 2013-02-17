var seconds: float;
var timeLeft: float;
var equipped: boolean;
var contentType: String;
var armed: boolean = false;
var projectedPowder: GameObject;
var isDirting : boolean = true;
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
			
			if (contentType == "Powder") {
				if (isDirting) {
					WaitToDirt(1.0);
					isDirting = false;
					var powderRotation = this.transform.rotation;
					powderRotation.SetEulerRotation(20,0,0);
		    		var powderProjection : GameObject = Instantiate(
		    			projectedPowder, this.transform.position, powderRotation);
	    		}
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

function WaitToDirt(waitTime: float) {
    // suspend execution for waitTime seconds
    yield WaitForSeconds (waitTime);
    isDirting = true;
    
}