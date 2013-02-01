#pragma strict
 var emptyExtinguisher:boolean = false;
 
function Start() {
	emptyExtinguisher=false;
	particleEmitter.emit=false;
}
function Update () {
	var myExtinguisher = this.gameObject.transform.parent.GetComponent(Extinguisher);
	if (Input.GetAxis("Fire1") && !emptyExtinguisher && myExtinguisher.equipped && myExtinguisher.armed) {
		particleEmitter.emit=true;
	} else {
		particleEmitter.emit=false;
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