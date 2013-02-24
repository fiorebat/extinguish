var seconds: float;
var timeLeft: float;
var equipped: boolean;
var contentType: String;
var armed: boolean = false;
var isDirting : boolean = true;
var powderMaterial : Material;
var decalManager : DecalManager;

function Start () {
	timeLeft = seconds;
	decalManager = GameObject.Find("Powder Dirt Manager").GetComponent(DecalManager);
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
					var mainCamera : GameObject = GameObject.Find("Main Camera");
					WaitToDirt(1.0);
					isDirting = false;	
					//var powderRotation = this.transform.rotation;
					//powderRotation.SetEulerRotation(20,0,0);
		    		/*var powderProjection : GameObject = Instantiate(
		    			projectedPowder, mainCamera.transform.position, mainCamera.transform.rotation);
		    			*/
		    		
		    		var hit : RaycastHit;
		    		var ray = camera.main.ScreenPointToRay (Vector3(Screen.width/2.0,Screen.height/2.0,0));	
	    			if (!Physics.Raycast(ray,hit,7)) {
	    				Debug.Log("Mancato" +mainCamera.name);
		    			
		    			mainCamera = GameObject.Find("Powder Dirt Camera");
		    			ray = new Ray(mainCamera.transform.position, mainCamera.transform.forward);
		    		}
		    		
		    		DelayedDirt(ray, mainCamera.camera, 1.5);
	    		}
    		}
    		
			if (!audio.isPlaying)
				audio.Play();
		}
		else {
			try {
				var extinguisherFlux: flux  = GameObject.Find("extinguisherFlux").GetComponent(flux);
				extinguisherFlux.exaustExtinguisher();
			} catch (err) {
				Debug.Log("Extinguisher no longer exists: "+err.Message);
			}
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

function DelayedDirt(direction : Ray, activedCamera : Camera, waitTime: float) {
    // suspend execution for waitTime seconds
    yield WaitForSeconds (waitTime);
    Debug.DrawRay(direction.origin,direction.direction,Color.red,20, true);
	decalManager.drawDecal(direction, activedCamera);
    
}