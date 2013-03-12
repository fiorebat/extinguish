var seconds: float;
var timeLeft: float;
var equipped: boolean;
var contentType: String;
var armed: boolean = false;
var isDirting : boolean = true;
var powderMaterial : Material;
var decalManager : DecalManager;
var hintBox : HintBox;

function Start () {
	timeLeft = seconds;
	decalManager = GameObject.Find("Powder Dirt Manager").GetComponent(DecalManager);
	this.transform.Find("Extinguisher Camera").camera.enabled = false;
	var mainBone = transform.Find("Armature/Bone_Root/Bone");
	animation["Default Take"].AddMixingTransform(mainBone);
	animation["Grab"].AddMixingTransform(mainBone);
	animation["Grab"].enabled = true;
	animation["Grab"].weight = 1f;
	animation["Grab"].time = 0.01f;
	animation["Grab"].speed = 0;
	var guiObject : GameObject = GameObject.Find("GUI");
	hintBox = guiObject.GetComponent("HintBox");
	
} 
function Update () {

	if (Input.GetAxis("Fire1") && equipped && armed && !this.transform.Find("Extinguisher Camera").camera.enabled){
		// l'estintore è terminato?
		if ( timeLeft >= 0) {
			timeLeft = timeLeft - Time.deltaTime;
			var guiObject : GameObject = GameObject.Find("GUI");
			guiObject.GetComponent("ExtinguisherLevel").seconds = timeLeft;
			
			//l'estintore a polvere sporca
			if (contentType == "Powder") {
				if (isDirting) {
					var mainCamera : GameObject = GameObject.Find("Main Camera");
					WaitToDirt(1.0);
					isDirting = false;	
					
					//se sono troppo lontano dal muro faccio cadere per terra a distanza 7
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
			Debug.Log("Esausto");
			hintBox.ShowMessage(HintBox.Exausted);
			
			var extinguisherFlux: flux  = this.gameObject.transform.Find("flux").GetComponent(flux);
			extinguisherFlux.exaustExtinguisher();
				
			audio.Stop();
		}
	} else {
		if (Input.GetAxis("Fire1") && equipped && !armed)
			hintBox.ShowMessage(HintBox.Arm);
		
		audio.Stop();
	}
}
function arm() {
	armed = true;
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
	
	animation.Stop("Default Take");
	animation["Grab"].enabled = true;
	animation["Grab"].weight = 1f;
	animation["Grab"].time = 0.01f;
	animation["Grab"].speed = 0;
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