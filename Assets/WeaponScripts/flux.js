#pragma strict
 var emptyExtinguisher:boolean = false;
 var myExtinguisher: Extinguisher;
 var myHandle: Transform;


function Start() {
	emptyExtinguisher=false;
	particleEmitter.emit=false;
	myExtinguisher = transform.parent.GetComponent(Extinguisher);
	myHandle = myExtinguisher.transform.Find("Armature/Bone_Root/Handle");
	
}
function Update () {
	
	if (Input.GetAxis("Fire1") && !emptyExtinguisher && myExtinguisher.equipped && myExtinguisher.armed) {
		particleEmitter.emit=true;
		//Debug.Log(myHandle.name+myHandle.transform.localRotation.eulerAngles.x);
		
		if (myHandle.transform.localRotation.eulerAngles.x<360.0 && myHandle.transform.localRotation.eulerAngles.x>=340.0)
			myHandle.transform.localRotation.eulerAngles.x+=0.1;
	} else {
		particleEmitter.emit=false;
		
		if (!Input.GetAxis("Fire1"))
			myHandle.transform.localRotation.eulerAngles.x=340.0;
	}
}
function OnParticleCollision (other : GameObject)
{
	var myExtinguisher = this.gameObject.transform.parent.GetComponent(Extinguisher);
	var hitFire = other.GetComponent(Fire);
    if (other.tag == "fire" && getTypeLetters(myExtinguisher.contentType).Contains(hitFire.fireType)) {
    	other.particleEmitter.emit = false;	
    }
}
public function exaustExtinguisher() {
	emptyExtinguisher = true;
}
function getTypeLetters(extinguisherType:String) {
	var letters = new ArrayList();
	switch (extinguisherType) {
		case "Powder":
			letters.Add("A");
			letters.Add("B");
			letters.Add("C");
			return letters;
		case "CO2":
			letters.Add("B");
			letters.Add("C");
			return letters;
		default:
			letters.Add(extinguisherType);
			return letters;
	}
}